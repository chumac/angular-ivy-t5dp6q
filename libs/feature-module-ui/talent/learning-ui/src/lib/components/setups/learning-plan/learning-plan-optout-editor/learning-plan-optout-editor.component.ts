import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges, OnDestroy } from '@angular/core';
import { BaseFormComponent } from '@nutela/shared/app-global';
import { Store, select } from '@ngrx/store';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { ShowToast } from '@nutela/store/shared';
import { Observable } from 'rxjs/internal/Observable';
import { ICourseCategory, IEmployeeOptOutEvent } from '@nutela/models/talent/learning';
import { ILearningState, isProcessingCourseCategory, ProcessingCourseCategory, SaveCourseCategory, AddCourseCategory, getcourseCategoryData, ProcessingLearningPlan, EmployeeOptOutEvent } from '../../../../../store';
import { LearningPlanOptOutEditorService } from './learning-plan-optout-editor.service';

@Component({
  selector: 'x365-fm-talent-learning-plan-optout-editor',
  templateUrl: './learning-plan-optout-editor.component.html',
  styleUrls: ['./learning-plan-optout-editor.component.scss'],
  providers: [LearningPlanOptOutEditorService],
})
export class LearningPlanOptOutEditorComponent extends BaseFormComponent
  implements OnInit, OnDestroy {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: ICourseCategory;
  @Input() public selectedType: number;
  @Input() public selectedEventId: number;

  @Output() cancelClick = new EventEmitter<any>();
  isProcessing$: Observable<boolean>;
  coursecategoryList$: Observable<ICourseCategory[]>;

  ngOnChanges(changes: SimpleChanges): void {
  }

  constructor(public utilService: UtilService, public fs: LearningPlanOptOutEditorService, private store: Store<ILearningState>) {
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

  onFileSelected($event) { }

  onSubmit() {
    if (this.fs.valid) {
      this.store.dispatch(new ProcessingLearningPlan());
      this.store.dispatch(new EmployeeOptOutEvent({ data: <IEmployeeOptOutEvent>this.fs.value, recordId: this.selectedEventId, eventType: this.selectedType }));
      this.data = null;
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
