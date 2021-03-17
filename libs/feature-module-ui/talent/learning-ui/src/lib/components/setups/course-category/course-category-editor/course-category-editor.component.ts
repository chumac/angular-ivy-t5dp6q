import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output, SimpleChanges, OnDestroy } from '@angular/core';
import { BaseFormComponent, FILE_EXTENSIONS } from '@nutela/shared/app-global';
import { Store, select } from '@ngrx/store';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { CourseCategoryEditorService } from './course-category-editor.service';
import { ShowToast } from '@nutela/store/shared';
import { Observable } from 'rxjs/internal/Observable';
import { ICourseCategory } from '@nutela/models/talent/learning';
import * as constants from '../../../../constants';
import { ILearningState, isProcessingCourseCategory, ProcessingCourseCategory, SaveCourseCategory, AddCourseCategory, getcourseCategoryData } from '../../../../../store';

@Component({
  selector: 'x365-fm-talent-course-category-editor',
  templateUrl: './course-category-editor.component.html',
  styleUrls: ['./course-category-editor.component.scss'],
  providers: [CourseCategoryEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class CourseCategoryEditorComponent extends BaseFormComponent
implements OnInit, OnDestroy  {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: ICourseCategory;

  @Output() cancelClick = new EventEmitter<any>();
  isProcessing$: Observable<boolean>;
  coursecategoryList$: Observable<ICourseCategory[]>;

  ngOnChanges(changes: SimpleChanges): void {

    if(changes['data']) {
      this.fs.init(this.data);
      console.log(this.data);
    }
  }

  constructor(public utilService: UtilService, public fs: CourseCategoryEditorService, private store: Store<ILearningState>) { 
    super();
  }

  ngOnInit() {
    this.isProcessing$ = this.store.pipe(select(isProcessingCourseCategory));
    this.coursecategoryList$ = this.store.pipe(select(getcourseCategoryData));
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
        const recordId = this.data.category_id;
        this.store.dispatch(new ProcessingCourseCategory());
        this.store.dispatch(new SaveCourseCategory({data: <ICourseCategory>this.fs.value, recordId: recordId, editMode: this.inEditMode() }));
        this.data = null;
        this.reset();
        this.cancelClick.emit();
      } else {
        this.store.dispatch(new ProcessingCourseCategory());
        this.store.dispatch(new AddCourseCategory({data: <ICourseCategory>this.fs.value }));
        this.data = null;
        this.reset();
        this.cancelClick.emit();
      }
    } else {
     this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError()}));
    }
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  reset() {
    this.fs.form = this.fs.buildForm();
    this.fs.init(this.data);
  }

  ngOnDestroy() {
  }

} 
