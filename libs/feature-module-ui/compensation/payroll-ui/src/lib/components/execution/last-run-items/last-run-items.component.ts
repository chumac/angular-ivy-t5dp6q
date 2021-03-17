import { Component, OnInit, ViewChild, Inject, ElementRef, SimpleChanges } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IgxGridComponent } from 'igniteui-angular';
import { Store, select } from '@ngrx/store';
import { Title } from '@angular/platform-browser';
import { DialogService } from '@nutela/shared/ui';
import { map, take, takeUntil } from 'rxjs/operators';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes, STANDARD_ROUTES } from '@nutela/shared/app-global';
import { SelectComponent } from 'ng-uikit-pro-standard';
import { IRootState } from '../../../store/root/root.state';
import { IPayrollProfile } from '@nutela/models/compensation/payment';
import { LastRunItemsService } from './last-run-items.service';
import { isLoadingLastRun, getLastRunData, getLastRunStatusData, LoadingLastRunItem, LoadLastRunData, LoadLastRunStatusData, ShowViewerLastRunStatus, HideViewerLastRunStatus, showStatusViewer, showFigureViewer, getEmployeeData, ShowViewerLastRunFigure, LoadEmployeeData, getPayslipData, LoadPayslipData, SendRunDataForApproval, ShowEditorFinalize, showFinalizeEditor, HideEditorFinalize, NotProcessingLastRunItem, CancelRun, LoadByIdPayrollProfileData, getByIdPayrollProfileData, getReportUrlData, LoadReportUrlData, getSendForApprovalMessageData } from '../../../store/execution/last-run-item';
import { LastRunItemStatusViewerComponent } from './last-run-item-status-viewer/last-run-item-status-viewer.component';
import { FigureViewerComponent } from './figure-viewer/figure-viewer.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FinalizeEditorComponent } from './finalize-editor/finalize-editor.component';
import { ILastRun } from '@nutela/models/compensation/payroll';
import { UtilService, formatDate } from '@nutela/core-services';
import * as Constants from '../../../constants/common'
import { ISubscriptions } from '@nutela/models/common';


@Component({
  selector: 'x365-fm-payrl-run',
  templateUrl: './last-run-items.component.html',
  styleUrls: ['./last-run-items.component.scss']
})
export class LastRunItemsComponent implements OnInit {

  payrollProfileID: number;
  parentSubject: Subject<any> = new Subject();

  private subscriptions: ISubscriptions = {};

  showStatusViewer$: Observable<boolean>;
  showdFigureViewer$: Observable<boolean>;
  showFinalizeEditor$: Observable<boolean>;
  employeeData$: Observable<any>
  isLoading$: Observable<boolean>;
  sendForApprovalMessage$: Observable<any>;
  lastRunData$: Observable<ILastRun[]>;
  lastRunStatusData$: Observable<any[]>;
  paySlipData$: Observable<any[]>;
  payrollProfile$: Observable<IPayrollProfile>;
  reportUrl$: Observable<any>;

  @ViewChild("lastRunDataGrid") lastRunDataGrid: IgxGridComponent;
  @ViewChild("viewer") viewer: LastRunItemStatusViewerComponent;
  @ViewChild("finalizeEditor") finalizeEditor: FinalizeEditorComponent;
  @ViewChild("figureViewer") figureViewer: FigureViewerComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('filterBy') filterBy: SelectComponent;


  constructor(@Inject('partialDocumentTitle') private partialDocumentTitle: string,
  private titleService: Title, public service: LastRunItemsService, private store: Store<IRootState>, private dialogService: DialogService, private route: ActivatedRoute, private router: Router, private utilService: UtilService) {
    titleService.setTitle(
      `${'Last Run Items'}${this.partialDocumentTitle}`
    );

    this.assignProfileId();
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
    this.payrollProfile$.subscribe(data => {
      if (data) {
        let payrollPeriod = formatDate(data.current_period)
        this.store.dispatch(new LoadLastRunData({ payrollProfileID: data.payroll_profile_id, payrollPeriod: payrollPeriod }));
      }
    })
  }

  assignProfileId() {
    this.route.params.pipe(take(1)).subscribe(v => {
      this.payrollProfileID = parseInt(v.profileID);
      this.store.dispatch(new LoadByIdPayrollProfileData({payrollProfileID: v.profileID}));
    });
  }

