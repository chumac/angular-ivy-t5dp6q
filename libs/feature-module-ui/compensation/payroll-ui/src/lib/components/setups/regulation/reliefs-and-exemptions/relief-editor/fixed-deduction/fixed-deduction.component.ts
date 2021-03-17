import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { UtilService } from '@nutela/core-services';
import { IUseRuleRelief } from '@nutela/models/compensation/payroll';
import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { ShowToast } from '@nutela/store/shared';
import { HideConfigEditorRelief, HideFixedDeductionRelief, IReliefState, isProcessingRelief, LoadReliefProfileData, LoadStatutoeyReliefData, ProcessingRelief, SaveReliefGlobalData, UpdateFixedDeductionData } from 'libs/feature-module-ui/compensation/payroll-ui/src/lib/store/setup/regulation/reliefs-and-exemptions';
import { IReliefCurrency } from 'libs/models/compensation/payroll/src/lib/interfaces/relief-currency.interface';
import { IFixedDeductionReliefUpdate } from 'libs/models/compensation/payroll/src/lib/interfaces/relief-fixedDeduction-update.interface';
import { IFixedDeductionRelief } from 'libs/models/compensation/payroll/src/lib/interfaces/relief-fixedDeduction.interface';
import { IReliefProfile } from 'libs/models/compensation/payroll/src/lib/interfaces/relief-profile.interface';
import { Observable } from 'rxjs';
import { FixedDeductionService } from './fixed-deduction.service';


@Component({
  selector: 'x365-fm-payrl-fixed-deduction',
  templateUrl: './fixed-deduction.component.html',
  styleUrls: ['./fixed-deduction.component.scss']
})
export class FixedDeductionComponent extends BaseFormComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: any;
  @Input() public payroll_profile_id: any;
  @Input() public relief_id: any;
  @Input() public fixedDeductionData: IFixedDeductionRelief[];
  @Input() public reliefCurrencyData: IReliefCurrency[];
  @Input() public profileId: any;


  isProcessing$: Observable<boolean>;
  public directValue : boolean = true;
  public grossPercentage : boolean = false;
  title : any;
  
  constructor(private store: Store<IReliefState>,public fs: FixedDeductionService,public utilService: UtilService) { 

    super();
  }

  ngOnInit() {
    console.log(this.profileId);
    console.log(this.payroll_profile_id);
    this.storeSelects();
  }
  
  storeSelects() {
    this.isProcessing$ = this.store.pipe(select(isProcessingRelief));
  }

  onSubmit(){
    if (this.fs.valid) {
      this.fs.patch({relief_id: this.relief_id});
      this.store.dispatch(new ProcessingRelief());
      this.store.dispatch(new UpdateFixedDeductionData({ data: this.fs.value, payroll_profileID: this.payroll_profile_id}));
      this.store.dispatch(new HideFixedDeductionRelief());
      this.store.dispatch(new LoadReliefProfileData({ payroll_profileID: this.payroll_profile_id }));
    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: this.getErrorMessage(), type: ToastTypes.ERROR }));
    }
  }


  onCancel(){
    this.store.dispatch(new HideFixedDeductionRelief());
    this.data = null;
    this.reset();
  }

  reset() {
    this.fs.f.reset();
    this.fs.patch({
      fixeddeduction_id: 0,
      relief_currency: null,
    })
  }
  
  inEditMode(){
    if (this.data) {
      return true;
    } else {
      return false;
    }
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  setDefaultFields(data: any) {
    this.fs.patch({
      fixeddeduction_id: data.fixeddeduction_id,
      relief_currency: data.relief_currency,
    })
  }
  
  
}
