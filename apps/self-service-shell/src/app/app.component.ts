import { Component } from '@angular/core';

import * as constants from '@nutela/shared/app-global';
import { RouteEventsService } from '@nutela/core-services';

@Component({
  selector: 'x365-ss-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  appBarHeight = constants.APP_BAR_HEIGHT + 'px';
  appNavigationGutter = constants.APP_NAVIGATON_GUTTER + 'px';
  appNavigationHeight =
    'calc(100% - ' + this.appBarHeight + constants.APP_NAVIGATON_GUTTER + 'px)';

  // constructor(private routeEventsService: RouteEventsService) { }
}
