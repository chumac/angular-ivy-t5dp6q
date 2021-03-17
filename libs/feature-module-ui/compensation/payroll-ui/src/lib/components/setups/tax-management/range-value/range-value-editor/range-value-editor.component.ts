import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { UtilService } from '@nutela/core-services';
import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { ShowToast } from '@nutela/store/shared';
import { IRangePercent } from 'libs/models/compensation/payroll/src/lib/interfaces/range-percent.interface';
import { Observable } from 'rxjs';
import { IRootState } from '../../../../../store/root';
import { HideRangeValueEditor, isProcessingTaxManagement, LoadRangeValueData, NotProcessingTaxManagement, ProcessingTaxManagement, SaveRangeValueData, UpdateRangeValueData } from '../../../../../store/setup/tax-management';
import { RangeValueEditorService } from './range-value-editor.component.service';

@Component({
  selector: 'x365-fm-payrl-range-value-editor',
  templateUrl: './range-value-editor.component.html',
  styleUrls: ['./range-value-editor.component.scss']
})
export class RangeValueEditorComponent extends BaseFormComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: IRangePercent;
  @Input() public payrollProfileID: number;

  isProcessing$: Observable<boolean>;

  constructor(
    public fs: RangeValueEditorService,
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

  onSubmit() {
    if (this.fs.valid) {
      this.store.dispatch(new ProcessingTaxManagement());
      if (this.fs.value.is_annual_tax == null) {
        this.fs.patch({ is_annual_tax: false });
      }
      this.fs.patch({ payroll_profile_id: this.payrollProfileID });

      if (this.inEditMode()) {
        const recordId = this.data ? this.data.taxchart_id : 0;
        this.fs.patch({ taxchart_id: recordId });
        this.store.dispatch(new UpdateRangeValueData({ data: <any>this.fs.value }));
      } else {
        this.store.dispatch(new SaveRangeValueData({ data: this.fs.value }));
      }
      
      this.data = null;
      this.reset();

    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: this.getErrorMessage(), type: ToastTypes.ERROR }));
    }
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  onCancel() {
    this.store.dispatch(new NotProcessingTaxManagement());
    this.store.dispatch(new HideRangeValueEditor());
    this.data = null;
    this.reset();
  }

  reset() {
    this.fs.f.reset();
    this.fs.patch({ ignore_rm: false });
    this.fs.init(this.data);
  }

  inEditMode() {
    if (this.data) {
      return true;
    } else {
      return false;
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

}
