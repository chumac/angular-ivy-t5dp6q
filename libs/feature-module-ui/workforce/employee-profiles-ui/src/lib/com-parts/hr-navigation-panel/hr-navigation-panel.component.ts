import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { NavMenuItemTypes } from '../../main/hr-enumerations';

@Component({
  selector: 'x365-fm-workforce-hr-navigation-panel',
  templateUrl: './hr-navigation-panel.component.html',
  styleUrls: ['./hr-navigation-panel.component.scss']
})
export class HrNavigationPanelComponent implements OnInit {
  NavMenuItemTypes = NavMenuItemTypes;

  selectedNavMenuItem = NavMenuItemTypes.GENERAL_INFORMATION;

  @Output() navMenuItemSelected = new EventEmitter<string>();

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
