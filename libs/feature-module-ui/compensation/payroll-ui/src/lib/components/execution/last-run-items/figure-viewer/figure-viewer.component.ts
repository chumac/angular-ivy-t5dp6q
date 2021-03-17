
import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { IRootState } from '../../../../store/root';
import { isProcessingLastRun, ProcessingLastRunItem, HideViewerLastRunFigure, LoadPayslipData, LoadPayslipDataSuccess } from '../../../../store/execution/last-run-item';
import { UtilService } from '@nutela/core-services';
import { DxLookupComponent } from 'devextreme-angular';
import * as Constants from '../../../../constants/common'
import { take } from 'rxjs/operators';


@Component({
  selector: 'x365-fm-payrl-figure-viewer',
  templateUrl: './figure-viewer.component.html',
  styleUrls: ['./figure-viewer.component.scss']
})
export class FigureViewerComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: any;
  @Input() public employeeData: any[];
  @Input() public payrollProfileId: number;
  @Input() public payrollDate: string;
  @Input() public firstEmployeeId: number;
  @Input() public selectedEmployeeData: Observable<any>;
  @Input() public allowanceData: Observable<any>;
  @Input() public deductionData: Observable<any>;
  @Input() public grossPayData: Observable<any>;
  @Input() public netPayData: Observable<any>;
  @Input() public employerContributionData: Observable<any>;
  @Input() public loanData: Observable<any>;
  @Input() public reliefData: Observable<any>;
  @Input() public taxPayData: Observable<any>;
  @Input() public totalDeductionData: Observable<any>;
  @Input() public dataDoc: any;
  @Input() parentSubjectListener: Subject<any>;
  @Output() public setFirstEmployee: EventEmitter<any> = new EventEmitter;

  @ViewChild('employeeSelect') employeeSelect: DxLookupComponent;

  isProcessing$: Observable<boolean>;

  constructor(public utilService: UtilService, private store: Store<IRootState>) {}

  ngOnInit() {
    this.isProcessing$ = this.store.pipe(select(isProcessingLastRun))
    this.store.dispatch(new ProcessingLastRunItem());
    this.setFirstEmployeeValue();
  }

  setFirstEmployeeValue() {
    this.parentSubjectListener.subscribe(event => {
      if (event) {
        this.employeeSelect.value = event;
      }
    })
  }

  getOtherFilteredData$(rowId: number): Observable<any> {
    return this.data.
      map(d => {
        if (d) {
          return d.filter(v => v.info_type === rowId)
        }
      })
  }

  onEmployeeSelected(event) {
    this.store.dispatch(new LoadPayslipDataSuccess(null))
    this.store.dispatch(new LoadPayslipData({ payrollDate: this.payrollDate, employeeID: event.itemData.employee_id, payrollProfileID: this.payrollProfileId }))
    this.selectedEmployeeData = this.getOtherFilteredData$(Constants.PAYSLIP_INFO_TYPE.employee)
    this.allowanceData = this.getOtherFilteredData$(Constants.PAYSLIP_INFO_TYPE.allowances)
    this.deductionData = this.getOtherFilteredData$(Constants.PAYSLIP_INFO_TYPE.deductions);
    this.grossPayData = this.getOtherFilteredData$(Constants.PAYSLIP_INFO_TYPE.grossPay);
    this.netPayData = this.getOtherFilteredData$(Constants.PAYSLIP_INFO_TYPE.netPay);
    this.employerContributionData = this.getOtherFilteredData$(Constants.PAYSLIP_INFO_TYPE.employerContribution);
    this.reliefData = this.getOtherFilteredData$(Constants.PAYSLIP_INFO_TYPE.reliefs);
    this.loanData = this.getOtherFilteredData$(Constants.PAYSLIP_INFO_TYPE.loan);
    this.totalDeductionData = this.getOtherFilteredData$(Constants.PAYSLIP_INFO_TYPE.totalDeduction);
    this.taxPayData = this.getOtherFilteredData$(Constants.PAYSLIP_INFO_TYPE.taxPayee);

  }
  onDoneClicked() {
    this.store.dispatch(new HideViewerLastRunFigure());
    this.data = [];
    this.employeeSelect.value = '';
  }

  ngOnDestroy() {
    this.parentSubjectListener.unsubscribe();
  }
}
