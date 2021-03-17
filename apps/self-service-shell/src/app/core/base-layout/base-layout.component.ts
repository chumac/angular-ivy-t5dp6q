import { Component, OnInit } from '@angular/core';

import * as constants from '@nutela/shared/app-global';

@Component({
  selector: 'x365-ss-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.scss']
})
export class BaseLayoutComponent implements OnInit {
  appBarHeight = constants.APP_BAR_HEIGHT + 'px';
  appNavigationGutter = constants.APP_NAVIGATON_GUTTER + 'px';
  appNavigationHeight =
    'calc(100% - ' + this.appBarHeight + constants.APP_NAVIGATON_GUTTER + 'px)';

  constructor() {}

  ngOnInit() {}
}
