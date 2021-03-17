import { Component, OnInit, OnDestroy, Input, EventEmitter, Output, ChangeDetectorRef, SimpleChanges, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { BaseFormComponent } from '@nutela/shared/app-global';

import { Observable } from 'rxjs/internal/Observable';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { ShowToast } from '@nutela/store/shared';
import { IDocumentTags } from '@nutela/models/platform/lookup';
import { DocumentTagsEditorService } from './document-tags-editor.service';
import { ILookupState } from '../../../store';
import { isProcessingDocumentTags, ProcessingDocumentTags, SaveDocumentTags, UpdateDocumentTags, NotProcessingDocumentTags } from '../../../store';


@Component({
  selector: 'x365-fm-plf-hrf-document-tags-editor',
  templateUrl: './document-tags-editor.component.html',
  styleUrls: ['./document-tags-editor.component.scss']
})
export class DocumentTagsEditorComponent extends BaseFormComponent implements OnInit , OnDestroy{
  @Input() public show: boolean;
  @Input() public width: number;


  @Input() public data: IDocumentTags;

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
    public fs: DocumentTagsEditorService,
    public utilService: UtilService,
    private store: Store<ILookupState>,
    private cd: ChangeDetectorRef) {
      super();
    }
    ngOnInit() {
      this.storeSelects();
    }


    storeSelects() {
      this.isProcessing$ = this.store.pipe(select(isProcessingDocumentTags));

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
        const recordId = this.data? this.data.tag_id: 0;
        this.store.dispatch(new ProcessingDocumentTags());
        if(this.inEditMode()===false){
          this.store.dispatch(new SaveDocumentTags({data: this.fs.value}));
        }
        else if(this.inEditMode()===true){
          this.store.dispatch(new UpdateDocumentTags({data: this.fs.value, recordId: recordId}));
        }

      } else {
        this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError()}));
      }
    }

    getErrorMessage() {
      return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
    }

    onCancel() {
      this.store.dispatch(new NotProcessingDocumentTags());
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
