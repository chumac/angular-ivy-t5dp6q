import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { ResignationViewerComponent } from '../resignation-viewer/resignation-viewer.component';
import { map, take } from 'rxjs/operators';
import { ToastTypes, STANDARD_ROUTES } from '@nutela/shared/app-global';
import { ShowToast } from '@nutela/store/shared';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ISubscriptions } from '@nutela/models/common';
import { Router, ActivatedRoute } from '@angular/router';
import { isLoadingHrProcessData, getEmployeeSubmittedLetter, getEmployeeProcessListData, LoadingEmployeeProcessData, LoadEmployeeSubmittedLetter, LoadEmployeeProcessListData, IsUserAdmin, getEmployeeLetterDocument, showEditorSeparation, ShowSeparationEditor } from '../../store/hr-process';
import { IProcessStep } from '../../interfaces/process-step.interface';
import { IResignationLetter } from '../../interfaces';
import { Location } from '@angular/common';
import { UtilService } from '@nutela/core-services';
import { getComprehensiveData, LoadComprehensiveData, getEmployeePhoto, LoadEmployeePhoto } from 'libs/feature-module-ui/workforce/employee-profiles-ui/src/lib/store/employee-detailed-area';
import { IComprehensiveData } from '@nutela/models/workforce/employee-profiles';
import { IAppState } from '@nutela/store/app-state';
import { getPendingResponses, LoadPendingResponses, ShowPendingResponsesViewer, HidePendingResponsesViewer, showPendingResponses } from '../../store/process';
import { SeparationEditorComponent } from 'libs/feature-module-ui/workforce/employee-profiles-ui/src/lib/components/common/hr-transactions/separations/separation-editor/separation-editor.component';
import { LoadEmployeeList, LoadStatus, LoadReason, LoadAllowance, LoadCurrency } from 'libs/feature-module-ui/workforce/employee-profiles-ui/src/lib/store/hr-transactions/separation';
import { StartInterview } from '../../store/resignation';
import { DialogService } from '@nutela/shared/ui';

@Component({
  selector: 'x365-fm-workforce-exit-hr-process-steps',
  templateUrl: './hr-process-steps.component.html',
  styleUrls: ['./hr-process-steps.component.scss'],
})
export class HrProcessStepsComponent implements OnInit, OnDestroy {

  private subscriptions: ISubscriptions = {};
  employeeId: number
  resignationId: number
  documentData: any;
  showFinalizeIcon: boolean = false;
  showClearanceIcon: boolean = false;
  showViewIcon: boolean = false;
  showReportIcon: boolean = false;
  iconText: string = 'View Details';

  employeeLetter$: Observable<IResignationLetter>;
  employeePhoto$: Observable<any>;
  processData$: Observable<IProcessStep[]>;
  isLoading$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  showEditor$: Observable<boolean>;
  documentData$: Observable<any>;
  comprehensiveData$: Observable<IComprehensiveData>;
  pendingResponses$: Observable<any[]>;

  @ViewChild('viewer') viewer: ResignationViewerComponent;
  @ViewChild('editor') editor: SeparationEditorComponent;

  resignationDialogRef: MatDialogRef<ResignationViewerComponent>;

  constructor(private store: Store<IAppState>, public dialog: MatDialog, private router: Router, private route: ActivatedRoute, private location: Location, public utilService: UtilService, private dialogService: DialogService) {
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
    this.employeeLetter$ = this.store.select(pipe(getEmployeeSubmittedLetter));
    this.isLoading$ = this.store.select(pipe(isLoadingHrProcessData));
    this.processData$ = this.store.select(pipe(getEmployeeProcessListData));
    this.employeePhoto$ = this.store.pipe(select(getEmployeePhoto));
    this.showViewer$ = this.store.pipe(select(showPendingResponses));
    this.showEditor$ = this.store.pipe(select(showEditorSeparation));
    this.documentData$ = this.store.pipe(select(getEmployeeLetterDocument));
    this.comprehensiveData$ = this.store.select(pipe(getComprehensiveData));
    this.pendingResponses$ = this.store.pipe(select(getPendingResponses));
  }

  storeDispatches() {
    this.store.dispatch(new LoadingEmployeeProcessData());
    this.store.dispatch(new LoadEmployeeProcessListData({ employeeId: this.employeeId }));
    this.store.dispatch(new LoadEmployeePhoto({employeeId: this.employeeId}));
    this.store.dispatch(new LoadComprehensiveData({employeeId: this.employeeId}));
    this.store.dispatch(new LoadEmployeeSubmittedLetter({employeeId: this.employeeId}));

    this.store.dispatch(new LoadEmployeeList());
    this.store.dispatch(new LoadStatus());
    this.store.dispatch(new LoadReason());
    this.store.dispatch(new LoadAllowance());
    this.store.dispatch(new LoadCurrency());
  }

  getRowData$(rowId: number): Observable<IProcessStep> {
    return this.processData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()), take(1))
  }

  onFinalizeIconClicked(rowId: number) {
    this.editor.data = null;

    this.editor.data = this.getResignationAsSeparation();
    this.store.dispatch(new ShowSeparationEditor(true));
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
            this.iconText = 'View Report';
            this.showReportIcon = true
            this.showClearanceIcon = true
          }
          if (item.process_id == 4 && item.status == 2) {
            this.showFinalizeIcon = true;
            this.showClearanceIcon = false;
          }
        })
      }

    })
  }

  getResignationAsSeparation(): any {
    let separation: any
    this.employeeLetter$.pipe(take(1)).subscribe(resignation => {
      separation = {
        employee_id: resignation.employee_id,
        reason_4exit_id: resignation.separation_type,
        exit_notes: null,
        sent_notice: true,
        effective_date: resignation.effective_date,
        process_payroll: null,
        pay_lumpsum: null,
        lumpsum_amount: null,
        lumpsum_allowance_id: null,
        currency_id: null,
        notice_date: null,
        resignation_id: resignation.id,
        replace_id: null
      };
    });
    return separation;
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


  onViewReportIconClicked(rowId: number) {
    this.employeeLetter$.pipe(take(1)).subscribe(letter => {
      this.dialogService.show(this.dialogService.options(), `This action will take you out of the app. Continue?`);

      this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
        if (confirmed) {
          this.store.dispatch(new StartInterview({ resignationId: letter.id }));
        }
      });
    })

  }

  onViewIconClicked(rowId: number) {
    if (this.getProcessId(rowId) === 1) {
      this.viewResignationLetter();
    }
  }

  onClearanceProcessIconClicked(rowId: number) {
    this.employeeLetter$.pipe(take(1)).subscribe(resignation => {
      this.store.dispatch(new IsUserAdmin(true));
      this.router.navigate([`${STANDARD_ROUTES.hrResponseForm}/${this.employeeId}/${resignation.id}`]);
    });
  }

  onPendingResponsesClicked(rowId: number) {
    this.employeeLetter$.pipe(take(1)).subscribe(letter => {
      this.store.dispatch(new LoadPendingResponses({ resignationId: letter.id }));
      this.store.dispatch(new ShowPendingResponsesViewer());
    });
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

  onCancelEditor() {
    this.store.dispatch(new ShowSeparationEditor(false));
  }

  ngOnDestroy() {
    this.utilService.unsubscribe(...Object.values(this.subscriptions));
  }
}
