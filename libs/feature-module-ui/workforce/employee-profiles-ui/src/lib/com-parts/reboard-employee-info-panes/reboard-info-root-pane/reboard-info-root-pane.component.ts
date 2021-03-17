import { Component, OnInit, Input } from '@angular/core';

import { NavMenuItemTypes } from '../../../main/enumerations';

@Component({
  selector: 'x365-fm-workforce-reboard-info-root-pane',
  templateUrl: './reboard-info-root-pane.component.html',
  styleUrls: ['./reboard-info-root-pane.component.scss']
})
export class ReboardInfoRootPaneComponent implements OnInit {
  NavMenuItemTypes = NavMenuItemTypes;

  @Input() selectedModuleId = NavMenuItemTypes.CONTACT;
  @Input() data: any = null;
  @Input() reboardMode: number;
  @Input() employeeId: number;

  constructor() {}

  ngOnInit() {}
}
