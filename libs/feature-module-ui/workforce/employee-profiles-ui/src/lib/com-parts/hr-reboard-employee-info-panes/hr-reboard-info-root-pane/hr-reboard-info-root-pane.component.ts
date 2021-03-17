import { Component, OnInit, Input } from '@angular/core';

import { NavMenuItemTypes } from '../../../main/enumerations';

@Component({
  selector: 'x365-fm-workforce-hr-reboard-info-root-pane',
  templateUrl: './hr-reboard-info-root-pane.component.html',
  styleUrls: ['./hr-reboard-info-root-pane.component.scss']
})
export class HrReboardInfoRootPaneComponent implements OnInit {
  NavMenuItemTypes = NavMenuItemTypes;

  @Input() selectedModuleId = NavMenuItemTypes.CONTACT;
  @Input() data: any = null;
  @Input() reboardMode: number;
  @Input() employeeId: number;

  constructor() {}

  ngOnInit() {}
}
