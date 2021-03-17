import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { UtilService } from '@nutela/core-services';
import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { ShowToast } from '@nutela/store/shared';
import { ITaxManagementProfile } from 'libs/models/compensation/payroll/src/lib/interfaces/tax-management-profile.interface';
import { ITaxStandard } from 'libs/models/compensation/payroll/src/lib/interfaces/tax-standard.interface';
import { Observable } from 'rxjs';
import { IRootState } from '../../../../../store/root';
import { HideTaxStandardEditor, HideTaxStandardView, isProcessingTaxManagement, LoadTaxStandardData, NotProcessingTaxManagement, ProcessingTaxManagement, SaveTaxStandardData, UpdateTaxStandardData } from '../../../../../store/setup/tax-management';
import { TaxStandardViewService } from './tax-standard-view.service';

@Component({
  selector: 'x365-fm-payrl-tax-standard-view',
  templateUrl: './tax-standard-view.component.html',
  styleUrls: ['./tax-standard-view.component.scss']
})
export class TaxStandardViewComponent extends BaseFormComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: ITaxStandard;
  @Input() public payrollProfileID: number;
  @Input() public standardDefault: ITaxManagementProfile;

  showhideRemainderPercent: boolean = true;
  
  isProcessing$: Observable<boolean>;
  
  constructor(
    public fs: TaxStandardViewService,
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
    this.store.dispatch(new HideTaxStandardView());
  }

  inEditMode(){
    if (this.data) {
      return true;
    } else {
      return false;
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
