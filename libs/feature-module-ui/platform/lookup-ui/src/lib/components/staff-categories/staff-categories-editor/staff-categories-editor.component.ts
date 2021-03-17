import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { IStaffCategory } from '@nutela/models/platform/lookup';
import { Observable } from 'rxjs';
import { StaffCategoryEditorService } from './staff-categories-editor.service';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { ILookupState } from '../../../store';
import { BaseFormComponent } from '@nutela/shared/app-global';
import { ShowToast } from '@nutela/store/shared';
import { UpdateStaffCategory, SaveStaffCategory, ProcessingStaffCategory, NotProcessingStaffCategory, isProcessingStaffCategory } from '../../../store';


@Component({
  selector: 'x365-fm-plf-hrf-staff-categories-editor',
  templateUrl: './staff-categories-editor.component.html',
  styleUrls: ['./staff-categories-editor.component.scss']
})
export class StaffCategoriesEditorComponent extends BaseFormComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;


  @Input() public data: IStaffCategory;

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
    public fs:  StaffCategoryEditorService,
    public utilService: UtilService,
    private store: Store<ILookupState>,
    private cd: ChangeDetectorRef) {
      super();
    }
    ngOnInit() {
      this.storeSelects();
    }


    storeSelects() {
      this.isProcessing$ = this.store.pipe(select(isProcessingStaffCategory));
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
        this.store.dispatch(new ProcessingStaffCategory());
        if(this.inEditMode()===false){
          this.store.dispatch(new SaveStaffCategory({data: this.fs.value}));
        }
        else if(this.inEditMode()===true){
          this.store.dispatch(new UpdateStaffCategory({data: this.fs.value, recordId: recordId}));
        }

      } else {
        this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError()}));
      }
    }

    getErrorMessage() {
      return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
    }

    onCancel() {
      this.store.dispatch(new NotProcessingStaffCategory());
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
