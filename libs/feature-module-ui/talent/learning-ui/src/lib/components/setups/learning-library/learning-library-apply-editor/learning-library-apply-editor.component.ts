import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges, OnDestroy } from '@angular/core';
import { BaseFormComponent } from '@nutela/shared/app-global';
import { Store, select } from '@ngrx/store';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { ShowToast } from '@nutela/store/shared';
import { Observable } from 'rxjs/internal/Observable';
import { ILearningApply } from '@nutela/models/talent/learning';
import { ILearningState, ProcessingLearningLibrary, ApplyLearningLibrary } from '../../../../../store';
import { LearningLibraryApplyEditorService } from './learning-library-apply-editor.service';
import { IEventSchedule } from 'libs/models/talent/learning/src/lib/interfaces/schedule.interface';

@Component({
  selector: 'x365-fm-talent-learning-library-apply-editor',
  templateUrl: './learning-library-apply-editor.component.html',
  styleUrls: ['./learning-library-apply-editor.component.scss'],
  providers: [LearningLibraryApplyEditorService],
})
export class LearningLibraryApplyEditorComponent extends BaseFormComponent
  implements OnInit, OnDestroy {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public selectedEventId: number;
  @Input() public eventScheduleData: IEventSchedule;

  @Output() cancelClick = new EventEmitter<any>();
  isProcessing$: Observable<boolean>;

  ngOnChanges(changes: SimpleChanges): void {
  }

  constructor(public utilService: UtilService, public fs: LearningLibraryApplyEditorService, private store: Store<ILearningState>) {
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
    this.fs.form.controls['event_id'].setValue(this.selectedEventId);
    if (this.fs.valid) {
      this.store.dispatch(new ProcessingLearningLibrary());
      this.store.dispatch(new ApplyLearningLibrary({ data: <ILearningApply>this.fs.value }));
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
