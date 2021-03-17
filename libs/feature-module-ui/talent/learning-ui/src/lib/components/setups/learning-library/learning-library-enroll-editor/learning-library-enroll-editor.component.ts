import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges, OnDestroy } from '@angular/core';
import { BaseFormComponent } from '@nutela/shared/app-global';
import { Store, select } from '@ngrx/store';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { ShowToast } from '@nutela/store/shared';
import { Observable } from 'rxjs/internal/Observable';
import { ICourse, ILearningEnroll } from '@nutela/models/talent/learning';
import { ILearningState, ProcessingLearningLibrary, EnrollLearningLibrary } from '../../../../../store';
import { LearningLibraryEnrollEditorService } from './learning-library-enroll-editor.service';

@Component({
  selector: 'x365-fm-talent-learning-library-enroll-editor',
  templateUrl: './learning-library-enroll-editor.component.html',
  styleUrls: ['./learning-library-enroll-editor.component.scss'],
  providers: [LearningLibraryEnrollEditorService],
})
export class LearningLibraryEnrollEditorComponent extends BaseFormComponent
  implements OnInit, OnDestroy {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public courseId: number;
  @Input() public courseData: ICourse;

  @Output() cancelClick = new EventEmitter<any>();
  isProcessing$: Observable<boolean>;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.courseId) {
      this.fs.form.controls['course_id'].setValue(this.courseId);
    }
  }

  constructor(public utilService: UtilService, public fs: LearningLibraryEnrollEditorService, private store: Store<ILearningState>) {
    super();
  }

  ngOnInit() {
  }

  onCancel() {
    this.reset();
    this.cancelClick.emit();
  }

  onFileSelected($event) { }

  onSubmit() {
    if (this.fs.valid) {
      this.store.dispatch(new ProcessingLearningLibrary());
      this.store.dispatch(new EnrollLearningLibrary({ data: <ILearningEnroll>this.fs.value }));
      this.reset();
      this.cancelClick.emit();
    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError() }));
    }
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  reset() {
    this.fs.form = this.fs.buildForm();
  }

  ngOnDestroy() {
  }

} 
