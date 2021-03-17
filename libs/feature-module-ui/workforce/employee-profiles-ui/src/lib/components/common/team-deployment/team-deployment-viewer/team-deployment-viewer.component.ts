import { Component, OnInit, Input } from '@angular/core';
import { UtilService } from '@nutela/core-services';
import { IAppState } from '@nutela/store/app-state';
import { Store } from '@ngrx/store';
import { HideViewerTeamDeployment } from '../../../../store/team-deployments';
import { ITeamDeployment } from '@nutela/models/workforce/employee-profiles';

@Component({
  selector: 'x365-fm-workforce-team-deployment-viewer',
  templateUrl: './team-deployment-viewer.component.html',
  styleUrls: ['./team-deployment-viewer.component.scss']
})
export class TeamDeploymentViewerComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public type: number;

  @Input() public data: any;
  constructor(public utilService: UtilService, private store: Store<IAppState>) { }

  ngOnInit() {
  }

  onDoneClicked() {
    this.store.dispatch(new HideViewerTeamDeployment());
  }

}
