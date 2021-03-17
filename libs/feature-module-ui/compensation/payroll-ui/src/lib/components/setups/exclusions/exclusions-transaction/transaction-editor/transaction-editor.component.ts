import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { toastOptionsError, UtilService } from '@nutela/core-services';
import { IPayrollProfile } from '@nutela/models/compensation/payment';
import { IExclusionActiveEmployee, IExclusionReason, IExclusionTransaction, IExclusionTransactionCreate, IExclusionType } from '@nutela/models/compensation/payroll';
import { ISelectOption } from '@nutela/models/core-data';
import { BaseFormComponent } from '@nutela/shared/app-global';
import { DialogService, FilePickerComponent } from '@nutela/shared/ui';
import { ShowToast } from '@nutela/store/shared';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { isProcessingExclusion, ITransactionState, NotProcessingExclusionTransaction, ProcessingExclusionTransaction, SaveTransactionData, UpdateTransactionData } from '../../../../../store/setup/transaction';
import { TransactionEditorService } from './transaction-editor.service';

@Component({
  selector: 'x365-fm-payrl-transaction-editor',
  templateUrl: './transaction-editor.component.html',
  styleUrls: ['./transaction-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionEditorComponent extends BaseFormComponent implements OnInit, OnDestroy {

  activePersonnelDataSource: any = null;
  selectedPayrollGroup: any = null;
  showhidepercentage: boolean = true;
  showhideEndDate: boolean = true;

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public warningMessage: string = null;

  @Input() public activePersonnel: ISelectOption[];
  @Input() public payrollGroupSelect: ISelectOption[];
  @Input() public paymentGroupSelect: ISelectOption[];
  @Input() public paymentGradeSelect: ISelectOption[];

  @Input() public exclusionActiveEmployeeData: IExclusionActiveEmployee[];
  @Input() public exclusionReasonData: IExclusionReason[];
  @Input() public exclusionScopeData: IExclusionType[];
  @Input() public data: IExclusionTransaction;

  @Output() cancelClick = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.fs.init(this.data);
    }

    if (this.show === false) {
      this.reset();
    }
  }

  @ViewChild('filePicker') filePicker: FilePickerComponent;

  isProcessing$: Observable<boolean>;

  constructor(
    public fs: TransactionEditorService,
    public utilService: UtilService,
    private store: Store<ITransactionState>,
    private cd: ChangeDetectorRef, private dialogService: DialogService
  ) {
    super();
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeSelects() {
    this.isProcessing$ = this.store.pipe(select(isProcessingExclusion));
  }

  storeDispatches() {

  }

  inEditMode(): boolean {
    if (this.data) {
      return true;
    } else {
      return false;
    }
  }

  onPayrollGroupSelected(event) {
    this.selectedPayrollGroup = event.value;
  }

  onSubmit() {
    if(this.fs.value.exclude_by_percent == null){
      this.fs.patch({ exclude_by_percent: false })
    }
    if(this.fs.value.is_temp_exclusion == null){
      this.fs.patch({ is_temp_exclusion: false })
    }    
    if(this.fs.value.is_temp_exclusion == false){
      this.fs.patch({ end_date: null })
    }
    if (this.fs.valid) {
      const recordId = this.data ? this.data.exclusion_id : 0;
      if (recordId == 0) {
        this.store.dispatch(new ProcessingExclusionTransaction());
        this.store.dispatch(new SaveTransactionData({ data: <any>this.fs.value }));
      } else {
        this.store.dispatch(new ProcessingExclusionTransaction());
        this.fs.patch({ exclusion_id: recordId })
        this.store.dispatch(new UpdateTransactionData({ data: <any>this.fs.value, id: recordId }));
      }
    }
    else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError() }));
    }
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  onCancel() {
    this.store.dispatch(new NotProcessingExclusionTransaction());
    this.data = null;
    this.reset();
    this.cancelClick.emit();
    this.setDefaultFields(null);    
    this.fs.patch({ exclude_by_percent: true });
  }

  setDefaultFields(data: IExclusionTransaction) {
    this.fs.init(this.data);
  }

  reset() {
    this.fs.f.reset();
    this.fs.init(this.data);
  }

  ngOnDestroy() {
  }

  onPercentChange(exclude_by_percent) {
    if (exclude_by_percent) {
      this.fs.patch({ amount_value: null });
    }
    else {
      this.fs.patch({ percent_value: null });
    }
  }

  onTempExclusionChange(tempExclusion) {
    if (!tempExclusion) {
      this.fs.patch({ end_date: null });
    }
  }

}
