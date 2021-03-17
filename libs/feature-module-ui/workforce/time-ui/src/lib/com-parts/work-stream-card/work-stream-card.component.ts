import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { IWorkStreamData } from '@nutela/models/workforce/time-sheet';

@Component({
  selector: 'x365-fm-workforce-time-work-stream-card',
  templateUrl: './work-stream-card.component.html',
  styleUrls: ['./work-stream-card.component.scss']
})
export class WorkStreamCardComponent implements OnInit {
  @Input() public data: IWorkStreamData;
  @Output() editWorkStreamEvtData = new EventEmitter<any>();
  @Output() deleteWorkStreamEvtData = new EventEmitter<any>();
  show = false;

  constructor() { }

  ngOnInit() {

  }

  onEditWorkActivity(evt: IWorkStreamData) {
    this.editWorkStreamEvtData.emit(evt);
  }

  onDeleteWorkActivity(evt: IWorkStreamData) {
    this.deleteWorkStreamEvtData.emit(evt);
  }

}