import { Component, OnInit, Input } from '@angular/core';
 
import { Store } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';
import { ICustomUserGroupSetup } from '@nutela/models/workforce/employee-profiles';
import { IAppState } from '@nutela/store/app-state';
import { HideViewerCustomUserGroupSetup } from '../../../../store/setups/custom-user-group';


@Component({
  selector: 'x365-fm-workforce-custom-user-group-setups-viewer',
  templateUrl: './custom-user-group-setups-viewer.component.html',
  styleUrls: ['./custom-user-group-setups-viewer.component.scss']
})
export class CustomUserGroupSetupsViewerComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: ICustomUserGroupSetup;

  constructor(
    public utilService: UtilService,
    private store: Store<IAppState>
  ) {}

  ngOnInit() {
  } 

  onDoneClicked() {
    this.store.dispatch(new HideViewerCustomUserGroupSetup());
  }
  
}
