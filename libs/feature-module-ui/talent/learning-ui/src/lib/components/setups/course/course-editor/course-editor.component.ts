import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output, SimpleChanges, OnDestroy } from '@angular/core';
import { BaseFormComponent, FILE_EXTENSIONS } from '@nutela/shared/app-global';
import { CourseEditorService } from './course-editor.service';
import { ShowToast } from '@nutela/store/shared';
import { ICourse, ICourseCategory, IEventDetailType } from '@nutela/models/talent/learning';
import * as constants from '../../../../constants';
import { Store, select } from '@ngrx/store';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { Observable } from 'rxjs/internal/Observable';
import { ILearningState, isProcessingcourse, getcourseCategoryData, ProcessingCourse, SaveCourse, AddCourse, getcourseData } from '../../../../../store';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'x365-fm-talent-course-editor',
  templateUrl: './course-editor.component.html',
  styleUrls: ['./course-editor.component.scss'],
  providers: [CourseEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush 
})

export class CourseEditorComponent extends BaseFormComponent
implements OnInit, OnDestroy  {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: ICourse;
  @Input() public eventDetailType: IEventDetailType;

  @Output() cancelClick = new EventEmitter<any>();
  isProcessing$: Observable<boolean>;
  courseList$: Observable<ICourse[]>;
  courseCategoryData$: Observable<ICourseCategory[]>;
  
  ngOnChanges(changes: SimpleChanges): void {

    if(changes['data']) {
      this.fs.init(this.data);
    }
  }

  constructor(public utilService: UtilService, public fs: CourseEditorService, private store: Store<ILearningState>) { 
    super();
  }

  ngOnInit() {
    this.courseCategoryData$ = this.store.pipe(select(getcourseCategoryData));
    this.isProcessing$ = this.store.pipe(select(isProcessingcourse));
    this.courseList$ = this.store.pipe(select(getcourseData));
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
        const recordId = this.data.course_id;
        this.store.dispatch(new ProcessingCourse());
        this.store.dispatch(new SaveCourse({data: <ICourse>this.fs.value, recordId: recordId, editMode: this.inEditMode() }));
        this.data = null;
        this.reset();
        this.cancelClick.emit();
      } else {
        this.store.dispatch(new ProcessingCourse());
        this.store.dispatch(new AddCourse({data: <ICourse>this.fs.value }));
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