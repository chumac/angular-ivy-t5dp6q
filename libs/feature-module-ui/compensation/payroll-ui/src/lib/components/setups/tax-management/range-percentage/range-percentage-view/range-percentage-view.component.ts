import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { UtilService } from '@nutela/core-services';
import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { ShowToast } from '@nutela/store/shared';
import { IRangePercent } from 'libs/models/compensation/payroll/src/lib/interfaces/range-percent.interface';

import { Observable } from 'rxjs';
import { IRootState } from '../../../../../store/root';
import { HideRangePercentEditor, HideTaxRangePercentView, isProcessingTaxManagement, LoadRangePercentData, NotProcessingTaxManagement, ProcessingTaxManagement, SaveRangePercentdData, UpdateRangePercentData, UpdateTaxStandardData } from '../../../../../store/setup/tax-management';
import { RangePercentViewService } from './range-percentage-view.service';

@Component({
  selector: 'x365-fm-payrl-range-percentage-view',
  templateUrl: './range-percentage-view.component.html',
  styleUrls: ['./range-percentage-view.component.scss']
})
export class RangePercentageViewComponent extends BaseFormComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: IRangePercent;
  @Input() public payrollProfileID: number;

  isProcessing$: Observable<boolean>;

  constructor(
    public fs: RangePercentViewService,
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
    this.store.dispatch(new HideTaxRangePercentView());
  }

  inEditMode() {
    if (this.data) {
      return true;
    } else {
      return false;
    }
  }

}
