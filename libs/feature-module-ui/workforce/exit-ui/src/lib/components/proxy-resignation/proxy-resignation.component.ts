import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Inject
} from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { IResignationSubmitted } from 'libs/models/workforce/exit/src/lib/interfaces';
import { IgxGridComponent } from 'igniteui-angular';
import { SelectComponent } from 'ng-uikit-pro-standard';
import { ProxyResignationService } from './proxy-resignation.service';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { DialogService } from '@nutela/shared/ui';
import { UtilService } from '@nutela/core-services';
import {
  LoadMySubordinates,
  getMySubordinates,
  getEmployeeInitiationStatus,
  ShowLetterEditor,
  showResignEditor,
  HideLetterEditor,
  isLoadingResignations,
  LoadingResignation,
  getProxyResignations,
  LoadDataProxyResignations
} from '../../store/resignation';
import { MatDialogRef, MatDialog } from '@angular/material';
import { ResignationViewerComponent } from '../resignation-viewer/resignation-viewer.component';
import { Router } from '@angular/router';
import { ToastTypes, BaseFormComponent, STANDARD_ROUTES, AGREEMENT_KEYS } from '@nutela/shared/app-global';
import { ShowToast } from '@nutela/store/shared';
import { IEmployee } from '@nutela/models/compensation/loans';
import { IAppState } from '@nutela/store/app-state';
import { ResignComponent } from '../resignation/resign/resign.component';
import { take, map } from 'rxjs/operators';
import { LetterStatus } from '../../enumerations/letter-status.enumeration';
import { allowLMViewEmployeeLetter } from '@nutela/store/modules/foundation';

@Component({
  selector: 'x365-fm-workforce-exit-proxy-resignation',
  templateUrl: './proxy-resignation.component.html',
  styleUrls: ['./proxy-resignation.component.scss'],
  providers: [ProxyResignationService]
})
export class ProxyResignationComponent extends BaseFormComponent implements OnInit {

  status = LetterStatus;
  employeeId: number;
  showAgreement: boolean = false;

  processInitiated$: Observable<boolean>;
  mySubordinates$: Observable<IEmployee[]>;
  proxyResignations$: Observable<IResignationSubmitted[]>;
  showEditor$: Observable<boolean>;
  agreementTemplate$: Observable<string>;
  isLoading$: Observable<boolean>;
  allowViewLetter$: Observable<string>;

  @ViewChild('resignationsDataGrid') resignationsDataGrid : IgxGridComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('filterBy') filterBy: SelectComponent;
  @ViewChild('editor') editor: ResignComponent;

  resignationDialogRef: MatDialogRef<ResignationViewerComponent>;

  constructor(
    @Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private titleService: Title,
    public fs: ProxyResignationService,
    private store: Store<IAppState>,
    private dialogService: DialogService,
    public utilService: UtilService,
    public dialog: MatDialog,
    private router: Router,
    public service: ProxyResignationService,
  ) {
    super();
    titleService.setTitle(
      `${'Proxy Exit'}${this.partialDocumentTitle}`
    );
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeSelects() {
    this.mySubordinates$ = this.store.select(pipe(getMySubordinates));
    this.processInitiated$ = this.store.select(pipe(getEmployeeInitiationStatus));
    this.showEditor$ = this.store.select(pipe(showResignEditor))
    this.isLoading$ = this.store.select(pipe(isLoadingResignations))
    this.proxyResignations$ = this.store.select(pipe(getProxyResignations));
    this.allowViewLetter$ = this.store.select(pipe(allowLMViewEmployeeLetter));
  }

  storeDispatches() {
    this.store.dispatch(new LoadingResignation())
    this.store.dispatch(new LoadMySubordinates())
    this.store.dispatch(new LoadDataProxyResignations())
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

    if (this.resignationsDataGrid) {
      this.service.search(
        this.resignationsDataGrid,
        searchString,
        filterBy
      );
    }
  }

  onSendResignationLetterClicked() {
    this.store.dispatch(new ShowLetterEditor());
  }

  getRowData$(rowId: number): Observable<IResignationSubmitted> {
    return this.proxyResignations$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  getRowByStatusTextData$(rowId: string): Observable<IResignationSubmitted> {
    return this.proxyResignations$.pipe(
      map(d => d.filter(v => v.status_text.trim().toLowerCase() === rowId.trim().toLowerCase())),
      map(e => e.shift()))
  }

  hasLetter(rowId: number): boolean {
    let status: boolean;
    this.getRowData$(rowId).pipe(take(1)).subscribe(result => {
      if (result.resign_letter && !(result.doc_binary && result.doc_extension)) {
        status = true
      } else {
        status = false;
      }
    });

    return status;
  }

  hasDocument(rowId: number): boolean {
    let status: boolean;
    this.getRowData$(rowId).pipe(take(1)).subscribe(result => {
      if ((result.doc_binary && result.doc_extension) && !result.resign_letter) {
        status = true
      } else {
        status = false;
      }
    });

    return status;
  }

  onViewLetterClicked(rowId: number) {
    this.getRowData$(rowId).pipe(take(1)).subscribe(data => {
      if (data) {
        this.openModal(data);
      }
    });
  }

  openModal(result: IResignationSubmitted): void {
    this.resignationDialogRef = this.dialog.open(ResignationViewerComponent, {
      width: '50%',
      minHeight: '729px',
      data: result,
      panelClass: 'custom-dialog-container'
    });
  }

  onDownloadIconClicked(rowId: number) {
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        if (result.doc_binary && result.doc_extension) {
          const docData = this.utilService.getDocumentData(
            result.doc_binary,
            result.doc_extension
          );
          window.open(docData, '_blank');
        }
      }
      );
  }

  onViewProcessIconClicked(rowId: number) {
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        let employeeId = result.employee_id;
        this.router.navigate([`${STANDARD_ROUTES.lmProcessList}/${employeeId}`])
      }
      );
  }

  getStatus(statusText: string): number {
    let className: number;
    this.getRowByStatusTextData$(statusText).pipe(take(1)).subscribe(letter => {
      className = letter.status
    })

    return className
  }

  onRefresh() {
    this.storeDispatches();
    this.store.dispatch(new ShowToast({
      title: null,
      message: `Data is being refreshed.`,
      type: ToastTypes.INFO
    }))
  }

  onCancelEditor() {
    this.store.dispatch(new HideLetterEditor());
  }
}
