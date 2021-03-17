import { Component, OnInit, Input } from '@angular/core';
 
import { Store, select } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';
import { ISection } from '@nutela/models/talent/performance';
import { IAppState } from '@nutela/store/app-state';
import { HideViewerSection } from '../../../../store';
import * as constants from '../../../../constants';


@Component({
  selector: 'x365-fm-talent-sections-viewer',
  templateUrl: './sections-viewer.component.html',
  styleUrls: ['./sections-viewer.component.scss']
})
export class SectionsViewerComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: ISection;

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
    this.store.dispatch(new HideViewerSection());
  }
  
}
