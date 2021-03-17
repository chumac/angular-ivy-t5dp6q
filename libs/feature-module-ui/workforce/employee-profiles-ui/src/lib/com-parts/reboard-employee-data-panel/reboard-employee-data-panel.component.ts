import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { IName } from '@nutela/models/core-data';
import { UtilService } from '@nutela/core-services';
import { IComprehensiveData } from '@nutela/models/workforce/employee-profiles';

@Component({
  selector: 'x365-fm-workforce-reboard-employee-data-panel',
  templateUrl: './reboard-employee-data-panel.component.html',
  styleUrls: ['./reboard-employee-data-panel.component.scss'],
})
export class ReboardEmployeeDataPanelComponent implements OnInit {
  @Input() public data: IComprehensiveData = null;
  @Input() public employeePhoto: any = null;
  @Input() public reportsToEmployeePhoto: any = null;
  @Input() public employeeReboardDetails: any = null;

  progressType: string;

  constructor(public utilService: UtilService) {}

  ngOnInit() { }

  get fullname(): IName {
    if (this.data && !(Object.keys(this.data).length === 0)) {
      return this.utilService.getEmployeeFullName(this.data.title, this.data.employee_firstname, this.data.employee_surname, this.data.employee_midname);
    } else {
      return null;
    }
  }

  getClass(isProgress: boolean): string {
    if (this.employeeReboardDetails) {
      switch (this.employeeReboardDetails.status) {
        case 1:
          return isProgress ? 'primary' : 'badge-primary'
        case 2:
          return isProgress ? 'secondary' : 'badge-secondary'
        case 3:
          return isProgress ? 'info' : 'badge-info'
        case 4:
          return isProgress ? 'success' : 'badge-success'
        case 5:
          return isProgress ? 'danger' : 'badge-danger'
        default:
          return isProgress ? 'default' : 'badge-default'
      }
    } else {
      return ''
    }
  }

  getProgressType(): string {
    switch (this.data.reboard_mode) {
      case 0:
        return 'badge-default'
      case 1:
        return 'badge-primary'
      case 2:
        return 'badge-secondary'
      case 3:
        return 'badge-info'
      case 4:
        return 'badge-success'
      default:
        return 'badge-default'
    }
  }
  get phoneNumber(): string {
    const data = this.data;

    if (data) {
      if (this.data.phone != null || this.data.phone === '') {
        return this.data.phone;
      }

      if (this.data.mobile_phone != null || this.data.mobile_phone === '') {
        return this.data.mobile_phone;
      }

      if (this.data.gsm != null || this.data.gsm === '') {
        return this.data.gsm;
      }
    }

    return '';
  }
  get kudos(): string {
    if (this.data.store_kudos > 0) {
      return this.data.store_kudos.toString();
    } else {
      return 'None';
    }
  }
}

export interface IData {
  name: string;
  image: any;
  phoneNumber: string;
  email: string;
  officeEmail: string;
  position: string;
  grade: string;
  placeInCorp: string;
  totalKudos: string;
  lengthOfService: string;
  employmentDate: string;
  facebookDetails?: ISocialMedia;
  googlePlusDetails?: ISocialMedia;
  linkedInDetails?: ISocialMedia;
  twitterDetails?: ISocialMedia;
}

export interface ISocialMedia {
  name: string;
  url: string;
}
