import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { ILookupState, getEducationalCoursesCategory, LoadEducationalCoursesCategory } from '../../../store';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { IEducationalCourses } from '@nutela/models/platform/lookup';
import { BaseFormComponent } from '@nutela/shared/app-global';
import { EducationalCoursesEditorService } from './educational-courses-editor.service';
import { ShowToast } from '@nutela/store/shared';
import { ProcessingEducationalCourses, SaveEducationalCourses, UpdateEducationalCourses, NotProcessingEducationalCourses, isProcessingEducationalCourses } from '../../../store';
import { ISelectOption } from '@nutela/models/core-data';

@Component({
  selector: 'x365-fm-plf-hrf-educational-courses-editor',
  templateUrl: './educational-courses-editor.component.html',
  styleUrls: ['./educational-courses-editor.component.scss']
})
export class EducationalCoursesEditorComponent extends BaseFormComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;


  @Input() public data: IEducationalCourses;

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
  category$:Observable<ISelectOption[]>;
  public catData=[];


  constructor(
    public fs: EducationalCoursesEditorService,
    public utilService: UtilService,
    private store: Store<ILookupState>,
    private cd: ChangeDetectorRef) {
      super();
    }
    ngOnInit() {
      this.storeSelects();
      this.store.dispatch(new LoadEducationalCoursesCategory());
    }


    storeSelects() {
      this.isProcessing$ = this.store.pipe(select(isProcessingEducationalCourses));
      this.category$= this.store.pipe(select(getEducationalCoursesCategory));
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
        const recordId = this.data? this.data.course_id: 0;
        this.store.dispatch(new ProcessingEducationalCourses());
        if(this.inEditMode()===false){
          this.store.dispatch(new SaveEducationalCourses({data: this.fs.value}));
        }
        else if(this.inEditMode()===true){
          this.store.dispatch(new UpdateEducationalCourses({data: this.fs.value, recordId: recordId}));
        }

      } else {
        this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError()}));
      }
    }

    getErrorMessage() {
      return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
    }

    onCancel() {
      this.store.dispatch(new NotProcessingEducationalCourses());
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
