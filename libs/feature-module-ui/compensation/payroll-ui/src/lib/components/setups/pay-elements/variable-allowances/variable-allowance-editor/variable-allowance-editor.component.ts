import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { IVariableAllowance } from '@nutela/models/compensation/payroll';
import { Observable } from 'rxjs';
import { VariableAllowanceEditorService } from './variable-allowance-editor.service';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { IRootState } from '../../../../../store/root/root.state';
import { isProcessingVariableAllowance, ProcessingVariableAllowance, SaveVariableAllowance, NotProcessingVariableAllowance, LoadPayrollProfileListVariableAllowance, LoadTransactionUnitListVariableAllowance, LoadGroupListVariableAllowance, getGroupNameListVariableAllowance, getTransactionUnitListVariableAllowance, getPayrollProfileListVariableAllowance, UpdateVariableAllowance } from '../../../../../store/pay-elements/variable-allowance';
import { ShowToast } from '@nutela/store/shared';
import { ISelectOption } from '@nutela/models/core-data';

@Component({
  selector: 'x365-fm-payrl-variable-allowance-editor',
  templateUrl: './variable-allowance-editor.component.html',
  styleUrls: ['./variable-allowance-editor.component.scss'],
  providers:[VariableAllowanceEditorService]
})

export class VariableAllowanceEditorComponent extends BaseFormComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IVariableAllowance;

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
    public fs: VariableAllowanceEditorService,
    public utilService: UtilService,
    private store: Store<IRootState>) {
      super();
    }
    ngOnInit() {
      this.storeSelects();
      this.storeDispatches()
    }

    storeSelects() {
      this.isProcessing$ = this.store.pipe(select(isProcessingVariableAllowance));
      this.payrollProfileList$ = this.store.pipe(select(getPayrollProfileListVariableAllowance));
      this.transactionList$ = this.store.pipe(select(getTransactionUnitListVariableAllowance));
      this.groupList$ = this.store.pipe(select(getGroupNameListVariableAllowance));
    }

  storeDispatches() {
    this.store.dispatch(new LoadPayrollProfileListVariableAllowance());
    this.store.dispatch(new LoadGroupListVariableAllowance());
    this.store.dispatch(new LoadTransactionUnitListVariableAllowance());
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
        this.store.dispatch(new ProcessingVariableAllowance());
        this.inEditMode() ? this.store.dispatch(new UpdateVariableAllowance({ data: this.fs.value, recordId: this.data.varallowance_id })): this.store.dispatch(new SaveVariableAllowance({data: this.fs.value}));
      } else {
      this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), type: ToastTypes.ERROR}));
      }
    }

    getErrorMessage() {
     return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
    }

    onCancel() {
      this.store.dispatch(new NotProcessingVariableAllowance());
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
