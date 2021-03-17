import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { NavMenuItemTypes } from '../../main/enumerations';

@Component({
  selector: 'x365-fm-workforce-hr-reboard-navigation-panel',
  templateUrl: './hr-reboard-navigation-panel.component.html',
  styleUrls: ['./hr-reboard-navigation-panel.component.scss']
})
export class HrReboardNavigationPanelComponent implements OnInit {
  NavMenuItemTypes = NavMenuItemTypes;

  selectedNavMenuItem = NavMenuItemTypes.PERSONAL_INFORMATION;

  @Input() showProfilePictureNavItem = true;
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
