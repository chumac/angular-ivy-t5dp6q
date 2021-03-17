import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { UtilService } from '@nutela/core-services';
import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { ShowToast } from '@nutela/store/shared';
import { IRootState } from 'libs/feature-module-ui/platform/reports-ui/src/lib/store/root';
import { ITaxPercentageGrossEditor } from 'libs/models/compensation/payroll/src/lib/interfaces/tax-pecentage-gross-editor.interface';
import { ITaxPercentageGross } from 'libs/models/compensation/payroll/src/lib/interfaces/tax-pecentage-gross.interface';
import { Observable } from 'rxjs';
import { HidePercentGrossEditor, HideTaxGrossPercentView, isProcessingTaxManagement, NotProcessingTaxManagement, ProcessingTaxManagement, SavePecentGrossData } from '../../../../../store/setup/tax-management';
import { PercentGrossViewService } from './percentage-gross-view.service';

@Component({
  selector: 'x365-fm-payrl-percentage-gross-view',
  templateUrl: './percentage-gross-view.component.html',
  styleUrls: ['./percentage-gross-view.component.scss']
})
export class PercentageGrossViewComponent extends BaseFormComponent implements OnInit {

  paygroupId : number;
  payrollProfileId : number;
  isProcessing$: Observable<boolean>;
  
  @Input() public show: boolean;
  @Input() public width: number;  
  @Input() public data: ITaxPercentageGross;
  
  constructor(
    public fs: PercentGrossViewService, 
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
    this.store.dispatch(new HideTaxGrossPercentView());
  }

}
