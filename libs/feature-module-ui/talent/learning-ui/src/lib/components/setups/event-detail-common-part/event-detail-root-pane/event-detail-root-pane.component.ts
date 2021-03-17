import { Component, OnInit, Input } from '@angular/core';
import { NavMenuItemTypes } from '../event-detail-enumerations';

@Component({
  selector: 'x365-fm-talent-event-detail-root-pane',
  templateUrl: './event-detail-root-pane.component.html',
  styleUrls: ['./event-detail-root-pane.component.scss']
})
export class EventDetailRootPaneComponent implements OnInit {

  constructor() { }
  NavMenuItemTypes = NavMenuItemTypes;
  @Input() selectedModuleId = NavMenuItemTypes.EVENT_DETAILS;
  @Input() eventDetailId: number;
  @Input() isReview: number;
  @Input() isOpen: number;

  ngOnInit() {
    if (this.isOpen) {
      this.selectedModuleId = NavMenuItemTypes.ASSETS;
    }
  }

}
