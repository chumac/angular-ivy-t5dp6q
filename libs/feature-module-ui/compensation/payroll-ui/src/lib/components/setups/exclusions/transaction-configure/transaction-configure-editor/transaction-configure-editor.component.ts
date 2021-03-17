import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { toastOptionsError, UtilService } from '@nutela/core-services';
import { IExclusionItemType, IExclusionType } from '@nutela/models/compensation/payroll';
import { BaseFormComponent } from '@nutela/shared/app-global';
import { DialogService } from '@nutela/shared/ui';
import { ShowToast } from '@nutela/store/shared';
import { getExclusionItemTypeData, HideEditorConfigureTransactionCreate, isProcessingExclusion, LoadCanRunDataSuccess, LoadExclusionItemTypeData, NotProcessingConfigureCreate, NotProcessingExclusionTransaction, ProcessingConfigureCreate, ProcessingExclusionTransaction, SaveConfigureData, UpdateConfigureData } from 'libs/feature-module-ui/compensation/payroll-ui/src/lib/store/setup/transaction';
import { IConfigureTransactionCreate } from 'libs/models/compensation/payroll/src/lib/interfaces/configure-transaction-create.interface';
import { IConfigureTransaction } from 'libs/models/compensation/payroll/src/lib/interfaces/configure-transaction.interface';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ConfigureCreateEditorService } from './configure-create.service';

@Component({
  selector: 'x365-fm-payrl-transaction-configure-editor',
  templateUrl: './transaction-configure-editor.component.html',
  styleUrls: ['./transaction-configure-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class TransactionConfigureEditorComponent extends BaseFormComponent implements OnInit {

  showhidepercentage: boolean = true;

  @Input() public showCreate: boolean;
  @Input() public width: number;
  @Input() public warningMessage: string = null;
  @Input() public data: IConfigureTransaction;
  @Input() public exclusionId: number;
  @Input() public exclusionTypeData: IExclusionType[];
  showCreateConfigureEditor$: Observable<boolean>;
  exclusionItemTypeData$: Observable<IExclusionItemType[]>;

  @Output() cancelClick = new EventEmitter<any>();
  isProcessing$: Observable<boolean>;

  constructor(
    public fs: ConfigureCreateEditorService,
    public utilService: UtilService,
    private store: Store<IConfigureTransactionCreate>,
    private dialogService: DialogService
  ) {
    super();
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeSelects() {
    this.isProcessing$ = this.store.pipe(select(isProcessingExclusion));
    this.exclusionItemTypeData$ = this.store.pipe(select(getExclusionItemTypeData));
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
      this.fs.patch({ exclusion_id: this.exclusionId });
      if(this.fs.value != null && (this.fs.value.exclusion_det_id != null || this.fs.value.exclusion_det_id > 0)){
        this.store.dispatch(new ProcessingExclusionTransaction());
        this.store.dispatch(new UpdateConfigureData({ data: <any>this.fs.value , exclusion_det_id:this.fs.value.exclusion_det_id }));  
      }
      else{
        this.store.dispatch(new ProcessingExclusionTransaction());
        this.store.dispatch(new SaveConfigureData({ data: <any>this.fs.value }));
      }
      this.store.dispatch(new NotProcessingConfigureCreate());
      this.data = null;
      this.reset();
      this.setDefaultFields(null); 
    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError() }));
    }
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  onCancel() {
    this.store.dispatch(new NotProcessingExclusionTransaction());
    this.store.dispatch(new HideEditorConfigureTransactionCreate());
    this.data = null;
    this.reset();
    this.cancelClick.emit();
    this.setDefaultFields(null);
    this.fs.patch({ exclude_by_percent: true });
  }

  setDefaultFields(data: IConfigureTransaction) {
    this.fs.init(this.data);
  }

  reset() {
    this.fs.f.reset();
    this.fs.patch({exclude_by_percent : true });
    this.fs.init(this.data);
    this.store.dispatch(new LoadCanRunDataSuccess(false))
  }

  storeDispatches() {
  }

  onChange(exclusionTypeData) {
    this.store.dispatch(new LoadExclusionItemTypeData(exclusionTypeData.itemIndex))
  }

  onPercentChange(exclude_by_percent) {
    if(exclude_by_percent){
      this.fs.patch({ amount_value: null });
    }
    else{
      this.fs.patch({ percent_value: null });
    }
  }

}
