import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { UtilService } from '@nutela/core-services';
import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { ShowToast } from '@nutela/store/shared';
import { IRangePercent } from 'libs/models/compensation/payroll/src/lib/interfaces/range-percent.interface';
import { Observable } from 'rxjs';
import { IRootState } from '../../../../../store/root';
import { HideRangeValueEditor, HideTaxRangeValueView, isProcessingTaxManagement, LoadRangeValueData, NotProcessingTaxManagement, ProcessingTaxManagement, SaveRangeValueData, UpdateRangeValueData } from '../../../../../store/setup/tax-management';
import { RangeValueViewService } from './range-value-view.service';

@Component({
  selector: 'x365-fm-payrl-range-value-view',
  templateUrl: './range-value-view.component.html',
  styleUrls: ['./range-value-view.component.scss']
})
export class RangeValueViewComponent extends BaseFormComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: IRangePercent;
  @Input() public payrollProfileID: number;

  isProcessing$: Observable<boolean>;

  constructor(
    public fs: RangeValueViewService,
    public utilService: UtilService,
    private store: Store<IRootState>
  ) {
    super();
  }

  ngOnInit() {
    this.storeSelects();
  }

  storeSelects() {
    this.isProcessing$ = this.store.pipe(select(isProcessingTaxManagement));
  }

  onSubmit(){
    this.store.dispatch(new HideTaxRangeValueView());
  }

  inEditMode() {
    if (this.data) {
      return true;
    } else {
      return false;
    }
  }

}
