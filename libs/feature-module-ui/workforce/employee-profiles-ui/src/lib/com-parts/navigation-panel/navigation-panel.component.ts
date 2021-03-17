import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { NavMenuItemTypes } from '../../main/enumerations';

@Component({
  selector: 'x365-fm-workforce-navigation-panel',
  templateUrl: './navigation-panel.component.html',
  styleUrls: ['./navigation-panel.component.scss']
})
export class NavigationPanelComponent implements OnInit {
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
