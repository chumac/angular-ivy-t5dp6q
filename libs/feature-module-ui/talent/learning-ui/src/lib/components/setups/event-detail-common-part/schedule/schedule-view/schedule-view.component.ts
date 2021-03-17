import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { UtilService } from '@nutela/core-services';
import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { DialogService } from '@nutela/shared/ui';
import { ILearningState } from 'libs/feature-module-ui/talent/learning-ui/src/store';
import { HideEventScheduleView, isProcessingEventSchedule } from 'libs/feature-module-ui/talent/learning-ui/src/store/setups/event-detail-data/Schedule';
import { IEventHall } from 'libs/models/talent/learning/src/lib/interfaces/event-hall.interface';
import { IEventSchedule } from 'libs/models/talent/learning/src/lib/interfaces/schedule.interface';
import { Observable } from 'rxjs';
import { EventScheduleViewService } from './schedule-view.service';

@Component({
  selector: 'x365-fm-talent-schedule-view',
  templateUrl: './schedule-view.component.html',
  styleUrls: ['./schedule-view.component.scss']
})
export class ScheduleViewComponent extends BaseFormComponent implements OnInit {
  @Input() public showView: boolean;
  @Input() public width: number;
  @Input() public eventId: number;
  @Input() public data: IEventSchedule;

  @Output() cancelClick = new EventEmitter<any>();
  isProcessing$: Observable<boolean>;

  constructor(
    public fs: EventScheduleViewService,
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
    this.store.dispatch(new HideEventScheduleView());
  }

}
