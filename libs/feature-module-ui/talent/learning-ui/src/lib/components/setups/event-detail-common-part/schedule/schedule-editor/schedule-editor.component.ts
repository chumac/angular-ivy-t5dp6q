import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { UtilService } from '@nutela/core-services';
import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { DialogService } from '@nutela/shared/ui';
import { ShowToast } from '@nutela/store/shared';
import { ILearningState } from 'libs/feature-module-ui/talent/learning-ui/src/store';
import { HideEventScheduleEditor, isProcessingEventSchedule, LoadEventScheduleData, NotProcessingEventSchedule, ProcessingEventSchedule, SaveEventScheduleData, UpdateEventScheduleData } from 'libs/feature-module-ui/talent/learning-ui/src/store/setups/event-detail-data/Schedule';
import { IEventHall } from 'libs/models/talent/learning/src/lib/interfaces/event-hall.interface';
import { IEventSchedule } from 'libs/models/talent/learning/src/lib/interfaces/schedule.interface';
import { Observable } from 'rxjs';
import { EventScheduleEditorService } from './schedule-editor.service';

@Component({
  selector: 'x365-fm-talent-schedule-editor',
  templateUrl: './schedule-editor.component.html',
  styleUrls: ['./schedule-editor.component.scss']
})
export class ScheduleEditorComponent extends BaseFormComponent implements OnInit {

  @Input() public showCreate: boolean;
  @Input() public width: number;
  @Input() public warningMessage: string = null;
  @Input() public eventId: number;
  showCreateConfigureEditor$: Observable<boolean>;
  @Input() public data: IEventSchedule;
  @Input() public eventHallData: IEventHall[];

  @Output() cancelClick = new EventEmitter<any>();
  isProcessing$: Observable<boolean>;

  constructor(
    public fs: EventScheduleEditorService,
    public utilService: UtilService,
    private store: Store<ILearningState>,
    private dialogService: DialogService
  ) {
    super();
  }

  ngOnInit() {
    this.storeSelects();
  }

  storeSelects() {
    this.isProcessing$ = this.store.pipe(select(isProcessingEventSchedule));
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
      this.store.dispatch(new ProcessingEventSchedule());
      this.fs.patch({ event_id: this.eventId });
      if (this.inEditMode()) {
        const recordId = this.data ? this.data.id : 0;
        this.store.dispatch(new UpdateEventScheduleData({ data: <any>this.fs.value, schedule_id: this.data.id }));
      } else {
        this.store.dispatch(new SaveEventScheduleData({ data: this.fs.value }));
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
    this.store.dispatch(new NotProcessingEventSchedule());
    this.store.dispatch(new HideEventScheduleEditor());
    this.data = null;
    this.reset();
    this.cancelClick.emit();
    this.setDefaultFields(null);
  }

  reset() {
    this.fs.f.reset();
    this.fs.patch({ exclude_by_percent: true });
    this.fs.init(this.data);
    this.store.dispatch(new LoadEventScheduleData(this.eventId))
  }

  setDefaultFields(data: IEventSchedule) {
    this.fs.init(this.data);
  }

}
