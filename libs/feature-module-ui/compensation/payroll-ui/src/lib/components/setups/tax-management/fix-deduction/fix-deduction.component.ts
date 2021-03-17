import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { UtilService } from '@nutela/core-services';
import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { ShowToast } from '@nutela/store/shared';
import { ITaxFixedDeductionupdate } from 'libs/models/compensation/payroll/src/lib/interfaces/tax-fixedDeduction-update.interface';
import { ITaxFixedDeduction } from 'libs/models/compensation/payroll/src/lib/interfaces/tax-fixedDeduction.interface';
import { Observable } from 'rxjs';
import { IRootState } from '../../../../store/root';
import { getTaxFixedDeductionValue, HideFixedDeduction, isProcessingTaxManagement, LoadListTaxManagementData, LoadTaxFixedDectionData, ProcessingTaxManagement, UpdateTaxFixDeductionData } from '../../../../store/setup/tax-management';
import { TaxFixedDeductionService } from './fix-deduction.service';

@Component({
  selector: 'x365-fm-payrl-fix-deduction',
  templateUrl: './fix-deduction.component.html',
  styleUrls: ['./fix-deduction.component.scss']
})
export class FixDeductionComponent extends BaseFormComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public payroll_profile_id: any;

  @Input() public taxFixedDeductionListData: ITaxFixedDeduction[];
  @Input() public data: ITaxFixedDeductionupdate;

  taxFixedDeductionValue$: Observable<ITaxFixedDeductionupdate>;
  isProcessing$: Observable<boolean>;

  constructor(
    private store: Store<IRootState>,
    public fs: TaxFixedDeductionService,
    public utilService: UtilService) {
    super();
  }

  ngOnInit() {
    this.storeSelects();
  }

  storeSelects() {
    this.isProcessing$ = this.store.pipe(select(isProcessingTaxManagement));
  }

  onSubmit() {
    if (this.fs.valid) {
      this.fs.patch({ payroll_profile_id: this.payroll_profile_id });
      this.store.dispatch(new ProcessingTaxManagement());
      this.store.dispatch(new UpdateTaxFixDeductionData({ data: this.fs.value }));
      this.store.dispatch(new HideFixedDeduction());
      this.store.dispatch(new LoadListTaxManagementData());
    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: this.getErrorMessage(), type: ToastTypes.ERROR }));
    }
    this.data = null;
    this.reset();
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  setDefaultFields(taxFixedDeductionupdate: ITaxFixedDeductionupdate) {
    this.payroll_profile_id = taxFixedDeductionupdate.payroll_profile_id;
    this.fs.patch({ payroll_profile_id: taxFixedDeductionupdate.payroll_profile_id });
    this.fs.patch({ deduction_id: taxFixedDeductionupdate.deduction_id });
  }

  onCancel() {
    this.store.dispatch(new HideFixedDeduction());
    this.data = null;
    this.reset();
  }

  reset() {
    this.fs.f.reset();
    this.fs.patch({
      deduction_id: 0,
    })
  }

  inEditMode() {
    if (this.data) {
      return true;
    } else {
      return false;
    }
  }

}
