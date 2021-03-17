import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { UtilService } from '@nutela/core-services';
import { IUseRuleRelief } from '@nutela/models/compensation/payroll';
import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { ShowToast } from '@nutela/store/shared';
import { HideConfigEditorRelief, IReliefState, isProcessingRelief, LoadReliefProfileData, LoadStatutoeyReliefData, ProcessingRelief, SaveReliefGlobalData } from 'libs/feature-module-ui/compensation/payroll-ui/src/lib/store/setup/regulation/reliefs-and-exemptions';
import { IReliefCurrency } from 'libs/models/compensation/payroll/src/lib/interfaces/relief-currency.interface';
import { IReliefProfile } from 'libs/models/compensation/payroll/src/lib/interfaces/relief-profile.interface';
import { Observable } from 'rxjs';
import { ConfigReliefService } from './configure-relief.service';


@Component({
  selector: 'x365-fm-payrl-configure-relief',
  templateUrl: './configure-relief.component.html',
  styleUrls: ['./configure-relief.component.scss']
})
export class ConfigureReliefComponent extends BaseFormComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: any;
  @Input() public payroll_profile_id: any;
  @Input() public relief_id: any;
  @Input() public useRuleData: IUseRuleRelief[];
  @Input() public reliefCurrencyData: IReliefCurrency[];
  @Input() public profileId: any;


  isProcessing$: Observable<boolean>;
  public directValue : boolean = true;
  public grossPercentage : boolean = false;
  title : any;
  
  constructor(private store: Store<IReliefState>,public fs: ConfigReliefService,public utilService: UtilService) { 

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
      this.store.dispatch(new SaveReliefGlobalData({ data: this.fs.value }));
      this.store.dispatch(new HideConfigEditorRelief());
      this.store.dispatch(new LoadReliefProfileData({ payroll_profileID: this.payroll_profile_id }));

    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: this.getErrorMessage(), type: ToastTypes.ERROR }));
    }
  }


  onCancel(){
    this.store.dispatch(new HideConfigEditorRelief());
    this.data = null;
    this.reset();
   // this.setDefaultFields(null);
  }

  reset() {
    this.fs.f.reset();
    this.fs.patch({
      use_rule: 0,
      direct_value: null,
      gross_percentage: null,
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
onChangeUseRule(value){
  if(value.itemData.id == 0){
    this.directValue = true;
    this.grossPercentage = false;
  }
  if(value.itemData.id == 1){
    this.directValue = false;
    this.grossPercentage = true;
  }
  if(value.itemData.id == 2 || value.itemData.id == 3){
    this.directValue = true;
    this.grossPercentage = true;
  }
}
  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  setDefaultFields(data: IReliefProfile) {
    if(data.use_rule == 0){
      this.directValue = true;
      this.grossPercentage = false;
    }
    if(data.use_rule == 1){
      this.directValue = false;
      this.grossPercentage = true;
    }
    if(data.use_rule == 2 || data.use_rule == 3){
      this.directValue = true;
      this.grossPercentage = true;
    }
    if(data.direct_value == null || data.gross_percentage  == null){
        this.title = "Add Relief Global"
    }else{
      this.title = "Edit Relief Global"
    }
    this.fs.patch({
      use_rule: data.use_rule,
      direct_value: data.direct_value,
      gross_percentage: data.gross_percentage,
      relief_currency: data.relief_currency,
    })
  }
  
  
}
