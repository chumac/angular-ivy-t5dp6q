import { Component, OnInit, Input } from '@angular/core';
 
import { Store } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';
import { ICustomUserGroup } from '@nutela/models/workforce/employee-profiles';
import { IAppState } from '@nutela/store/app-state';
import { HideViewerCustomUserGroup } from '../../../../../store/hr-transactions/custom-user-group';


@Component({
  selector: 'x365-fm-workforce-custom-user-groups-viewer',
  templateUrl: './custom-user-groups-viewer.component.html',
  styleUrls: ['./custom-user-groups-viewer.component.scss']
})
export class CustomUserGroupsViewerComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: ICustomUserGroup;

  constructor(
    public utilService: UtilService,
    private store: Store<IAppState> 
  ) {}

  ngOnInit() {
  } 

  onDoneClicked() {
    this.store.dispatch(new HideViewerCustomUserGroup());
  }
  
}
