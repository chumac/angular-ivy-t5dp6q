import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { IQualificationCategory } from '@nutela/models/platform/lookup';
import { BaseFormComponent } from '@nutela/shared/app-global';
import { Observable } from 'rxjs';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { ILookupState } from '../../../store';
import { QualificationEditorService } from './qualification-categories-editor.service';
import { ShowToast } from '@nutela/store/shared';
import { ProcessingQualificationCategory, isProcessingQualificationCategory, LoadCategory, getQualificationCategory, SaveQualificationCategory, UpdateQualificationCategory, NotProcessingQualificationCategory } from '../../../store';

@Component({
  selector: 'x365-fm-plf-hrf-qualification-categories-editor',
  templateUrl: './qualification-categories-editor.component.html',
  styleUrls: ['./qualification-categories-editor.component.scss']
})
export class QualificationCategoriesEditorComponent extends BaseFormComponent implements OnInit {

    @Input() public show: boolean;
    @Input() public width: number;


    @Input() public data: IQualificationCategory;

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
      public fs:  QualificationEditorService,
      public utilService: UtilService,
      private store: Store<ILookupState>,
      private cd: ChangeDetectorRef) {
        super();
      }
      ngOnInit() {
        this.storeSelects();
        this.store.dispatch(new LoadCategory());
      }


      storeSelects() {
        this.isProcessing$ = this.store.pipe(select(isProcessingQualificationCategory));
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
          const recordId = this.data? this.data.category_id: 0;
          this.store.dispatch(new ProcessingQualificationCategory());
          if(this.inEditMode()===false){
            this.store.dispatch(new SaveQualificationCategory({data: this.fs.value}));
          }
          else if(this.inEditMode()===true){
            this.store.dispatch(new UpdateQualificationCategory({data: this.fs.value, recordId: recordId}));
          }

        } else {
          this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError()}));
        }
      }

      getErrorMessage() {
        return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
      }

      onCancel() {
        this.store.dispatch(new NotProcessingQualificationCategory());
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

