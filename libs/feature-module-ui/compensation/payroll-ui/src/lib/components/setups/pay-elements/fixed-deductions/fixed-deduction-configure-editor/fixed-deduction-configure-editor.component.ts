import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { IDeductCriteriaConfig } from '@nutela/models/compensation/payroll';
import { ShowToast } from '@nutela/store/shared';
import { ISelectOption } from '@nutela/models/core-data';
import { UtilService } from '@nutela/core-services';
import { FixedDeductionConfigureEditorService } from './fixed-deduction-configure-editor.service';
import { IRootState } from '../../../../../store/root/root.state';
import { isProcessingFixedDeduction, ProcessingFixedDeduction, SaveCriteriaConfigurationFixedDeduction, NotProcessingFixedDeduction, UpdateCriteriaConfigurationFixedDeduction, LoadDataCriteriaConfigurationFixedDeductionSuccess } from '../../../../../store/pay-elements/fixed-deduction';

@Component({
  selector: 'x365-fm-payrl-fixed-deduction-configure-editor',
  templateUrl: './fixed-deduction-configure-editor.component.html',
  styleUrls: ['./fixed-deduction-configure-editor.component.scss'],
  providers:[FixedDeductionConfigureEditorService]
})

export class FixedDeductionConfigureEditorComponent extends BaseFormComponent implements OnInit, OnChanges {

  @Input() public data: IDeductCriteriaConfig;
  @Input() public deductionInfo: any;
  @Input() public show: boolean;
  @Input() public width: number;

  @Output() cancelClick = new EventEmitter<any>();
  @Output() unsubcribeFromParentData = new EventEmitter<any>();

  public isProcessing$: Observable<boolean>;
  public currencyList$: Observable<ISelectOption[]>;
  public payFormulaList$: Observable<ISelectOption[]>;
  public payrollProfileList$: Observable<ISelectOption[]>;
  public startPeriodList$: Observable<ISelectOption[]>;
  public deductFrequencyList$: Observable<ISelectOption[]>;
  public paymentItemList$: Observable<ISelectOption[]>;
  public eligibilityList$: Observable<ISelectOption[]>;
  public payrollTypeList$: Observable<ISelectOption[]>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.show.currentValue) {
      this.fs.init(this.data, this.deductionInfo);
    }

    if (!this.show) {
      this.store.dispatch(new LoadDataCriteriaConfigurationFixedDeductionSuccess(null))
    }
  }

  constructor(
    public fs: FixedDeductionConfigureEditorService,
    public utilService: UtilService,
    private store: Store<IRootState>) {
      super();
    }
    ngOnInit() {
      this.storeSelects();
      this.storeDispatches();
    }

    storeSelects() {
      this.isProcessing$ = this.store.pipe(select(isProcessingFixedDeduction));
    }

    storeDispatches() { }

    inEditMode(): boolean {
      if (this.data) {
        return true;
      } else {
        return false;
      }
    }

    onSubmit() {
      this.unsubcribeFromParentData.emit();
      if (this.fs.valid) {
        this.store.dispatch(new ProcessingFixedDeduction());
        this.inEditMode() ?
          this.store.dispatch(new UpdateCriteriaConfigurationFixedDeduction({ data: this.fs.value, recordId: this.data.fd_criteria_id })) :
          this.store.dispatch(new SaveCriteriaConfigurationFixedDeduction({ data: this.fs.value }));
      } else {
        this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), type: ToastTypes.ERROR}));
      }
    }

    getErrorMessage() {
     return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
    }

    onCancel() {
      this.store.dispatch(new NotProcessingFixedDeduction());
      this.data = null;
      this.deductionInfo = null;
      this.reset();
      this.cancelClick.emit();
    }

    reset() {
      this.fs.f.reset();
      this.fs.rebuildForm()
      this.fs.init(this.data, this.deductionInfo);
    }
  }

