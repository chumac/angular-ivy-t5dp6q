import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { IName } from '@nutela/models/core-data';
import { UtilService } from '@nutela/core-services';
import { IComprehensiveData } from '@nutela/models/workforce/employee-profiles';

@Component({
  selector: 'x365-fm-workforce-employee-data-panel',
  templateUrl: './employee-data-panel.component.html',
  styleUrls: ['./employee-data-panel.component.scss'],
})
export class EmployeeDataPanelComponent implements OnInit {
  @Input() public data: IComprehensiveData = null;

  @Input() public employeeName: IName = {employeeId: 0};
  @Input() public employeePhoto: any = null;
  @Input() public reportsToEmployeePhoto: any = null;

  constructor(public utilService: UtilService) {}

  ngOnInit() {
   }

  get fullname(): IName {
    if (this.data) {
      return this.utilService.getEmployeeFullName(this.data.title, this.data.employee_firstname, this.data.employee_surname, this.data.employee_midname);
    } else {
      return {employeeId: 0};
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
