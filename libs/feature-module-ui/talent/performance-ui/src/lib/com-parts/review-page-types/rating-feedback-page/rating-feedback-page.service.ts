import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/internal/Observable';

import { ApiService } from '@nutela/core-services';
import { IApiResult } from '@nutela/models/core-data';
import { IReviewPageParameter } from '../../../models';
import { RoleTypes } from '../../../enumerations';
import { RATING_FEEDBACK_PAGE_DATA_URLs } from '../../../constants';

@Injectable({
  providedIn: 'root'
})
export class RatingFeedbackPageService {

  constructor(private apiService: ApiService) { }

  getData(parameter: IReviewPageParameter, planId: number): Observable<IApiResult> {
    return this.apiService.read(this.getDataUrl(parameter, parameter.role, planId, ''));
  }

  getDataBySupervisor(parameter: IReviewPageParameter, planId: number, selectedSupervisorId: string): Observable<IApiResult> {
    return this.apiService.read(this.getDataUrl(parameter, parameter.role, planId, selectedSupervisorId));
  }

  getPageData(parameter: IReviewPageParameter, pageId: number): Observable<IApiResult> {
    return this.apiService.read(this.getPageDataUrl(parameter, parameter.role, pageId));
  }

  getSupervisors(parameter: IReviewPageParameter, planId: number): Observable<IApiResult> {
    return this.apiService.read(this.getSupervisorUrl(parameter, parameter.role, planId));
  }

  saveAndContinue(parameter: IReviewPageParameter, planId: number, body: any): Observable<IApiResult> {
    // console.log(this.getSaveAndContinueUrl(parameter, parameter.role, planId));

    return this.apiService.update(this.getSaveAndContinueUrl(parameter, parameter.role, planId), body);
  }

  completeSection(parameter: IReviewPageParameter, pageId: number, planId: number): Observable<IApiResult> {
    // console.log('completeSection - Rating---888', this.getCompleteSectionUrl(parameter, parameter.role, pageId, planId));

    return this.apiService.update(this.getCompleteSectionUrl(parameter, parameter.role, pageId, planId), {});
  }

  private getSaveAndContinueUrl(parameter: IReviewPageParameter, roleType: number, planId: number): string {
    const assetId = parameter.assetId;
    let employeeId = 0;

    if (parameter.reviewForm && parameter.reviewForm.EmployeeInfo) {
      employeeId = parameter.reviewForm.EmployeeInfo.employee_id;
    }

    switch (roleType) {
      case RoleTypes.EMPLOYEE:
        // console.log('getSaveAndContinueUrl', `${RATING_PAGE_DATA_URLs.saveAndContinue}/${planId}/${assetId}`);

        return `${RATING_FEEDBACK_PAGE_DATA_URLs.saveAndContinue}/${planId}/${assetId}`;
      case RoleTypes.LINE_MANAGER:
        return `${RATING_FEEDBACK_PAGE_DATA_URLs.lineManagerSaveAndContinue}/${employeeId}/${planId}/${assetId}`; //
      case RoleTypes.EMPLOYEE_ACCEPT_REJECT:
        return ``;
      case RoleTypes.REVIEWER_ASSESSING:
        return `${RATING_FEEDBACK_PAGE_DATA_URLs.lineManagerTwoSaveAndContinue}/${employeeId}/${planId}/${assetId}`; //
      case RoleTypes.REVIEWER_REVIEWING:
        return ``;
      case RoleTypes.MODERATION:
        return ``;
      case RoleTypes.HR:
        return ``;
    }
  }

  private getCompleteSectionUrl(parameter: IReviewPageParameter, roleType: number, pageId: number, planId: number): string {
    let employeeId = 0;

    if (parameter.reviewForm && parameter.reviewForm.EmployeeInfo) {
      employeeId = parameter.reviewForm.EmployeeInfo.employee_id;
    }

    switch (roleType) {
      case RoleTypes.EMPLOYEE:
        return `${RATING_FEEDBACK_PAGE_DATA_URLs.completeSection}/${pageId}/${planId}`;
      case RoleTypes.LINE_MANAGER:
        return `${RATING_FEEDBACK_PAGE_DATA_URLs.lineManagerCompleteSection}/${pageId}/${planId}/${employeeId}`;
      case RoleTypes.EMPLOYEE_ACCEPT_REJECT:
        return ``;
      case RoleTypes.REVIEWER_ASSESSING:
        return `${RATING_FEEDBACK_PAGE_DATA_URLs.lineManagerTwoCompleteSection}/${pageId}/${planId}/${employeeId}`;
      case RoleTypes.REVIEWER_REVIEWING:
        return ``;
      case RoleTypes.MODERATION:
        return ``;
      case RoleTypes.HR:
        return ``;
    }
  }

