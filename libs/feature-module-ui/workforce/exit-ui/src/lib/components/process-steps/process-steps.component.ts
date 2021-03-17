import { Component, OnInit, OnDestroy, ViewChild, Inject } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import {
  LoadLetterResign,
  ShowChecklistViewerResign,
  LoadReviewChecklistDataResign,
} from '../../store/resign';
import { Store, select } from '@ngrx/store';
import {
  IReviewChecklist
} from 'libs/models/workforce/exit/src/lib/interfaces';
import { ResignationViewerComponent } from '../resignation-viewer/resignation-viewer.component';
import { map, take } from 'rxjs/operators';
import { ToastTypes, STANDARD_ROUTES } from '@nutela/shared/app-global';
import { ShowToast } from '@nutela/store/shared';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ISubscriptions } from '@nutela/models/common';
import { Router } from '@angular/router';
import { LoadProcessListData, getProcessListData, getSubmittedLetter, LoadSubmittedLetter, isLoadingExitProcess, LoadingProcessData, CancelMyProcess, getInterviewLink, getLetterDocument, HidePendingResponsesViewer, ShowPendingResponsesViewer, LoadPendingResponses, getPendingResponses, showPendingResponses, getCustomFormData } from '../../store/process';
import { IProcessStep } from '../../interfaces/process-step.interface';
import { IResignationLetter } from '../../interfaces';
import { getEmployeePhoto, getComprehensiveData, showEditorCustomDataForm, ShowEditorCustomDataForm, HideEditorCustomDataForm } from '@nutela/store/modules/workforce/employee-profiles';
import { Title } from '@angular/platform-browser';
import { interviewStarted, StartInterview } from '../../store/resignation';
import { UtilService } from '@nutela/core-services';
import { DialogService } from '@nutela/shared/ui';
import { IComprehensiveData, ICustomDataForm } from '@nutela/models/workforce/employee-profiles';
import { IAppState } from '@nutela/store/app-state';
import { CustomDataFormsEditorComponent } from 'libs/feature-module-ui/workforce/employee-profiles-ui/src/lib/com-parts/employee-info-panes/custom-data-form/custom-data-forms-editor/custom-data-forms-editor.component';

@Component({
  selector: 'x365-fm-workforce-exit-process-steps',
  templateUrl: './process-steps.component.html',
  styleUrls: ['./process-steps.component.scss']
})
export class ProcessStepsComponent implements OnInit, OnDestroy {

  private subscriptions: ISubscriptions = {};

  resignationLetter$: Observable<IResignationLetter>;
  myPhoto$: Observable<any>;
  processData$: Observable<IProcessStep[]>;
  isLoading$: Observable<boolean>;
  documentData$: Observable<any>;
  showViewer$: Observable<boolean>;
  showEditor$: Observable<boolean>;
  showProcessTableViewer$: Observable<boolean>;
  showChecklistViewer$: Observable<boolean>;
  showPendingResponsesViewer$: Observable<boolean>;
  processTableData$: Observable<any[]>;
  checklistData$: Observable<IReviewChecklist[]>;
  interviewLink$: Observable<string>;
  interviewStarted$: Observable<boolean>;
  comprehensiveData$: Observable<IComprehensiveData>;
  pendingResponses$: Observable<any[]>;
  customFormData$: Observable<ICustomDataForm>;
  previousUrl: string;

  showInterviewIcon: boolean = false;
  showReportIcon: boolean = false;
  showFinalizeIcon: boolean = false;
  showClearanceIcon: boolean = false;
  resignationId: number;

  @ViewChild('viewer') viewer: ResignationViewerComponent;
  @ViewChild('editor') editor: CustomDataFormsEditorComponent;

  resignationDialogRef: MatDialogRef<ResignationViewerComponent>;

  constructor(
    @Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private titleService: Title,
    private store: Store<IAppState>,
    public dialog: MatDialog,
    private router: Router,
    public utilService: UtilService,
    private dialogService: DialogService
  ) {
    titleService.setTitle(
      `${'My Process List'}${this.partialDocumentTitle}`
    );
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
    this.setIconVisibility();
    this.setResignationId();
  }

  storeSelects() {
    this.resignationLetter$ = this.store.select(pipe(getSubmittedLetter));
    this.showPendingResponsesViewer$ = this.store.select(pipe(showPendingResponses));
    this.comprehensiveData$ = this.store.select(pipe(getComprehensiveData));
    this.isLoading$ = this.store.select(pipe(isLoadingExitProcess));
    this.documentData$ = this.store.pipe(select(getLetterDocument));
    this.interviewLink$ = this.store.select(pipe(getInterviewLink));
    this.processData$ = this.store.select(pipe(getProcessListData));
    this.myPhoto$ = this.store.pipe(select(getEmployeePhoto));
    this.interviewStarted$ = this.store.pipe(select(interviewStarted));
    this.pendingResponses$ = this.store.pipe(select(getPendingResponses));
    this.customFormData$ = this.store.pipe(select(getCustomFormData));
    this.showEditor$ = this.store.pipe(select(showEditorCustomDataForm));
  }
  storeDispatches() {
    this.store.dispatch(new LoadingProcessData());
    this.store.dispatch(new LoadSubmittedLetter({employeeId: undefined}));
    this.store.dispatch(new LoadProcessListData({employeeId: undefined}));
  }

