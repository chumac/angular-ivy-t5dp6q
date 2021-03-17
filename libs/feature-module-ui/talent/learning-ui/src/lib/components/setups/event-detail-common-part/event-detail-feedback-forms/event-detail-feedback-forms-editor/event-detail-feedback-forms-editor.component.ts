import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output, SimpleChanges, OnDestroy } from '@angular/core';
import { IEventDetailFeedbackForms, IEventDetailFormAvailability, IEventDetailFeedbackRole, IEventDetailCustomForms } from '@nutela/models/talent/learning';
import { EventDetailFeedbackFormsEditorService } from './event-detail-feedback-forms-editor.service';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { Observable } from 'rxjs/internal/Observable';
import { ILearningState, ProcessingFeedbackForms, AddFeedbackForms, SaveFeedbackForms } from 'libs/feature-module-ui/talent/learning-ui/src/store';
import { Store, select } from '@ngrx/store';
import { ShowToast } from '@nutela/store/shared';
import { BaseFormComponent, FILE_EXTENSIONS } from '@nutela/shared/app-global';

@Component({
  selector: 'x365-fm-talent-event-detail-feedback-forms-editor',
  templateUrl: './event-detail-feedback-forms-editor.component.html',
  styleUrls: ['./event-detail-feedback-forms-editor.component.scss'],
  providers: [EventDetailFeedbackFormsEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventDetailFeedbackFormsEditorComponent extends BaseFormComponent
  implements OnInit, OnDestroy {

  constructor(public utilService: UtilService, private store: Store<ILearningState>, public fs: EventDetailFeedbackFormsEditorService) {
    super();
  }

  @Input() public width: number;
  @Input() public show: boolean;
  @Input() public eventDetailId: number;
  @Input() public data: IEventDetailFeedbackForms;
  @Input() public CustomFormData: IEventDetailCustomForms;
  @Input() public FeedbackFormsAvailableData: IEventDetailFormAvailability;
  @Input() public FeedbackFormsRoleData: IEventDetailFeedbackRole;
  isShow = false;


  @Output() cancelClick = new EventEmitter<any>();

  isProcessing$: Observable<boolean>;
  FeedbackFormsList$: Observable<IEventDetailFeedbackForms[]>;

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['data']) {
      this.fs.init(this.data);
    }
  }

  onSelectAvailability($event) {
    console.log($event);
    if ($event.value === 2) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

  ngOnInit() {
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
    if (!this.inEditMode()) {
      this.fs.form.controls['event_id'].setValue(this.eventDetailId);
    }
    if (this.fs.valid) {
      if (this.inEditMode()) {
        const recordId = this.data.id;
        this.store.dispatch(new ProcessingFeedbackForms());
        this.store.dispatch(new SaveFeedbackForms({ data: <IEventDetailFeedbackForms>this.fs.value, recordId: recordId, editMode: this.inEditMode(), eventDetailId: this.eventDetailId }));
        this.data = null;
        this.reset();
        this.cancelClick.emit();
      } else {
        this.store.dispatch(new ProcessingFeedbackForms());
        this.store.dispatch(new AddFeedbackForms({ data: <IEventDetailFeedbackForms>this.fs.value, eventDetailId: this.eventDetailId }));
        this.data = null;
        this.reset();
        this.cancelClick.emit();
      }
    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError() }));
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
