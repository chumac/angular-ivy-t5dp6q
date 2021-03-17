import { Component, OnInit, Input } from '@angular/core';
import { IEventDetailData } from '@nutela/models/talent/learning';

@Component({
  selector: 'x365-fm-talent-event-detail-data-panel',
  templateUrl: './event-detail-data-panel.component.html',
  styleUrls: ['./event-detail-data-panel.component.scss']
})
export class EventDetailDataPanelComponent implements OnInit {

  @Input() public eventDetailData: IEventDetailData;

  constructor() { }

  ngOnInit() {
    console.log(this.eventDetailData);
  }

}