  getRowData$(rowId: number): Observable<IProcessStep> {
    return this.processData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()), take(1))
  }

  setResignationId() {
    this.subscriptions['letter1'] = this.resignationLetter$.subscribe(val => {
      if (val) {
        this.resignationId = val.id;
      }
    });
  }

  setIconVisibility() {
    this.subscriptions['iconDisplayCheck'] = this.processData$.subscribe(val => {
      if (val) {
        val.forEach(item => {
          if (item.process_id == 2 && item.status == 2) {
            this.showInterviewIcon = true
            this.showClearanceIcon = false;
            this.showFinalizeIcon = false
            this.showReportIcon = false;
          }
          if (item.process_id == 3 && item.status == 2) {
            this.showClearanceIcon = true
            this.showReportIcon = true;
            this.showInterviewIcon = false;
          }
          if (item.process_id == 4 && item.status == 2) {
            this.showFinalizeIcon = true;
            this.showClearanceIcon = false
            this.showInterviewIcon = false;
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

  onCancelProcessClicked() {
    this.store.dispatch(new LoadingProcessData());
    this.store.dispatch(new CancelMyProcess());
  }

  onDownloadIconClicked(rowId: number) {

    this.documentData$.pipe(take(1))
      .subscribe((result) => {
        window.open(result, '_blank');
      }
      );
  }

  hasLetter(rowId: number): boolean {
    let status = false;

    this.resignationLetter$.pipe(take(1))
      .subscribe((result) => {
        if (result && result.resign_letter) {
          status = true;
        } else {
          status = false
        }
      }
      );

    return status;
  }

  getCustomFormData(data: any): ICustomDataForm {
    return {
      id: data.id,
      code: data.formInfo.code,
      description: data.formInfo.description,
      title: data.formInfo.title,
      json_text: data.json_string,
      employee_id: data.employeeInfo.employee_id,
      form_id: data.formInfo.id
    }
  }

  onInterviewIconClicked(rowId: number) {
    this.store.dispatch(new StartInterview({ resignationId: this.resignationId }));

    this.interviewStarted$.pipe(take(1)).subscribe(started => {
      if (started) {
        this.dialogService.show(this.dialogService.options(), `This action may take you out of the app. Continue?`);

        this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
          if (confirmed) {
            this.interviewLink$.pipe(take(1)).subscribe(link => {
              if (link) {
                window.open(link, '_blank')
              } else {
                this.customFormData$.pipe(take(1)).subscribe(data => {
                  if (data) {
                    this.editor.data = null;
                    this.editor.data = this.getCustomFormData(data);
                    this.editor.reset();
                    this.store.dispatch(new ShowEditorCustomDataForm());
                  }
                })
              }
            })
          }
        });
      }
    })
  }

  viewResignationLetter() {
    this.store.dispatch(new LoadLetterResign());
    this.resignationLetter$.pipe(take(1)).subscribe(data => {
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

  onViewChecklistButtonClicked(rowId: number) {
    this.subscriptions['letter'] = this.resignationLetter$.subscribe(val => {
      if (val) {
        this.store.dispatch(
          new LoadReviewChecklistDataResign({ letterId: val.id })
        );
      }
    });

    this.store.dispatch(new ShowChecklistViewerResign());
  }

  openModal(result: IResignationLetter): void {
    this.resignationDialogRef = this.dialog.open(ResignationViewerComponent, {
      width: '50%',
      minHeight: '729px',
      data: result,
      panelClass: 'custom-dialog-container'
    });
  }

  onRefresh() {
    this.storeDispatches();
    this.setIconVisibility()
    this.store.dispatch(new ShowToast({
      title: null,
      message: `Data is being refreshed.`,
      type: ToastTypes.INFO
    }));
  }

  onClearanceIconClicked(rowId: number) {
    this.resignationLetter$.pipe(take(1)).subscribe(letter => {
      this.router.navigate([`${STANDARD_ROUTES.responseForm}/${letter.id}`]);
    });
  }

  onPendingResponsesClicked(rowId: number) {
    this.resignationLetter$.pipe(take(1)).subscribe(letter => {
      this.store.dispatch(new LoadPendingResponses({ resignationId: letter.id }));
      this.store.dispatch(new ShowPendingResponsesViewer());
    });
  }

  onCancelViewer() {
    this.store.dispatch(new HidePendingResponsesViewer());
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorCustomDataForm());
  }

  ngOnDestroy() {
    this.utilService.unsubscribe(...Object.values(this.subscriptions));
  }
}
