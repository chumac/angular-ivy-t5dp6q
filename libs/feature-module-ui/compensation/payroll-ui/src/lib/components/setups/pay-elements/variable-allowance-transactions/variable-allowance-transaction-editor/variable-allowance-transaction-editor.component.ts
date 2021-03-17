import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { BaseFormComponent } from '@nutela/shared/app-global';
import { IVariableAllowanceTransaction } from '@nutela/models/compensation/payroll';
import { Observable } from 'rxjs';
import { VariableAllowanceTransactionEditorService } from './variable-allowance-transaction-editor.service';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { IRootState } from '../../../../../store/root/root.state';
import { isProcessingVariableAllowanceTransaction, ProcessingVariableAllowanceTransaction, SaveVariableAllowanceTransaction, NotProcessingVariableAllowanceTransaction, getVariableAllowanceListVariableAllowanceTransaction, LoadVariableAllowanceListVariableAllowanceTransaction, UpdateVariableAllowanceTransaction } from '../../../../../store/pay-elements/variable-allowance-transaction';
import { ShowToast } from '@nutela/store/shared';
import { ISelectOption } from '@nutela/models/core-data';
import DataSource from 'devextreme/data/data_source';

@Component({
  selector: 'x365-fm-payrl-variable-allowance-transaction-editor',
  templateUrl: './variable-allowance-transaction-editor.component.html',
  styleUrls: ['./variable-allowance-transaction-editor.component.scss'],
  providers:[VariableAllowanceTransactionEditorService]
})

export class VariableAllowanceTransactionEditorComponent extends BaseFormComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public activePersonnel: ISelectOption[]
  @Input() public data: IVariableAllowanceTransaction;

  activePersonnelDataSource: any = null;

  @Output() cancelClick = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activePersonnel']) {
      this.activePersonnelDataSource = new DataSource({
        paginate: true,
        pageSize: 50,
        store: this.activePersonnel
      });
    }

    if (this.show && this.data) {
      this.fs.init(this.data);
    }

    if(this.show===false){
      this.fs.form=this.fs.buildForm();
    }
  }


  isProcessing$: Observable<boolean>;
  variableAllowanceList$: Observable<ISelectOption[]>;
  transactionUnitList$: Observable<ISelectOption[]>;


  constructor(
    public fs: VariableAllowanceTransactionEditorService,
    public utilService: UtilService,
    private store: Store<IRootState>) {
      super();
    }
    ngOnInit() {
      this.storeSelects();
      this.storeDispatches();
    }

    storeSelects() {
      this.isProcessing$ = this.store.pipe(select(isProcessingVariableAllowanceTransaction));
      this.variableAllowanceList$ = this.store.pipe(select(getVariableAllowanceListVariableAllowanceTransaction))
    }

  storeDispatches() {
    this.store.dispatch(new LoadVariableAllowanceListVariableAllowanceTransaction());
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
        this.store.dispatch(new ProcessingVariableAllowanceTransaction());
        this.inEditMode() ?
          this.store.dispatch(new UpdateVariableAllowanceTransaction({ data: this.fs.value, recordId: this.data.vallowtrans_id})) :
          this.store.dispatch(new SaveVariableAllowanceTransaction({data: this.fs.value}));
      } else {
      this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError()}));
      }
    }

    getErrorMessage() {
     return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
    }

    onCancel() {
      this.store.dispatch(new NotProcessingVariableAllowanceTransaction());
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

