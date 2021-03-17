import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { UtilService } from '@nutela/core-services';
import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { ShowToast } from '@nutela/store/shared';
import { ITaxManagementProfile } from 'libs/models/compensation/payroll/src/lib/interfaces/tax-management-profile.interface';
import { ITaxStandard } from 'libs/models/compensation/payroll/src/lib/interfaces/tax-standard.interface';
import { Observable } from 'rxjs';
import { IRootState } from '../../../../../store/root';
import { HideTaxStandardEditor, isProcessingTaxManagement, LoadTaxStandardData, NotProcessingTaxManagement, ProcessingTaxManagement, SaveTaxStandardData, UpdateTaxStandardData } from '../../../../../store/setup/tax-management';
import { TaxStandardEditorService } from './tax-standard-editor.service';

@Component({
  selector: 'x365-fm-payrl-tax-standard-editor',
  templateUrl: './tax-standard-editor.component.html',
  styleUrls: ['./tax-standard-editor.component.scss']
})
export class TaxStandardEditorComponent extends BaseFormComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: ITaxStandard;
  @Input() public payrollProfileID: number;
  @Input() public standardDefault: ITaxManagementProfile;

  showhideRemainderPercent: boolean = true;
  
  isProcessing$: Observable<boolean>;
  
  constructor(
    public fs: TaxStandardEditorService,
    public utilService: UtilService,
    private store: Store<IRootState>
    ) { super();}

  ngOnInit() {
    this.storeSelects();
  }

  storeSelects() {
    this.isProcessing$ = this.store.pipe(select(isProcessingTaxManagement));
  }

  onSubmit(){
    if (this.fs.valid) {
      this.assignDefaultValues();
      this.store.dispatch(new ProcessingTaxManagement());
      if(this.fs.value.percentage_of_rm == null){
        this.fs.patch({ percentage_of_rm: 0 });
      }
      if(this.fs.value.cumulative_taxable_value == null){
        this.fs.patch({ cumulative_taxable_value: 0 });
      }

      this.fs.patch({ percantage_of_tv: this.fs.value.percentage_of_tv });
      if (this.inEditMode()) {
        const recordId = this.data? this.data.taxdetail_id: 0; 
        this.fs.patch({ taxdetail_id: recordId });
        this.store.dispatch(new UpdateTaxStandardData({ data: <any>this.fs.value, payrollProfileID: this.payrollProfileID, taxdetail_id: this.data.taxdetail_id }));
      } else {        
        this.store.dispatch(new SaveTaxStandardData({ data: this.fs.value,payrollProfileID: this.payrollProfileID }));
      }
    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: this.getErrorMessage(), type: ToastTypes.ERROR }));
    }    
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  onCancel(){
    this.store.dispatch(new NotProcessingTaxManagement());
    this.store.dispatch(new HideTaxStandardEditor());
    this.data = null;
    this.reset();
  }

  reset() {
    this.fs.f.reset();
    this.fs.patch({ignore_rm : false });
    this.fs.init(this.data);
  }

  inEditMode(){
    if (this.data) {
      return true;
    } else {
      return false;
    }
  }

  onIgnoreReminder(ignoreReminder) {
    if (ignoreReminder) {
      this.fs.patch({ percentage_of_rm: 0 });
    }
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
  cumulativeValue : number = 0;
  valueChange(){
    if(this.fs.value != null && this.fs.value.tax_value != null && this.fs.value.percentage_of_tv){
      this.fs.patch({cumulative : (this.fs.value.tax_value * this.fs.value.percentage_of_tv)/100 });
      if(this.data == null){
        this.cumulativeValue = (this.fs.value.tax_value * this.fs.value.percentage_of_tv)/100;
      }
      else{        
      this.data.cumulative = (this.fs.value.tax_value * this.fs.value.percentage_of_tv)/100;
      }
    }    
  }

  assignDefaultValues(){
    this.fs.patch({payroll_profile_id: this.payrollProfileID});
    this.fs.patch({description: this.standardDefault.description});
    this.fs.patch({tax_remainder_values: this.standardDefault.tax_remainder_values});
    this.fs.patch({percentage: this.standardDefault.percentage});
    this.fs.patch({tax_id: this.standardDefault.tax_id});
  }

}
