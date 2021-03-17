import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges, OnDestroy } from '@angular/core';
import { BaseFormComponent } from '@nutela/shared/app-global';
import { Store, select } from '@ngrx/store';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { ShowToast } from '@nutela/store/shared';
import { Observable } from 'rxjs/internal/Observable';
import { IUpdateMyEvent } from '@nutela/models/talent/learning';
import { ILearningState, ProcessingLearningPlan, ApplyLearningLibrary, EditLearningPlan } from '../../../../../store';
import { LearningPlanEditEditorService } from './learning-plan-edit-editor.service';

@Component({
  selector: 'x365-fm-talent-learning-plan-edit-editor',
  templateUrl: './learning-plan-edit-editor.component.html',
  styleUrls: ['./learning-plan-edit-editor.component.scss'],
  providers: [LearningPlanEditEditorService],
})
export class LearningPlanEditEditorComponent extends BaseFormComponent
  implements OnInit, OnDestroy {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: any;
  @Input() public selectedEventId: number;

  @Output() cancelClick = new EventEmitter<any>();
  isProcessing$: Observable<boolean>;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.data) {
      this.fs.patch({event_title : this.data.subject});
    }
  }

  constructor(public utilService: UtilService, public fs: LearningPlanEditEditorService, private store: Store<ILearningState>) {
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
      this.store.dispatch(new ProcessingLearningPlan());
      this.store.dispatch(new EditLearningPlan({ data: <IUpdateMyEvent>this.fs.value, recordId: this.selectedEventId }));
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
