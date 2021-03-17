import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NavMenuItemTypes } from '../event-detail-enumerations';

@Component({
  selector: 'x365-fm-talent-event-detail-navigation-panel',
  templateUrl: './event-detail-navigation-panel.component.html',
  styleUrls: ['./event-detail-navigation-panel.component.scss']
})
export class EventDetailNavigationPanelComponent implements OnInit {
  NavMenuItemTypes = NavMenuItemTypes;

  selectedNavMenuItem = NavMenuItemTypes.EVENT_DETAILS;

  @Output() navMenuItemSelected = new EventEmitter<string>();
  @Input() isOpen: number;

  constructor() {}

  ngOnInit() {}

  getActivatedMenuItemStatus(id: string): boolean {
    if (this.selectedNavMenuItem === id) {
      return true;
    } else {
      return false;
    }
  }

  onNavItemClick($event) {
    this.selectedNavMenuItem = $event;
    this.navMenuItemSelected.emit(this.selectedNavMenuItem);
  }
}