  storeSelects() {
    this.isLoading$ = this.store.pipe(select(isLoadingLastRun));
    this.lastRunData$ = this.store.pipe(select(getLastRunData));
    this.lastRunStatusData$ = this.store.pipe(select(getLastRunStatusData));
    this.employeeData$ = this.store.pipe(select(getEmployeeData));
    this.paySlipData$ = this.store.pipe(select(getPayslipData));
    this.showStatusViewer$ = this.store.pipe(select(showStatusViewer));
    this.showdFigureViewer$ = this.store.pipe(select(showFigureViewer));
    this.showFinalizeEditor$ = this.store.pipe(select(showFinalizeEditor));
    this.payrollProfile$ = this.store.pipe(select(getByIdPayrollProfileData))
    this.reportUrl$ = this.store.pipe(select(getReportUrlData))
    this.sendForApprovalMessage$ = this.store.pipe(select(getSendForApprovalMessageData))

    this.showdFigureViewer$.subscribe(val => {
      if (val === false) {
        if (this.subscriptions.employees) {
          this.subscriptions.employees.unsubscribe();
        }
      }
    })
  }

  storeDispatches() {
    this.store.dispatch(new LoadingLastRunItem());
  }


  getRowData$(rowId: number): Observable<ILastRun> {
    return this.lastRunData$.pipe(
      map(d => d.filter(v => v.payrollrun_id === rowId)),
      map(e => e.shift()))
  }

  getFirstFilteredData$(rowId: number): Observable<any> {
    return this.paySlipData$.pipe(
      map(d => {
        if (d) {
          return d.filter(v => v.info_type === rowId)
        }
      }))
  }

  isCurrentRun(rowId: number): boolean {
    let yes: boolean;
    this.getRowData$(rowId).pipe(take(1)).subscribe(run => {
      (run && run.is_last_run) ? yes = true : yes = false;
    });
    return yes
  }

  separateData() {
    this.figureViewer.selectedEmployeeData = this.getFirstFilteredData$(Constants.PAYSLIP_INFO_TYPE.employee);
    this.figureViewer.allowanceData = this.getFirstFilteredData$(Constants.PAYSLIP_INFO_TYPE.allowances);
    this.figureViewer.deductionData = this.getFirstFilteredData$(Constants.PAYSLIP_INFO_TYPE.deductions);
    this.figureViewer.grossPayData = this.getFirstFilteredData$(Constants.PAYSLIP_INFO_TYPE.grossPay);
    this.figureViewer.netPayData = this.getFirstFilteredData$(Constants.PAYSLIP_INFO_TYPE.netPay);
    this.figureViewer.employerContributionData = this.getFirstFilteredData$(Constants.PAYSLIP_INFO_TYPE.employerContribution);
    this.figureViewer.reliefData = this.getFirstFilteredData$(Constants.PAYSLIP_INFO_TYPE.reliefs);
    this.figureViewer.loanData = this.getFirstFilteredData$(Constants.PAYSLIP_INFO_TYPE.loan);
    this.figureViewer.totalDeductionData = this.getFirstFilteredData$(Constants.PAYSLIP_INFO_TYPE.totalDeduction);
    this.figureViewer.taxPayData = this.getFirstFilteredData$(Constants.PAYSLIP_INFO_TYPE.taxPayee);
  }


  onAdd() {

  }

  onRefresh() {
    this.payrollProfile$.pipe(take(1)).subscribe(data => {
      if (data) {
        let payrollPeriod = formatDate(data.current_period)
        this.store.dispatch(new LoadLastRunData({ payrollProfileID: data.payroll_profile_id, payrollPeriod: payrollPeriod }));
        this.store.dispatch(new ShowToast({ title: null, message: `Data is being refreshed.`, type: ToastTypes.INFO }));
      }
    })
  }

  goBack() {
    this.router.navigate([STANDARD_ROUTES.runProfiles]);
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

    if (this.lastRunDataGrid) {
      this.service.search(
        this.lastRunDataGrid,
        searchString,
        filterBy
      );
    }
  }

  onViewStatusIconClicked(rowId: number) {
    this.store.dispatch(new LoadLastRunStatusData({ payrollRunID: rowId }));
    this.lastRunStatusData$.subscribe(data => {
      if (data) {
        this.viewer.data = data
        this.viewer.runId = rowId;
        this.store.dispatch(new ShowViewerLastRunStatus());
      }
    })
  }


  canViewReport(rowId: number): boolean {
    let status = false;

    this.subscriptions['status'] = this.getRowData$(rowId)
      .pipe(take(1)).subscribe((result) => {
        if (result.status == 0 || result.status == 1) {
          status = true;
        } else {
          status = false;
        }
      });

    return status;
  }

