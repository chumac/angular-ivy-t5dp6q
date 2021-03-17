import { Component, OnInit, OnDestroy, ViewChild, Inject } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { ResignationViewerComponent } from '../resignation-viewer/resignation-viewer.component';
import { map, take } from 'rxjs/operators';
import { ToastTypes } from '@nutela/shared/app-global';
import { ShowToast } from '@nutela/store/shared';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { IProcessStep } from '../../interfaces/process-step.interface';
import { Location } from '@angular/common';
import { activePersonnel, allowLMViewEmployeeLetter } from '@nutela/store/modules/foundation';
import { UtilService } from '@nutela/core-services';
import { IComprehensiveData, IPersonal } from '@nutela/models/workforce/employee-profiles';
import { IAppState } from '@nutela/store/app-state';
import { getPendingResponses, LoadPendingResponses, ShowPendingResponsesViewer, HidePendingResponsesViewer, showPendingResponses, LoadingProcessData, LoadSubmittedLetter, LoadProcessListData, getSubmittedLetter, isLoadingExitProcess, getProcessListData, getLetterDocument, getExitEmployeePhotoLM, LoadExitEmployeePhoto } from '../../store/process';
import { ISubscriptions } from '@nutela/models/common';
import { IResignationSubmitted } from 'libs/models/workforce/exit/src/lib/interfaces';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'x365-fm-workforce-exit-lm-process-steps',
  templateUrl: './lm-process-steps.component.html',
  styleUrls: ['./lm-process-steps.component.scss'],
})
export class LMProcessStepsComponent implements OnInit, OnDestroy {

  private subscriptions: ISubscriptions = {};
  employeeId: number
  resignationId: number
  documentData: any;
  showViewIcon: boolean = false;
  showClearanceIcon: boolean = false;
  iconText: string = 'View Details';

  employeeLetter$: Observable<IResignationSubmitted>;
  employeePhoto$: Observable<any>;
  processData$: Observable<IProcessStep[]>;
  isLoading$: Observable<boolean>;
  activePersonnel$: Observable<IPersonal[]>;
  documentData$: Observable<any>;
  showViewer$: Observable<boolean>;
  comprehensiveData$: Observable<IComprehensiveData>;
  pendingResponses$: Observable<any[]>;
  allowViewLetter$: Observable<string>;

  @ViewChild('viewer') viewer: ResignationViewerComponent;

  resignationDialogRef: MatDialogRef<ResignationViewerComponent>;

  constructor(@Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private titleService: Title, private store: Store<IAppState>, public dialog: MatDialog, private router: Router, private route: ActivatedRoute, private location: Location, public utilService: UtilService) {
    titleService.setTitle(
      `${'Proxy Process List'}${this.partialDocumentTitle}`
    );
    this.route.params.pipe(take(1)).subscribe(params => {
      this.employeeId = params.employeeId;
    })
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
    this.setIconVisibility();
  }

  storeSelects() {
    this.employeeLetter$ = this.store.select(pipe(getSubmittedLetter));
    this.isLoading$ = this.store.select(pipe(isLoadingExitProcess));
    this.processData$ = this.store.select(pipe(getProcessListData));
    this.employeePhoto$ = this.store.pipe(select(getExitEmployeePhotoLM));
    this.activePersonnel$ = this.store.pipe(select(activePersonnel));
    this.documentData$ = this.store.pipe(select(getLetterDocument));
    this.pendingResponses$ = this.store.pipe(select(getPendingResponses));
    this.showViewer$ = this.store.select(pipe(showPendingResponses));
    this.allowViewLetter$ = this.store.select(pipe(allowLMViewEmployeeLetter));
  }

  storeDispatches() {
    this.store.dispatch(new LoadingProcessData());
    this.store.dispatch(new LoadSubmittedLetter({ employeeId: this.employeeId }));
    this.store.dispatch(new LoadProcessListData({ employeeId: this.employeeId }));
    this.store.dispatch(new LoadExitEmployeePhoto(this.employeeId));
    // this.store.dispatch(new LoadActivePersonnel());
  }

  getRowData$(rowId: number): Observable<IProcessStep> {
    return this.processData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()), take(1))
  }

  getEmployeeData$(): Observable<IPersonal> {
    return this.activePersonnel$.pipe(
      map(d => d.filter(v => v.employee_id === +this.employeeId)),
      map(e => e.shift()), take(1))
  }


  setIconVisibility() {
    this.subscriptions['iconDisplayCheck'] = this.processData$.subscribe(val => {
      if (val) {
        val.forEach(item => {
          if (item.process_id == 1 && item.status == 2) {
            this.showViewIcon = true
            this.iconText = 'View Letter'
          }
          if (item.process_id == 3 && item.status == 2) {
            this.showClearanceIcon = true
          }
        })
      }

    })
  }

  getProcessId(id: number): number {
    let processId: number;
    this.getRowData$(id).pipe(take(1)).subscribe(row => {
      processId = row.process_id;
    })
    return processId
  }

  getStatus(id: number): number {
    let status: number;
    this.getRowData$(id).pipe(take(1)).subscribe(row => {
      status = row.status;
    })
    return status
  }

  goBack() {
    this.location.back();
  };

  viewResignationLetter() {
    this.employeeLetter$.pipe(take(1)).subscribe(data => {
      if (data) {
        this.openModal(data);
      } else {
        new ShowToast({
          title: null,
          message: `Resignation Letter not available yet.`,
          type: ToastTypes.INFO
        });
      }
    });
  }

  onDownloadIconClicked(rowId: number) {
    this.employeeLetter$.pipe(take(1))
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
  onViewIconClicked(rowId: number) {
    if (this.getProcessId(rowId) === 1) {
      this.viewResignationLetter();
    }
  }


  onPendingResponsesClicked(rowId: number) {
    this.employeeLetter$.pipe(take(1)).subscribe(letter => {
      this.store.dispatch(new LoadPendingResponses({ resignationId: letter.id }));
      this.store.dispatch(new ShowPendingResponsesViewer());
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

  onRefresh() {
    this.storeDispatches();
    this.setIconVisibility();
    new ShowToast({
      title: null,
      message: `Data is being refreshed.`,
      type: ToastTypes.INFO
    });
  }

  onCancelViewer() {
    this.store.dispatch(new HidePendingResponsesViewer());
  }

  onViewReportClicked(event) {
    console.log(event);
  }

  ngOnDestroy() {
    this.utilService.unsubscribe(...Object.values(this.subscriptions));
  }
}
