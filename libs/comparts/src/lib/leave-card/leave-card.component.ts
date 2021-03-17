
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ILeaveTimeline } from '@nutela/models/workforce/leave';

@Component({
  selector: 'x365-comparts-leave-card',
  templateUrl: './leave-card.component.html',
  styleUrls: ['./leave-card.component.scss']
})
export class LeaveCardComponent implements OnInit {

  @Input() public viewType: string;
  @Input() leaveTimeline: ILeaveTimeline[];

  @Output() viewTypeSwitch: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onEventSelection($event: any, type: string) {
    this.viewTypeSwitch.emit(type);
  }

  get cardTitle(): string {
    if (this.viewType === 'Daily') {
      return 'Team Leave (Daily)';
    } else if (this.viewType === 'Hourly') {
      return 'Team Leave (Hourly)';
    }
  }

  get showLeaveTimelineDailyTable(): boolean {
    if (this.viewType === 'Daily') {
      return true;
    } else {
      return false;
    }
  }

  get showLeaveTimelineHourlyTable(): boolean {
    if (this.viewType === 'Hourly') {
      return true;
    } else {
      return false;
    }
  }
}
