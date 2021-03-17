import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { BaseFormComponent } from '@nutela/shared/app-global';
import { IVariableDeductionTransaction } from '@nutela/models/compensation/payroll';
import { Observable } from 'rxjs';
import { VariableDeductionTransactionEditorService } from './variable-deduction-transaction-editor.service';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { IRootState } from '../../../../../store/root/root.state';
import { isProcessingVariableDeductionTransaction, ProcessingVariableDeductionTransaction, SaveVariableDeductionTransaction, NotProcessingVariableDeductionTransaction, getVariableDeductionListVariableDeductionTransaction, LoadVariableDeductionListVariableDeductionTransaction, UpdateVariableDeductionTransaction } from '../../../../../store/pay-elements/variable-deduction-transaction';
import { ShowToast } from '@nutela/store/shared';
import { ISelectOption } from '@nutela/models/core-data';
import DataSource from 'devextreme/data/data_source';

@Component({
  selector: 'x365-fm-payrl-variable-deduction-transaction-editor',
  templateUrl: './variable-deduction-transaction-editor.component.html',
  styleUrls: ['./variable-deduction-transaction-editor.component.scss'],
  providers:[VariableDeductionTransactionEditorService]
})

export class VariableDeductionTransactionEditorComponent extends BaseFormComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public activePersonnel: ISelectOption[];
  @Input() public data: IVariableDeductionTransaction;

  // @Input() public selectOptionData: ISelectOptionData;

  @Output() cancelClick = new EventEmitter<any>();

  activePersonnelDataSource: any = null;

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
  variableDeductionList$: Observable<ISelectOption[]>;

  constructor(
    public fs: VariableDeductionTransactionEditorService,
    public utilService: UtilService,
    private store: Store<IRootState>) {
      super();
    }
    ngOnInit() {
      this.storeSelects();
      this.storeDispatches();
    }

    storeSelects() {
      this.isProcessing$ = this.store.pipe(select(isProcessingVariableDeductionTransaction));
      this.variableDeductionList$ = this.store.pipe(select(getVariableDeductionListVariableDeductionTransaction))
    }

  storeDispatches() {
    this.store.dispatch(new LoadVariableDeductionListVariableDeductionTransaction());
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
        this.store.dispatch(new ProcessingVariableDeductionTransaction());
        this.inEditMode() ? this.store.dispatch(new UpdateVariableDeductionTransaction({ data: this.fs.value, recordId: this.data.vdeducttrans_id })): this.store.dispatch(new SaveVariableDeductionTransaction({data: this.fs.value}));
      } else {
      this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError()}));
      }
    }

    getErrorMessage() {
     return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
    }

    onCancel() {
      this.store.dispatch(new NotProcessingVariableDeductionTransaction());
      this.data = null;
      this.reset();
      this.cancelClick.emit();
    }

    reset() {
      this.fs.f.reset();
      this.fs.buildForm();
      this.fs.init(this.data);
    }
  }

