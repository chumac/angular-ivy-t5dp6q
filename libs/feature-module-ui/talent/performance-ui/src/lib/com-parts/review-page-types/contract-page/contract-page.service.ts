import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/internal/Observable';

import { ApiService } from '@nutela/core-services';
import { IApiResult } from '@nutela/models/core-data';
import { IReviewPageParameter } from '../../../models';
import { RoleTypes } from '../../../enumerations';
import { CONTRACT_PAGE_DATA_URLs } from '../../../constants';
import { IReviewContractPage } from '@nutela/models/talent/performance';

@Injectable({
  providedIn: 'root'
})
export class ContractPageService {
  data: IReviewContractPage;

  constructor(private apiService: ApiService) { }

  getData(parameter: IReviewPageParameter, pageId: number): Observable<IApiResult> {
    return this.apiService.read(this.getDataUrl(parameter, parameter.role, pageId));
  }

  completeSection(parameter: IReviewPageParameter, pageId: number, body: any): Observable<IApiResult> {
    return this.apiService.create(this.getCompleteSectionUrl(parameter.role, pageId), body);
  }

  private getCompleteSectionUrl(roleType: number, pageId: number): string {
    switch (roleType) {
      case RoleTypes.EMPLOYEE:
        return `${CONTRACT_PAGE_DATA_URLs.completeSection}/${pageId}`;
      case RoleTypes.LINE_MANAGER:
        return ``;
      case RoleTypes.EMPLOYEE_ACCEPT_REJECT:
        return ``;
      case RoleTypes.REVIEWER_ASSESSING:
        return ``;
      case RoleTypes.REVIEWER_REVIEWING:
        return ``;
      case RoleTypes.MODERATION:
        return ``;
      case RoleTypes.HR:
        return ``;
    }
  }

  private getDataUrl(parameter: IReviewPageParameter, roleType: number, pageId: number): string {
    let employeeId = 0;
    let planId = 0;

    if (parameter.reviewForm && parameter.reviewForm.EmployeeInfo) {
      employeeId = parameter.reviewForm.EmployeeInfo.employee_id;
    }

    if (parameter.reviewForm && parameter.reviewForm.PlanningInfo) {
      planId = parameter.reviewForm.PlanningInfo.id;
    }

    switch (roleType) {
      case RoleTypes.EMPLOYEE:
        return `${CONTRACT_PAGE_DATA_URLs.data}/${pageId}`;
      case RoleTypes.LINE_MANAGER:
        return `${CONTRACT_PAGE_DATA_URLs.lineManagerData}/${employeeId}/${planId}`;
      case RoleTypes.EMPLOYEE_ACCEPT_REJECT:
        return `${CONTRACT_PAGE_DATA_URLs.acceptRejectData}/${employeeId}/${planId}`;
      case RoleTypes.REVIEWER_ASSESSING:
        return ``;
      case RoleTypes.REVIEWER_REVIEWING:
        return `${CONTRACT_PAGE_DATA_URLs.reviewerData}/${employeeId}/${planId}`;
      case RoleTypes.MODERATION:
        return `${CONTRACT_PAGE_DATA_URLs.moderationData}/${employeeId}/${planId}`;
      case RoleTypes.HR:
        return `${CONTRACT_PAGE_DATA_URLs.hrData}/${employeeId}/${planId}`;
    }
  }



}
