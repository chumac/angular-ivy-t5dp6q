import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { UtilService } from '@nutela/core-services';
import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { ShowToast } from '@nutela/store/shared';
import { IRootState } from 'libs/feature-module-ui/platform/reports-ui/src/lib/store/root';
import { ITaxPercentageGrossEditor } from 'libs/models/compensation/payroll/src/lib/interfaces/tax-pecentage-gross-editor.interface';
import { Observable } from 'rxjs';
import { HidePercentGrossEditor, isProcessingTaxManagement, NotProcessingTaxManagement, ProcessingTaxManagement, SavePecentGrossData } from '../../../../../store/setup/tax-management';
import { PercentGrossEditorService } from './percentage-gross-editor.service';

@Component({
  selector: 'x365-fm-payrl-percentage-gross-editor',
  templateUrl: './percentage-gross-editor.component.html',
  styleUrls: ['./percentage-gross-editor.component.scss']
})
export class PercentageGrossEditorComponent extends BaseFormComponent implements OnInit {

  paygroupId : number;
  payrollProfileId : number;
  isProcessing$: Observable<boolean>;
  
  @Input() public show: boolean;
  @Input() public width: number;  
  @Input() public data: ITaxPercentageGrossEditor;
  
  constructor(
    public fs: PercentGrossEditorService, 
    public utilService: UtilService,
    private store: Store<IRootState> ) 
    { super(); }

  ngOnInit() {
    this.storeSelects();
  }

  storeSelects() {
    this.isProcessing$ = this.store.pipe(select(isProcessingTaxManagement));
  }

  setDefaultFields(paygroup_id: any,taxpercentongross: any, payrollProfileID: any) {
    this.paygroupId = paygroup_id;
    this.payrollProfileId = payrollProfileID;
    this.fs.patch({taxpercentongross: taxpercentongross});
    this.fs.init(this.fs.value);
  }

  inEditMode(){
    if (this.data) {
      return true;
    } else {
      return false;
    }
  }

  onSubmit(){
    if (this.fs.valid) {
      this.store.dispatch(new ProcessingTaxManagement());
      this.store.dispatch(new SavePecentGrossData({data: this.fs.value, paygroup_id: this.paygroupId, payrollProfileID : this.payrollProfileId  }));
    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: this.getErrorMessage(), type: ToastTypes.ERROR }));
    }
  }
  onCancel(){
    this.store.dispatch(new NotProcessingTaxManagement());
    this.store.dispatch(new HidePercentGrossEditor());
    this.data = null;
    this.reset();
  }

  reset() {
    this.fs.f.reset();
    this.fs.patch({
      taxpercentongross: 0,
    })
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

}
