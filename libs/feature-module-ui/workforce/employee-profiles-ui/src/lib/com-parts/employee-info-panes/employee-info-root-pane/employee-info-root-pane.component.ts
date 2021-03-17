import { Component, OnInit, Input } from '@angular/core';

import { NavMenuItemTypes } from '../../../main/enumerations';

@Component({
  selector: 'x365-fm-workforce-employee-info-root-pane',
  templateUrl: './employee-info-root-pane.component.html',
  styleUrls: ['./employee-info-root-pane.component.scss']
})
export class EmployeeInfoRootPaneComponent implements OnInit {
  NavMenuItemTypes = NavMenuItemTypes;

  @Input() selectedModuleId = NavMenuItemTypes.CONTACT;
  @Input() data: any = null;
  @Input() implementPolicy: string;
  @Input() employeeConsent: boolean;

  constructor() {}

  ngOnInit() {}
}
