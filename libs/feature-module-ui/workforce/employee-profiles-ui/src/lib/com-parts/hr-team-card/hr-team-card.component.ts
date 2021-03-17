import { Component, OnInit, Input } from '@angular/core';
import { ITeam } from '@nutela/models/workforce/employee-profiles';
import { GENERAL } from '@nutela/shared/app-global';

@Component({
  selector: 'x365-fm-workforce-hr-team-card',
  templateUrl: './hr-team-card.component.html',
  styleUrls: ['./hr-team-card.component.scss']
})
export class HrTeamCardComponent implements OnInit {

  @Input() data: ITeam;

  public defaultAvatar: string = '/assets/images/profile-avatar.png';

  constructor() {}

  ngOnInit() {}

  getProfilePicture(picture: string): string {
    return `${GENERAL.pngBase64Header}${picture}`;
  }

}
