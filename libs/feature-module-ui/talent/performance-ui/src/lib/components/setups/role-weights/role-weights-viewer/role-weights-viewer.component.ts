import { Component, OnInit, Input } from '@angular/core';
 
import { Store, select } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';
import { IRoleWeight } from '@nutela/models/talent/performance';
import { IAppState } from '@nutela/store/app-state';
import { HideViewerRoleWeight } from '../../../../store';


@Component({
  selector: 'x365-fm-talent-role-weights-viewer',
  templateUrl: './role-weights-viewer.component.html',
  styleUrls: ['./role-weights-viewer.component.scss']
})
export class RoleWeightsViewerComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IRoleWeight;

  constructor(
    public utilService: UtilService,
    private store: Store<IAppState>
  ) {}

  ngOnInit() {
  } 

  onDoneClicked() {
    this.store.dispatch(new HideViewerRoleWeight());
  }
  
}
