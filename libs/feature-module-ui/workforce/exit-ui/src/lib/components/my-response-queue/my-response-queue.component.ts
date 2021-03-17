import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Inject
} from '@angular/core';
import { Observable, pipe } from 'rxjs';
import {IResponse } from 'libs/models/workforce/exit/src/lib/interfaces';
import { IgxGridComponent } from 'igniteui-angular';
import { SelectComponent } from 'ng-uikit-pro-standard';
import { MyResponseQueueService } from './my-response-queue.service';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { UtilService } from '@nutela/core-services';
import { take, map } from 'rxjs/operators';
import { MatDialogRef, MatDialog } from '@angular/material';
import { ResignationViewerComponent } from '../resignation-viewer/resignation-viewer.component';
import { Router } from '@angular/router';
import { STANDARD_ROUTES, ToastTypes } from '@nutela/shared/app-global';
import { IResignationLetter, IQueueItem } from '../../interfaces';
import { getMyQueueItems, getInterviewUrl, isLoadingQueueItems, LoadDataMyExitResponseQueue, LoadingQueueData, LoadDataInterviewUrl } from '../../store/queue';
import { IAppState } from '@nutela/store/app-state';
import { IsUserAdmin } from '../../store/hr-process';
import { ShowToast } from '@nutela/store/shared';
import { LetterStatus } from '../../enumerations/letter-status.enumeration';

@Component({
  selector: 'x365-fm-workforce-exit-my-response-queue',
  templateUrl: './my-response-queue.component.html',
  styleUrls: ['./my-response-queue.component.scss'],
  providers: [MyResponseQueueService]
})
export class MyResponseQueueComponent implements OnInit {
  status = LetterStatus;

  queueData$: Observable<IQueueItem[]>;
  isLoading$: Observable<boolean>;
  interviewUrl$: Observable<string>;
  showResponsesViewer$: Observable<boolean>;
  responsesData$: Observable<IResponse[]>;
  // resignationApplication$: Observable<IResignationLetter[]>;

  // @ViewChild('transactionApplyEditor') transactionApplyEditor: TransactionApplyEditorComponent;
  @ViewChild('queueDataGrid')
  queueDataGrid: IgxGridComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('filterBy') filterBy: SelectComponent;
  resignationDialogRef: MatDialogRef<ResignationViewerComponent>;

  constructor(
    @Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private titleService: Title,
    public service: MyResponseQueueService,
    private store: Store<IAppState>,
    public utilService: UtilService,
    public dialog: MatDialog,
    private router: Router,
  ) {
    titleService.setTitle(
      `${'My Response Queue'}${this.partialDocumentTitle}`
    );
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeSelects() {
    this.queueData$ = this.store.select(pipe(getMyQueueItems));
    this.interviewUrl$ = this.store.select(pipe(getInterviewUrl));
    this.isLoading$ = this.store.select(pipe(isLoadingQueueItems));
  }

  storeDispatches() {
    this.store.dispatch(new LoadingQueueData());
    this.store.dispatch(new LoadDataMyExitResponseQueue());
  }

  search() {
    let filterBy: string = '';
    let searchString: string = '';
    if (this.searchInput) {
      searchString = this.searchInput.nativeElement.value;
    }

    if (this.filterBy) {
      filterBy = <string>this.filterBy.value;
    }

    if (this.queueDataGrid) {
      this.service.search(
        this.queueDataGrid,
        searchString,
        filterBy
      );
    }
  }


  getRowData$(rowId: number): Observable<IQueueItem> {
    return this.queueData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  onRespondIconClicked(rowId: number) {
    this.getRowData$(rowId).pipe(take(1)).subscribe(data => {

      if (data.process_id == 3) {
        this.store.dispatch(new LoadDataInterviewUrl({resignationId: data.resignation_id}));
        this.interviewUrl$.pipe(take(1)).subscribe(url => {
          if (url) {
            window.open(url, "_blank");
          }
        })
      } else if (data.process_id == 4) {
        this.router.navigate([`${STANDARD_ROUTES.lmResponseForm}/${data.employee_id}/${data.resignation_id}`])
        this.store.dispatch(new IsUserAdmin(false))
      } else if (data.process_id == 5) {
        this.router.navigate([`${STANDARD_ROUTES.lmProcessList}/${data.employee_id}`]);
      }
    })
  }

  getRowByStatusTextData$(rowId: string): Observable<IQueueItem> {
    return this.queueData$.pipe(
      map(d => d.filter(v => v.status_text.trim().toLowerCase() === rowId.trim().toLowerCase())),
      map(e => e.shift()))
  }


  getStatus(statusText: string): number {
    let className: number;
    this.getRowByStatusTextData$(statusText).pipe(take(1)).subscribe(letter => {
      className = letter.status
    })

    return className
  }

  openModal(result: IResignationLetter): void {

  }

  onViewChecklistIconClicked(rowId: number) {
    this.router.navigate([
      STANDARD_ROUTES.processList
    ]);
  }

  onRefresh() {
    this.storeDispatches();
    this.store.dispatch(new ShowToast({
      title: null,
      message: `Data is being refreshed.`,
      type: ToastTypes.INFO
    }))
  }
}
