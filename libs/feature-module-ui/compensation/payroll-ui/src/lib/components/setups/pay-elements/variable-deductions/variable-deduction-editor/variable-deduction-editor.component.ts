import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { BaseFormComponent } from '@nutela/shared/app-global';
import { IVariableDeduction } from '@nutela/models/compensation/payroll';
import { Observable } from 'rxjs';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { VariableDeductionEditorService } from './variable-deduction-editor.service';
import { IRootState } from '../../../../../store/root/root.state';
import { Store, select } from '@ngrx/store';
import { isProcessingVariableDeduction, ProcessingVariableDeduction, SaveVariableDeduction, NotProcessingVariableDeduction, LoadPayrollProfileListVariableDeduction, LoadTransactionUnitListVariableDeduction, LoadGroupListVariableDeduction, getGroupNameListVariableDeduction, getTransactionUnitListVariableDeduction, getPayrollProfileListVariableDeduction, UpdateVariableDeduction } from '../../../../../store/pay-elements/variable-deduction';
import { ShowToast } from '@nutela/store/shared';
import { ISelectOption } from '@nutela/models/core-data';

@Component({
  selector: 'x365-fm-payrl-variable-deduction-editor',
  templateUrl: './variable-deduction-editor.component.html',
  styleUrls: ['./variable-deduction-editor.component.scss'],
  providers:[VariableDeductionEditorService]
})

export class VariableDeductionEditorComponent extends BaseFormComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IVariableDeduction;

  // @Input() public selectOptionData: ISelectOptionData;

  @Output() cancelClick = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges): void {
    if(this.show && this.data) {
      this.fs.init(this.data);
    }
    if(this.show===false){
      this.fs.form=this.fs.buildForm();
    }
  }


  isProcessing$: Observable<boolean>;
  groupList$: Observable<ISelectOption[]>;
  transactionList$: Observable<ISelectOption[]>;
  payrollProfileList$: Observable<ISelectOption[]>;

  constructor(
    public fs: VariableDeductionEditorService,
    public utilService: UtilService,
    private store: Store<IRootState>) {
      super();
    }
    ngOnInit() {
      this.storeSelects();
      this.storeDispatches();
    }

    storeSelects() {
      this.isProcessing$ = this.store.pipe(select(isProcessingVariableDeduction));
      this.payrollProfileList$ = this.store.pipe(select(getPayrollProfileListVariableDeduction));
      this.transactionList$ = this.store.pipe(select(getTransactionUnitListVariableDeduction));
      this.groupList$ = this.store.pipe(select(getGroupNameListVariableDeduction));
    }

  storeDispatches() {
    this.store.dispatch(new LoadPayrollProfileListVariableDeduction());
    this.store.dispatch(new LoadGroupListVariableDeduction());
    this.store.dispatch(new LoadTransactionUnitListVariableDeduction());
  }

    inEditMode(): boolean {
      if (this.data) {
        return true;
      } else {
        return false;
      }
    }

    onSubmit() {
      if (this.fs.valid) {
        this.store.dispatch(new ProcessingVariableDeduction());
        this.inEditMode() ? this.store.dispatch(new UpdateVariableDeduction({ data: this.fs.value, recordId: this.data.vardeduction_id })) : this.store.dispatch(new SaveVariableDeduction({data: this.fs.value}));
      } else {
      this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError()}));
      }
    }

    getErrorMessage() {
     return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
    }

    onCancel() {
      this.store.dispatch(new NotProcessingVariableDeduction());
      this.data = null;
      this.reset();
      this.cancelClick.emit();
    }

    reset() {
      this.fs.f.reset();
      this.fs.rebuildForm();
      this.fs.init(this.data);
    }
  }

