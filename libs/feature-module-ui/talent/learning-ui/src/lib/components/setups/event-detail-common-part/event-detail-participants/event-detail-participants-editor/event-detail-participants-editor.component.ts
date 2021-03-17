import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { UtilService } from '@nutela/core-services';
import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { ShowToast } from '@nutela/store/shared';
import { getEventParticipantCriteriaKey, HideEventParticipantsEditor, ILearningState, isProcessingEventParticipants, LoadEventParticipantsData, NotProcessingEventParticipants, ProcessingEventParticipants, SaveEventParticipantData, ShowEventParticipantCriteria, showEventParticipantCriteria, UpdateEventParticipantData } from 'libs/feature-module-ui/talent/learning-ui/src/store';
import { IEventParticiantCriteriaKey, IEventParticiantEmployee, IEventParticiantSchedule, IEventParticiantSource, IEventParticipants } from 'libs/models/talent/learning/src/lib/interfaces/event-participants.interface';
import { Observable } from 'rxjs';
import { EventParticipantsEditorService } from './event-detail-participants-editor.service';

@Component({
  selector: 'x365-fm-talent-event-detail-participants-editor',
  templateUrl: './event-detail-participants-editor.component.html',
  styleUrls: ['./event-detail-participants-editor.component.scss']
})
export class EventDetailParticipantsEditorComponent extends BaseFormComponent implements OnInit {

  @Input() public showCreate: boolean;
  @Input() public width: number;
  @Input() public warningMessage: string = null;
  @Input() public eventId: number;
  @Input() public data: IEventParticipants;
  @Input() public eventParticipantEmployee: IEventParticiantEmployee[];
  @Input() public eventParticipantSource: IEventParticiantSource[];
  @Input() public eventParticipantSchedule: IEventParticiantSchedule[];

  eventParticiantCriteriaKey$: Observable<IEventParticiantCriteriaKey[]>;
  

  @Output() cancelClick = new EventEmitter<any>();
  isProcessing$: Observable<boolean>;
  showEventParticipantCriteria$: Observable<boolean>;

  constructor(
    public fs: EventParticipantsEditorService,
    public utilService: UtilService,
    private store: Store<ILearningState>
  ) {
    super();
  }

  ngOnInit() {
    this.storeSelects();
  }

  storeSelects() {
    this.isProcessing$ = this.store.pipe(select(isProcessingEventParticipants));
    this.eventParticiantCriteriaKey$ = this.store.pipe(select(getEventParticipantCriteriaKey));
    this.showEventParticipantCriteria$ = this.store.pipe(select(showEventParticipantCriteria));
  }

  inEditMode(): boolean {

    if (this.data) {
      return true;
    } else {
      return false;
    }
  }

  onSubmit() {
    if (this.fs.value.is_recommendation == null) {
      this.fs.patch({ is_recommendation: false });
    }
    if (this.fs.valid) {
      this.store.dispatch(new ProcessingEventParticipants());
      this.fs.patch({ event_id: this.eventId });
      if (this.inEditMode()) {
        const recordId = this.data ? this.data.id : 0;
        this.store.dispatch(new UpdateEventParticipantData({ data: <any>this.fs.value, id: recordId }));
      } else {
        var participantObj = {
          event_id: this.fs.value.event_id,
          employee_ids: [this.fs.value.employee_id],
          schedule_id: this.fs.value.schedule_id,
          source: this.fs.value.source,
          is_recommendation: this.fs.value.is_recommendation
        }
        this.store.dispatch(new SaveEventParticipantData({ data: participantObj }));
      }
      this.data = null;
      this.reset();
    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: this.getErrorMessage(), type: ToastTypes.ERROR }));
    }
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  onCancel() {
    this.store.dispatch(new NotProcessingEventParticipants());
    this.store.dispatch(new HideEventParticipantsEditor());
    this.data = null;
    this.reset();
    this.cancelClick.emit();
  }

  reset() {
    this.fs.f.reset();
    this.fs.patch({ source: 1 });
    this.fs.init(this.data);
    this.store.dispatch(new LoadEventParticipantsData(this.eventId))
  }

  // onSourceChange(sourceValue) {
  //   console.log(sourceValue);
  //   if (sourceValue == 0) {
  //     this.store.dispatch(new ShowEventParticipantCriteria());
  //   }
  // }

}
