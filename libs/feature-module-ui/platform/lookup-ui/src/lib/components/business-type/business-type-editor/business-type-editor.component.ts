import { Component, OnInit, OnDestroy, Input, EventEmitter, Output, ChangeDetectorRef, SimpleChanges, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { BaseFormComponent } from '@nutela/shared/app-global';

import { Observable } from 'rxjs/internal/Observable';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { ShowToast } from '@nutela/store/shared';
import { BusinessTypeEditorService } from './business-type-editor.service';
import { ILookupState } from '../../../store';
import { isProcessingBusinessType, NotProcessingBusinessType, ProcessingBusinessType, SaveBusinessType, UpdateBusinessType } from '../../../store';
import { IBusinessType } from '@nutela/models/platform/lookup';


@Component({
  selector: 'x365-fm-plf-hrf-business-type-editor',
  templateUrl: './business-type-editor.component.html',
  styleUrls: ['./business-type-editor.component.scss']
})
export class BusinessTypeEditorComponent extends BaseFormComponent  implements OnInit, OnDestroy {
  @Input() public show: boolean;
  @Input() public width: number;


  @Input() public data: IBusinessType;

  @Output() cancelClick = new EventEmitter<any>();


  ngOnChanges(changes: SimpleChanges): void {
    if(changes['data']) {
      this.fs.init(this.data);
    }
    if(this.show===false){
      this.fs.form=this.fs.buildForm();
    }
  }

  isProcessing$: Observable<boolean>;


  constructor(
    public fs: BusinessTypeEditorService,
    public utilService: UtilService,
    private store: Store<ILookupState>,
    private cd: ChangeDetectorRef) {
      super();
    }
    ngOnInit() {
      this.storeSelects();
    }


    storeSelects() {
      this.isProcessing$ = this.store.pipe(select(isProcessingBusinessType));

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
        console.log('data',this.fs.value)
        const recordId = this.data? this.data.biztype_id: 0;
        this.store.dispatch(new ProcessingBusinessType());
        if(this.inEditMode()===false){
          this.store.dispatch(new SaveBusinessType({data: this.fs.value}));
        }
        else if(this.inEditMode()===true){
          this.store.dispatch(new UpdateBusinessType({data: this.fs.value, recordId: recordId}));
        }

      } else {
        this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError()}));
      }
    }

    getErrorMessage() {
      return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
    }

    onCancel() {
      this.store.dispatch(new NotProcessingBusinessType());
      this.data = null;
      this.reset();
      this.cancelClick.emit();
    }

    reset() {
      this.fs.f.reset();
      this.fs.init(this.data);
    }

    ngOnDestroy() {
    }
}
