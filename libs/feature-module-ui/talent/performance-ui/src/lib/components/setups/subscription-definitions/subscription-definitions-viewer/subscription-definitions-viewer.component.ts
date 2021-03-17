import { Component, OnInit, Input } from '@angular/core';
 
import { Store, select } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';
import { ISubscriptionDefinition } from '@nutela/models/talent/performance';
import { IAppState } from '@nutela/store/app-state';
import { HideViewerSubscriptionDefinition } from '../../../../store';
import * as constants from '../../../../constants';


@Component({
  selector: 'x365-fm-talent-subscription-definitions-viewer',
  templateUrl: './subscription-definitions-viewer.component.html',
  styleUrls: ['./subscription-definitions-viewer.component.scss']
})
export class SubscriptionDefinitionsViewerComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: ISubscriptionDefinition;
  subscriptionOptions = constants.subscriptionOptions;

  constructor(
    public utilService: UtilService,
    private store: Store<IAppState>
  ) {}

  ngOnInit() {
  } 

  onDoneClicked() {
    this.store.dispatch(new HideViewerSubscriptionDefinition());
  }
  
}
