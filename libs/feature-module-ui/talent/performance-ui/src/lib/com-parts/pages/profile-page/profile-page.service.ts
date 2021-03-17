import { Injectable } from '@angular/core';

import { ApiService } from '@nutela/core-services';
import { IProfilePage } from '@nutela/models/talent/performance';
import { IReviewPageParameter } from '../../../models';
import { Observable } from 'rxjs/internal/Observable';
import { IApiResult } from '@nutela/models/core-data';
import { RoleTypes } from '../../../enumerations';
import { PROFILE_PAGE_DATA_URLs } from '../../../constants';
import { IMAGE_URLs } from '@nutela/shared/app-global';

@Injectable({
  providedIn: 'root'
})
export class ProfilePageService {
  data: IProfilePage;
  employeePhoto: any = null;
  reportsToPhoto: any = null;

  constructor(private apiService: ApiService) { }

  getData(parameter: IReviewPageParameter, planId: number): Observable<IApiResult> {
    // console.log('getDataUrl', this.getDataUrl(parameter, parameter.role, planId));

    return this.apiService.read(this.getDataUrl(parameter, parameter.role, planId));
  }

  getPhoto(employeeId: number): Observable<IApiResult> {
    return this.apiService.read(`${IMAGE_URLs.profilePhoto}/${employeeId}`);
  }

  private getDataUrl(parameter: IReviewPageParameter, roleType: number, planId: number): string {
    let employeeId = 0;

    if (parameter.reviewForm && parameter.reviewForm.EmployeeInfo) {
      employeeId = parameter.reviewForm.EmployeeInfo.employee_id;
    }

    switch (roleType) {
      case RoleTypes.EMPLOYEE:
        return `${PROFILE_PAGE_DATA_URLs.data}/${planId}`;
      case RoleTypes.LINE_MANAGER:
        return `${PROFILE_PAGE_DATA_URLs.lineManagerData}/${employeeId}/${planId}`;
      case RoleTypes.EMPLOYEE_ACCEPT_REJECT:
        return `${PROFILE_PAGE_DATA_URLs.data}/${planId}`;
      case RoleTypes.REVIEWER_ASSESSING:
        return `${PROFILE_PAGE_DATA_URLs.lineManagerTwoData}/${employeeId}/${planId}`;
      case RoleTypes.REVIEWER_REVIEWING:
        return `${PROFILE_PAGE_DATA_URLs.reviewerData}/${employeeId}/${planId}`;
      case RoleTypes.MODERATION:
        return `${PROFILE_PAGE_DATA_URLs.moderatorData}/${employeeId}/${planId}`;
      case RoleTypes.HR:
        return `${PROFILE_PAGE_DATA_URLs.hrData}/${employeeId}/${planId}`;
    }
  }
}
