import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { UtilService } from '@nutela/core-services';
import { IReliefsList, IStaturoryRelief, ITaxRuleRelief } from '@nutela/models/compensation/payroll';
import { ISelectOption } from '@nutela/models/core-data';
import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { ShowToast } from '@nutela/store/shared';
import { HideAddEditorRelief, IReliefState, isProcessingRelief, NotProcessingRelief, ProcessingRelief, SaveReliedProfileData, UpdateReliedProfileData } from 'libs/feature-module-ui/compensation/payroll-ui/src/lib/store/setup/regulation/reliefs-and-exemptions';
import { IReliefCurrency } from 'libs/models/compensation/payroll/src/lib/interfaces/relief-currency.interface';
import { IReliefProfile } from 'libs/models/compensation/payroll/src/lib/interfaces/relief-profile.interface';
import { Observable } from 'rxjs';
import { AddReliefService } from './add-relief.service';

@Component({
  selector: 'x365-fm-payrl-add-relief',
  templateUrl: './add-relief.component.html',
  styleUrls: ['./add-relief.component.scss'],
  providers: [AddReliefService]

})
export class AddReliefComponent extends BaseFormComponent implements OnInit {
  isProcessing$: Observable<boolean>;
  cutoffDaySelectOption :any;
  
  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public warningMessage: string = null;
  @Input() public StatutoryGroupSelect: ISelectOption[];
  @Input() public data: IReliefProfile;
  @Input() public payroll_profile_id: any;
  @Input() public statutoryData: IStaturoryRelief[];
  @Input() public reliefTypeData: ITaxRuleRelief[];
  @Input() public reliefCurrencyData: IReliefCurrency[];
  @Input() public isAdd: boolean;
  
  constructor( public fs: AddReliefService, public utilService: UtilService,private store: Store<IReliefState>) { 
    super();
  }

  ngOnInit() {
    this.fs.patch({payroll_profile_id: this.payroll_profile_id});
    this.storeSelects();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.fs.init(this.data);
    }
    if (this.show === false) {
      this.fs.form = this.fs.buildForm();
    }
    this.inEditMode();
  }


  
  storeSelects() {
    this.isProcessing$ = this.store.pipe(select(isProcessingRelief));
  }

  onCancel(){
    this.store.dispatch(new HideAddEditorRelief());

  }
  inEditMode(){
    if (this.data) {
      return true;
    } else {
      return false;
    }
  }

  onEmployeeGroupSelected(event){

  }
  
  onSubmit(){
    if (this.fs.valid) {
      this.fs.patch({payroll_profile_id: this.payroll_profile_id});
      this.store.dispatch(new ProcessingRelief());
      console.log(this.fs.value);
      if (this.inEditMode()) {
        const recordId = this.data? this.data.relief_id: 0; 
        this.fs.patch({ relief_id: recordId });
        this.store.dispatch(new UpdateReliedProfileData({ data: <any>this.fs.value, id: recordId }));
      } else {
        this.store.dispatch(new SaveReliedProfileData({ data: this.fs.value }));
      }
    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: this.getErrorMessage(), type: ToastTypes.ERROR }));
    }
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }
  setDefaultFields(data: IReliefProfile) {
    this.fs.init(this.data);
  }
  reset() {
    this.fs.f.reset();
    this.fs.init(this.data);
  }

}
