import { Component, OnInit, Input } from '@angular/core';

import * as constants from '@nutela/shared/app-global';

@Component({
  selector: 'x365-shared-nav-root-navigation',
  templateUrl: './root-navigation.component.html',
  styleUrls: ['./root-navigation.component.scss']
})
export class RootNavigationComponent implements OnInit {
  @Input() selectedModuleId: string;

  moduleIdConstants = constants;

  constructor() {}

  ngOnInit() {
    // console.log('Module Const', this.moduleIdConstants);
    // console.log('Selected Module', this.selectedModuleId);
  }
}