  private getDataUrl(parameter: IReviewPageParameter, roleType: number, planId: number, selectedSupervisorId: string): string {
    const assetId = parameter.assetId;
    let employeeId = 0;

    if (parameter.reviewForm && parameter.reviewForm.EmployeeInfo) {
      employeeId = parameter.reviewForm.EmployeeInfo.employee_id;
    }

    switch (roleType) {
      case RoleTypes.EMPLOYEE:
        return `${RATING_FEEDBACK_PAGE_DATA_URLs.data}/${planId}/${assetId}`;
      case RoleTypes.LINE_MANAGER:
        return `${RATING_FEEDBACK_PAGE_DATA_URLs.lineManagerData}/${employeeId}/${planId}/${assetId}`;
      case RoleTypes.EMPLOYEE_ACCEPT_REJECT:
        if (selectedSupervisorId === '0') {
          return `${RATING_FEEDBACK_PAGE_DATA_URLs.acceptRejectAllData}/${planId}/${assetId}`;
        } else {
          return `${RATING_FEEDBACK_PAGE_DATA_URLs.acceptRejectDataByLineManager}/${selectedSupervisorId}/${planId}/${assetId}`;
        }
      case RoleTypes.REVIEWER_ASSESSING:
        return `${RATING_FEEDBACK_PAGE_DATA_URLs.lineManagerData}/${employeeId}/${planId}/${assetId}`;
      case RoleTypes.REVIEWER_REVIEWING:
        if (selectedSupervisorId === '0') {
          return `${RATING_FEEDBACK_PAGE_DATA_URLs.reviewerAllData}/${employeeId}/${planId}/${assetId}`;
        } else {
          return `${RATING_FEEDBACK_PAGE_DATA_URLs.reviewerDataByLineManager}/${employeeId}/${planId}/${selectedSupervisorId}/${assetId}`;
        }
      case RoleTypes.MODERATION:
        if (selectedSupervisorId === '' || selectedSupervisorId === '0') {
          return `${RATING_FEEDBACK_PAGE_DATA_URLs.moderatorAllData}/${employeeId}/${planId}/${assetId}`;
        } else {
          return `${RATING_FEEDBACK_PAGE_DATA_URLs.moderatorDataByLineManager}/${employeeId}/${planId}/${selectedSupervisorId}/${assetId}`;
        }
      case RoleTypes.HR:
        if (selectedSupervisorId === '' || selectedSupervisorId === '0') {
          return `${RATING_FEEDBACK_PAGE_DATA_URLs.hrAllData}/${employeeId}/${planId}/${assetId}`;
        } else {
          return `${RATING_FEEDBACK_PAGE_DATA_URLs.hrDataByLineManager}/${employeeId}/${planId}/${selectedSupervisorId}/${assetId}`;
        }
    }
  }

  private getPageDataUrl(parameter: IReviewPageParameter, roleType: number, pageId: number): string {
    let employeeId = 0;

    if (parameter.reviewForm && parameter.reviewForm.EmployeeInfo) {
      employeeId = parameter.reviewForm.EmployeeInfo.employee_id;
    }

    switch (roleType) {
      case RoleTypes.EMPLOYEE:
        return `${RATING_FEEDBACK_PAGE_DATA_URLs.pageData}/${pageId}`;
      case RoleTypes.LINE_MANAGER:
        return `${RATING_FEEDBACK_PAGE_DATA_URLs.lineManagerPageData}/${employeeId}/${pageId}`;
      case RoleTypes.EMPLOYEE_ACCEPT_REJECT:
        return `${RATING_FEEDBACK_PAGE_DATA_URLs.pageData}/${pageId}`;
      case RoleTypes.REVIEWER_ASSESSING:
        return `${RATING_FEEDBACK_PAGE_DATA_URLs.lineManagerTwoPageData}/${employeeId}/${pageId}`;
      case RoleTypes.REVIEWER_REVIEWING:
        return `${RATING_FEEDBACK_PAGE_DATA_URLs.reviewerPageData}/${employeeId}/${pageId}`;
      case RoleTypes.MODERATION:
        return `${RATING_FEEDBACK_PAGE_DATA_URLs.moderatorPageData}/${employeeId}/${pageId}`;
      case RoleTypes.HR:
        return `${RATING_FEEDBACK_PAGE_DATA_URLs.hrPageData}/${employeeId}/${pageId}`;
    }
  }

  private getSupervisorUrl(parameter: IReviewPageParameter, roleType: number, planId: number): string {
    let employeeId = 0;

    if (parameter.reviewForm && parameter.reviewForm.EmployeeInfo) {
      employeeId = parameter.reviewForm.EmployeeInfo.employee_id;
    }

    switch (roleType) {
      case RoleTypes.EMPLOYEE:
        return ``;
      case RoleTypes.LINE_MANAGER:
        return ``;
      case RoleTypes.EMPLOYEE_ACCEPT_REJECT:
        return `${RATING_FEEDBACK_PAGE_DATA_URLs.supervisors}/${planId}`;
      case RoleTypes.REVIEWER_ASSESSING:
        return ``;
      case RoleTypes.REVIEWER_REVIEWING:
        return `${RATING_FEEDBACK_PAGE_DATA_URLs.reviewerSupervisors}/${planId}/${employeeId}`;
      case RoleTypes.MODERATION:
        return `${RATING_FEEDBACK_PAGE_DATA_URLs.reviewerSupervisors}/${planId}/${employeeId}`;
      case RoleTypes.HR:
        return `${RATING_FEEDBACK_PAGE_DATA_URLs.reviewerSupervisors}/${planId}/${employeeId}`;
    }
  }
}
