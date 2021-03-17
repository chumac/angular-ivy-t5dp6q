import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { UtilService } from '@nutela/core-services';
import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { ShowToast } from '@nutela/store/shared';
import { HideEventParticipantsEditor, HideEventParticipantsView, ILearningState, isProcessingEventParticipants, LoadEventParticipantsData, NotProcessingEventParticipants, ProcessingEventParticipants, SaveEventParticipantData, UpdateEventParticipantData } from 'libs/feature-module-ui/talent/learning-ui/src/store';
import { IEventParticiantEmployee, IEventParticiantSchedule, IEventParticiantSource, IEventParticipants } from 'libs/models/talent/learning/src/lib/interfaces/event-participants.interface';
import { Observable } from 'rxjs';
import { EventParticipantsViewService } from './event-detail-participants-view.service';

@Component({
  selector: 'x365-fm-talent-event-detail-participants-view',
  templateUrl: './event-detail-participants-view.component.html',
  styleUrls: ['./event-detail-participants-view.component.scss']
})
export class EventDetailParticipantsViewComponent extends BaseFormComponent implements OnInit {

  @Input() public showView: boolean;
  @Input() public width: number;
  @Input() public warningMessage: string = null;
  @Input() public eventId: number;
  @Input() public data: IEventParticipants;

  @Output() cancelClick = new EventEmitter<any>();
  isProcessing$: Observable<boolean>;

  constructor(
    public fs: EventParticipantsViewService,
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
  }

  inEditMode(): boolean {

    if (this.data) {
      return true;
    } else {
      return false;
    }
  }

  onSubmit() {
    this.store.dispatch(new HideEventParticipantsView());
  }

  reset() {
    this.fs.f.reset();
    this.fs.patch({ exclude_by_percent: true });
    this.fs.init(this.data);
    this.store.dispatch(new LoadEventParticipantsData(this.eventId))
  }

}
