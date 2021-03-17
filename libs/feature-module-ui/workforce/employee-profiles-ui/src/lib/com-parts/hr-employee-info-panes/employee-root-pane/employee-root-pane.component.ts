import { Component, OnInit, Input } from '@angular/core';

import { NavMenuItemTypes } from '../../../main/hr-enumerations';

@Component({
  selector: 'x365-fm-workforce-employee-root-pane',
  templateUrl: './employee-root-pane.component.html',
  styleUrls: ['./employee-root-pane.component.scss']
})
export class EmployeeRootPaneComponent implements OnInit {
  NavMenuItemTypes = NavMenuItemTypes;

  @Input() selectedModuleId = NavMenuItemTypes.GENERAL_INFORMATION;

  @Input() data: any = null;
  @Input() employeeId: number;
  @Input() employeeConsent: boolean;
  @Input() implementPolicy: string;

  constructor() { }

  ngOnInit() {
  }


}
