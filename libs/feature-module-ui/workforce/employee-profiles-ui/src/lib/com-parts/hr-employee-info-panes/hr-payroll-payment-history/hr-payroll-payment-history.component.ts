import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IEmployeesProfileState } from '../../../store';
import { Store, select } from '@ngrx/store';
import { IPayrollPaymentHistory } from '@nutela/models/workforce/employee-profiles';
import { LoadApprovedDataPayrollPaymentHistory, showEditorPayrollPaymentHistory, showViewerPayrollPaymentHistory, getPayrollPaymentHistoryApprovedData, ShowViewerPayrollPaymentHistory } from '../../../store/employee-detailed-area';
import { HrPayrollPaymentHistoryViewerComponent } from './hr-payroll-payment-history-viewer/hr-payroll-payment-history-viewer.component';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'x365-fm-workforce-hr-payroll-payment-history',
  templateUrl: './hr-payroll-payment-history.component.html',
  styleUrls: ['./hr-payroll-payment-history.component.scss']
})
export class HrPayrollPaymentHistoryComponent implements OnInit {
 @ViewChild('viewer') viewer: HrPayrollPaymentHistoryViewerComponent;

  @Input() employeeId: number;

  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;

  public approvedData$: Observable<IPayrollPaymentHistory[]>;
  public awaitingApprovalData$: Observable<IPayrollPaymentHistory[]>;

  constructor(@Inject('partialDocumentTitle')
  private partialDocumentTitle: string,
  private titleService: Title,
  private store: Store<IEmployeesProfileState>,) {
    titleService.setTitle(
      `${'HR Payroll Payment History'}${this.partialDocumentTitle}`
    );
  }

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeDispatches() {
    this.store.dispatch(new LoadApprovedDataPayrollPaymentHistory({ employeeId: this.employeeId }));
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorPayrollPaymentHistory));
    this.showViewer$ = this.store.pipe(select(showViewerPayrollPaymentHistory));

    this.approvedData$ = this.store.pipe(select(getPayrollPaymentHistoryApprovedData));
  }

  onApprovedEditIconClicked(rowId: number) {

  }

  onAwaitingApprovalEditIconClicked(rowId: number) {

  }

  onApprovedViewIconClicked(rowId: number) {
    // this.viewer.data = null;

    // this.approvedData$.subscribe(
    //   (data: IPayrollPaymentHistory[]) => {
    //     const index = data.findIndex(row => row.employee_id === rowId);
    //     this.viewer.data = data[index];

    //     this.store.dispatch(new ShowViewerPayrollPaymentHistory());
    //   }
    // );
  }

  onAwaitingApprovalViewIconClicked(row: number) {

  }
}
