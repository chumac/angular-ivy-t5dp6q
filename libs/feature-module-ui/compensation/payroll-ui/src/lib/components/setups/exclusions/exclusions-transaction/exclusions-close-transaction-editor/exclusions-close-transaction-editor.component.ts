import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { toastOptionsError } from '@nutela/core-services';
import { BaseFormComponent } from '@nutela/shared/app-global';
import { ShowToast } from '@nutela/store/shared';
import { UtilService } from 'libs/core-services/src/lib/services';
import { IExclusionClose } from 'libs/models/compensation/payroll/src/lib/interfaces/exclusion-close.inerface';
import { Observable } from 'rxjs';
import { HideCloseEditorExclusion, isProcessingCloseExclusion, NotProcessingExclusionCloseCreate, ProcessingExclusionCloseCreate, ProcessingExclusionTransaction, SaveExclusionCloseData } from '../../../../../store/setup/transaction';
import { ExclusionCloseService } from './exclusion-close.service';

@Component({
  selector: 'x365-fm-payrl-exclusions-close-transaction-editor',
  templateUrl: './exclusions-close-transaction-editor.component.html',
  styleUrls: ['./exclusions-close-transaction-editor.component.scss']
})
export class ExclusionsCloseTransactionEditorComponent extends BaseFormComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: any;
  @Input() public exclusionId: number;
  
  @Output() cancelClick = new EventEmitter<any>();
  
  isProcessing$: Observable<boolean>;
  
  constructor(
    public fs: ExclusionCloseService,
    public utilService: UtilService,
    private store: Store<IExclusionClose>) {
    super();
  }

  onSubmit() {
    if (this.fs.valid) {
      this.store.dispatch(new ProcessingExclusionCloseCreate());
      // return false;
      this.store.dispatch(new SaveExclusionCloseData({ data: <any>this.fs.value,exclusion_id: this.exclusionId }));
    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError() }));
    }
  }

  onCancel() {
    this.store.dispatch(new NotProcessingExclusionCloseCreate());
    this.data = null;
    // this.reset();
    this.cancelClick.emit();
    this.store.dispatch(new NotProcessingExclusionCloseCreate());
    // this.setDefaultFields(null);
    this.store.dispatch(new HideCloseEditorExclusion());
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeSelects() {
     this.isProcessing$ = this.store.pipe(select(isProcessingCloseExclusion));  
  }

  storeDispatches() {

  }

}