  canFinalize(rowId: number): boolean {
    let status = false;

    this.subscriptions['status'] = this.getRowData$(rowId)
      .pipe(take(1)).subscribe((result) => {
        if (result.status == 5) {
          status = true;
        } else {
          status = false;
        }
      });

    return status;
  }

  canSendForApproval(rowId: number): boolean {
    let status = false;

    this.subscriptions['status'] = this.getRowData$(rowId)
      .pipe(take(1)).subscribe((result) => {
        if (result.status == 5) {
          status = true;
        } else {
          status = false;
        }
      });

    return status;
  }

  onViewReportIconClicked(rowId: number) {
    this.store.dispatch(new LoadReportUrlData({ payrollRunID: rowId }))

    this.reportUrl$.pipe(take(1)).subscribe(url => {
      if (url) {
        window.open(url, '_blank');
      }
    })
  }

  onSendForApprovalIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), `This action will submit the record for approval. Continue?`);

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.getRowData$(rowId).pipe(take(1)).subscribe(rowData => {
          if (rowData) {
            let payrollPeriod = formatDate(rowData.payroll_period);
            // let data = {
            //   payroll_profile_id: rowData.payroll_profile_id,
            //   payroll_period: payrollPeriod,
            //   grouprun: rowData.grouprun,
            //   grouprun_id: rowData.grouprun_id
            // }
            this.store.dispatch(new LoadingLastRunItem());
            this.store.dispatch(new SendRunDataForApproval({ payrollRunID: rowId, payrollProfileID: rowData.payroll_profile_id, payrollPeriod }));
          }
        })
      }
    });
  }

  onViewFiguresIconClicked(rowId: number) {
    this.getRowData$(rowId).pipe(take(1)).subscribe(rowData => {
      if (rowData) {
        if (rowData.status > 1) {
          this.store.dispatch(new LoadEmployeeData({ payrollRunID: rowId, payrollProfileID: rowData.payroll_profile_id }))
          this.loadFirstEmployeePayslip(formatDate(rowData.payroll_period), rowData.payroll_profile_id);
          this.figureViewer.payrollProfileId = rowData.payroll_profile_id;
          this.figureViewer.payrollDate = formatDate(rowData.payroll_period);
          this.separateData();
          this.store.dispatch(new ShowViewerLastRunFigure());
        } else {
          this.store.dispatch(new ShowToast({ title: 'Data Item Could Not Be Loaded', message: `This functionality is not available while payroll is executing. Please try again when the process completes.`, type: ToastTypes.INFO }));
        }
      }
    })
  }

  loadFirstEmployeePayslip(payrollDate: string, payrollProfileId: number) {
    let firstEmployeeId: number;
    this.subscriptions['employees'] = this.employeeData$.subscribe(employees => {
      if (employees) {
        firstEmployeeId = employees[0].employee_id;
        this.parentSubject.next(firstEmployeeId);
        this.figureViewer.firstEmployeeId = firstEmployeeId;
        this.store.dispatch(new LoadPayslipData({ payrollDate: payrollDate, employeeID: firstEmployeeId, payrollProfileID: payrollProfileId }));
      }
    })
  }

  onRunStatusIconClicked(rowId: number) {

  }

  onFinalizeIconClicked(rowId: number) {
    this.getRowData$(rowId).pipe(take(1)).subscribe(rowData => {
      let payrollPeriod = formatDate(rowData.payroll_period)
      this.finalizeEditor.payrollRunId = rowId;
      this.finalizeEditor.payrollProfileId = rowData.payroll_profile_id;
      this.finalizeEditor.payrollPeriod = payrollPeriod;
      this.store.dispatch(new ShowEditorFinalize());
    })
  }

  onCancelIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), `This action will submit the record for cancellation. Continue?`);

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.getRowData$(rowId).pipe(take(1)).subscribe(rowData => {
          let payrollPeriod = formatDate(rowData.payroll_period);
          let payrollProfileID = rowData.payroll_profile_id;
          this.store.dispatch(new LoadingLastRunItem());
          this.store.dispatch(new CancelRun({ payrollRunId: rowId, payrollProfileID, payrollPeriod }));
        })
      }
    });
  }

  onCancelViewer() {
    this.viewer.data = null;
    this.store.dispatch(new HideViewerLastRunStatus());
  }
  onCancelEditor() {
    this.store.dispatch(new NotProcessingLastRunItem());
    this.store.dispatch(new HideEditorFinalize());
  }

  unsubscribe() {
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

}
