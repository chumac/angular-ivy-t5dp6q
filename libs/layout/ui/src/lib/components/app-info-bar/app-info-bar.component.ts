import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IName } from '@nutela/models/core-data';
import { IOrganization } from '@nutela/models/common';

@Component({
  selector: 'x365-layout-ui-app-info-bar',
  templateUrl: './app-info-bar.component.html',
  styleUrls: ['./app-info-bar.component.scss']
})
export class AppInfoBarComponent implements OnInit {
  @Input() public sidenav: any;

  @Input() public orgData: IOrganization = null;
  @Input() public employeeName: IName = {employeeId: 0};
  @Input() public employeePhoto: any = null;
  @Input() public notificationCount = 0;
  @Input() public loading = false;

  @Output() signout = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  get logo(): any {
    if (this.orgData) {
      return 'data:image/png;base64,' + this.orgData.org_logo_vtwo;
    }
  }

  toggleSideNav() {
    this.sidenav.show();
  }

  signoutClicked() {
    this.signout.emit();
  }
}
