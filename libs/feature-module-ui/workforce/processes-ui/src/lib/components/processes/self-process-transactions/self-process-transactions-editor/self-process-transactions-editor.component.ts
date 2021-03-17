import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output, SimpleChanges, OnDestroy } from '@angular/core';
import { BaseFormComponent, FILE_EXTENSIONS } from '@nutela/shared/app-global';
import { Store, select } from '@ngrx/store';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { SelfProcessTransactionsEditorService } from './self-process-transactions-editor.service';
import { ShowToast } from '@nutela/store/shared';
import { Observable } from 'rxjs/internal/Observable';
import { ISelectOption } from '@nutela/models/core-data';
import { IProcessTransactionMaster, ICustomFormEligibility, IProcessFormArea } from '@nutela/models/workforce/employee-profiles';
import { isProcessingSelfProcessTransaction, ProcessingSelfProcessTransaction, SaveSelfProcessTransaction, AddSelfProcessTransaction, NotProcessingSelfProcessTransaction, getProcessFormArea } from '../../../../store/processes/self-process-transaction';
import { IAppState } from '@nutela/store/app-state';
import { IWorkDefinition } from '@nutela/models/foundation';


@Component({
  selector: 'x365-fm-workforce-self-process-transactions-editor',
  templateUrl: './self-process-transactions-editor.component.html',
  styleUrls: ['./self-process-transactions-editor.component.scss'],
  providers: [SelfProcessTransactionsEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class SelfProcessTransactionsEditorComponent extends BaseFormComponent
implements OnInit, OnDestroy  {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: IProcessTransactionMaster;

  @Output() cancelClick = new EventEmitter<any>();
  isProcessing$: Observable<boolean>;
  workFlowList$: Observable<IWorkDefinition[]>;
  areaList$: Observable<IProcessFormArea[]>;

  ngOnChanges(changes: SimpleChanges): void {

    if(changes['data']) {
      this.fs.init(this.data);
    }
  }

  constructor(public utilService: UtilService, public fs: SelfProcessTransactionsEditorService, private store: Store<IAppState>) { 
    super();
  }

  ngOnInit() {
    this.isProcessing$ = this.store.pipe(select(isProcessingSelfProcessTransaction));
  }

  inEditMode(): boolean {
    if (this.data) {
      return true;
    } else {
      return false;
    }
  }

  onCancel() {
    this.data = null;
    this.reset();
    this.cancelClick.emit();
  }

  onFileSelected($event){}

  onSubmit(){
    if (this.fs.valid) {
      if(this.inEditMode()){
        const recordId = this.data.id;
        this.store.dispatch(new ProcessingSelfProcessTransaction());
        this.store.dispatch(new SaveSelfProcessTransaction({data: <IProcessTransactionMaster>this.fs.value, recordId: recordId, editMode: this.inEditMode() }));
      } else {
        this.store.dispatch(new ProcessingSelfProcessTransaction());
        this.store.dispatch(new AddSelfProcessTransaction({data: <IProcessTransactionMaster>this.fs.value }));
      }

    } else {
     this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError()}));
    }
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  reset() {
    this.fs.f.reset();
    this.fs.init(this.data);
  }

  ngOnDestroy() {
  }

} 
