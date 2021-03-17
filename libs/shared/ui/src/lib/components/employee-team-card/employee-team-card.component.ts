import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GENERAL } from '@nutela/shared/app-global';
import { IPersonal, IProfilePicture } from '@nutela/models/workforce/employee-profiles';
import { IApiResult } from '@nutela/models/core-data';
import { MyTeamService } from 'libs/feature-module-ui/workforce/employee-profiles-ui/src/lib/components/my-team/my-team.service';
import { Store, select } from '@ngrx/store';
import { getComprehensiveData } from '@nutela/store/modules/workforce/employee-profiles';
import { IAppState } from '@nutela/store/app-state';

@Component({
  selector: 'x365-shared-ui-employee-team-card',
  templateUrl: './employee-team-card.component.html',
  styleUrls: ['./employee-team-card.component.scss']
})
export class EmployeeTeamCardComponent implements OnInit {

  loggedInUserId: number;

  @Input() data: IPersonal;
  @Input() public pictureData: any;
  @Input() public modeDrillDown = true;

  @Output() selectedEmployeeId: EventEmitter<number> = new EventEmitter();
  @Output() openTeamMembers: EventEmitter<number> = new EventEmitter();

  profileImages: string;
  public defaultAvatar: string = '/assets/images/profile-avatar.png';

  constructor(private myTeamService: MyTeamService, private store: Store<IAppState>) { }

  ngOnInit() {
    this.storeSelects();
    this.emitEmployeeId();
    this.getImages();
  }

  emitEmployeeId() {
    if (this.data) {
      this.selectedEmployeeId.emit(this.data.employee_id);
    }
  }

  storeSelects() {
    this.store.pipe(select(getComprehensiveData))
      .subscribe((data) => {
        this.loggedInUserId = data.employee_id;
      })
  }

  getImages() {
    this.myTeamService.getImages(this.data.employee_id).subscribe((img) => {
      if (img) {
        this.profileImages = img.image_profile;
      }
    });
  }

  get teamRole(): string {
    if (this.data.team_role === 0) {
      if (this.data.employee_id === this.loggedInUserId) {
        return "Me";
      } else {
        return "Focus";
      }
    } else if (this.data.team_role === 1) {
      return "Supervisor";
    } else if (this.data.team_role === 2) {
      return "Peer";
    } else if (this.data.team_role === 3) {
      return "Direct Report";
    }
  }

  get itsMe(): boolean {
    if (this.data.team_role === 0) {
      return true;
    }
    else {
      return false;
    }
  }

  onTeamMemberClicked(employeeID: number) {
    this.openTeamMembers.emit(employeeID);
  }

  get profilePicture(): string {
    if (this.profileImages) {
      return `${GENERAL.pngBase64Header}${this.profileImages}`;
    } else {
      return `${this.defaultAvatar}`;
    }
  }

  getStyles(): any {
    // const width = this.width || DEFAULT_SIZE;
    // const height = this.height || DEFAULT_SIZE;
    // const borderColor = this.borderColor || DEFAULT_BORDER_COLOR;
    // const borderRadius = this.isRounded ? '50%': '0';
    // const borderWidth = this.showBorder ? this.borderWidth || DEFAULT_BORDER_WIDTH: '0';

    // let backgroundImage: string;
    // if (this.src === null) {
    //   backgroundImage = this.avatarPath;
    // } else {
    //   backgroundImage = `url(${this.src})`;
    // }   // border: 1px solid #dee2e6;

    if (this.data.team_role === 0) {
      return this.getSelfStyles();
    } else if (this.data.team_role === 1) {
      return this.getSupervisorStyles();
    } else if (this.data.team_role === 2) {
      return this.getPeerStyles();
    } else if (this.data.team_role === 3) {
      return this.getDirectReportStyles();
    }
  }


  getSelfStyles(): any {
    return {
      borderColor: 'rgb(255, 149, 21)',
    }
  }

  getSupervisorStyles(): any {
    return {
      borderColor: 'rgb(140, 211, 35)',
    }
  }

  getPeerStyles(): any {
    return {
      borderColor: '#dee2e6',
    }
  }

  getDirectReportStyles(): any {
    return {
      borderColor: '#dee2e6',
    }
  }
}
