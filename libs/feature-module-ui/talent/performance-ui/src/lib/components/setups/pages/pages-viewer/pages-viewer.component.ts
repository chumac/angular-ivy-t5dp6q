import { Component, OnInit, Input } from '@angular/core';
 
import { Store, select } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';
import { IPage } from '@nutela/models/talent/performance';
import { IAppState } from '@nutela/store/app-state';
import { HideViewerPage } from '../../../../store';
import * as constants from '../../../../constants';


@Component({
  selector: 'x365-fm-talent-pages-viewer',
  templateUrl: './pages-viewer.component.html',
  styleUrls: ['./pages-viewer.component.scss']
})
export class PagesViewerComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IPage;

  eligibilityRuleOptions = constants.eligibilityRuleOptions;
  assetOptions = constants.assetOptions;
  widgetOptions = constants.widgetOptions;
  permOptions = constants.permOptions;

  constructor(
    public utilService: UtilService,
    private store: Store<IAppState>
  ) {}

  ngOnInit() {
  } 

  onDoneClicked() {
    this.store.dispatch(new HideViewerPage());
  }
  
}
