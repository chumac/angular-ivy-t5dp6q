import { Component, OnInit, Input } from '@angular/core';
 
import { Store, select } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';
import { IControl } from '@nutela/models/talent/performance';
import { IAppState } from '@nutela/store/app-state';
import { HideViewerControl } from '../../../../store';
import * as constants from '../../../../constants';


@Component({
  selector: 'x365-fm-talent-controls-viewer',
  templateUrl: './controls-viewer.component.html',
  styleUrls: ['./controls-viewer.component.scss']
})
export class ControlsViewerComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IControl;

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
    this.store.dispatch(new HideViewerControl());
  }
  
}
