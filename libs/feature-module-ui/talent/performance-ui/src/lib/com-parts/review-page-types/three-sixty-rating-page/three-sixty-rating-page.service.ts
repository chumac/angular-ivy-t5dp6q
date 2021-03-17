import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/internal/Observable';

import { ApiService } from '@nutela/core-services';
import { IApiResult, ISelectOption } from '@nutela/models/core-data';
import { IReviewPageParameter, IThreeSixtyRatingRowData } from '../../../models';
import { RoleTypes } from '../../../enumerations';
import { THREE_SIXTY_RATING_PAGE_DATA_URLs } from '../../../constants';
import { IEmployeeReviewForm, IReviewRatingPage } from '@nutela/models/talent/performance';

@Injectable({
  providedIn: 'root'
})
export class ThreeSixtyRatingPageService {
  data: IReviewRatingPage[];
  pageData: IEmployeeReviewForm;
  rowDataMap = new Map<string, IThreeSixtyRatingRowData[]>();
  rowDataEmployee: IThreeSixtyRatingRowData[];

  previousRowData: IThreeSixtyRatingRowData[];

  reviewPeers: ISelectOption[];

  constructor(private apiService: ApiService) { }

  rowData(peerId: string): IThreeSixtyRatingRowData[]{
    return this.rowDataMap[peerId];
  }

  getData(parameter: IReviewPageParameter, planId: number, peerId: string): Observable<IApiResult> {
    return this.apiService.read(this.getDataUrl(parameter, parameter.role, planId, peerId));
  }

  getPageData(parameter: IReviewPageParameter, pageId: number): Observable<IApiResult> {
    return this.apiService.read(this.getPageDataUrl(parameter, parameter.role, pageId));
  }

  getReviewPeers(parameter: IReviewPageParameter): Observable<IApiResult> {
    return this.apiService.read(this.getPeerDataUrl(parameter.role));
  }

  saveAndContinue(parameter: IReviewPageParameter, planId: number, peerId: string, body: any): Observable<IApiResult> {
    return this.apiService.update(this.getSaveAndContinueUrl(parameter.role, planId, peerId), body);
  }

  completeSection(parameter: IReviewPageParameter, pageId: number, planId: number): Observable<IApiResult> {
    return this.apiService.update(this.getCompleteSectionUrl(parameter, pageId, planId), {});
  }

  private getSaveAndContinueUrl(roleType: number, planId: number, peerId: string): string {
    switch (roleType) {
      case RoleTypes.EMPLOYEE:
        return `${THREE_SIXTY_RATING_PAGE_DATA_URLs.saveAndContinue}?planID=${planId}&employeeID=${peerId}`;
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

  private getCompleteSectionUrl(parameter: IReviewPageParameter, pageId: number, planId: number): string {
    const employeeInfo = parameter.reviewForm.EmployeeInfo;

    switch (parameter.role) {
      case RoleTypes.EMPLOYEE:
        // console.log(`${THREE_SIXTY_RATING_PAGE_DATA_URLs.completeSection}?employeeID=${employeeInfo.employee_id}&pageID=${pageId}&planID=${planId}`);

        return `${THREE_SIXTY_RATING_PAGE_DATA_URLs.completeSection}?employeeID=${employeeInfo.employee_id}&pageID=${pageId}&planID=${planId}`;
        // return `${THREE_SIXTY_RATING_PAGE_DATA_URLs.completeSection}/${pageId}/${planId}`;
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

  private getDataUrl(parameter: IReviewPageParameter, roleType: number, planId: number, peerId: string): string {
    let employeeId = 0;

    if (parameter.reviewForm && parameter.reviewForm.EmployeeInfo) {
      employeeId = parameter.reviewForm.EmployeeInfo.employee_id;
    }

    switch (roleType) {
      case RoleTypes.EMPLOYEE:
        return `${THREE_SIXTY_RATING_PAGE_DATA_URLs.data}/${peerId}/${planId}`;
      case RoleTypes.LINE_MANAGER:
        return `${THREE_SIXTY_RATING_PAGE_DATA_URLs.lineManagerData}/${employeeId}/${planId}`;
      case RoleTypes.EMPLOYEE_ACCEPT_REJECT:
        return `${THREE_SIXTY_RATING_PAGE_DATA_URLs.acceptRejectData}/${planId}`;
      case RoleTypes.REVIEWER_ASSESSING:
        return ``;
      case RoleTypes.REVIEWER_REVIEWING:
        return `${THREE_SIXTY_RATING_PAGE_DATA_URLs.reviewerData}/${employeeId}/${planId}`;
      case RoleTypes.MODERATION:
        return `${THREE_SIXTY_RATING_PAGE_DATA_URLs.moderatorData}/${employeeId}/${planId}`;
      case RoleTypes.HR:
        return `${THREE_SIXTY_RATING_PAGE_DATA_URLs.hrData}/${employeeId}/${planId}`;
    }
  }

  private getPeerDataUrl(roleType: number): string {
    switch (roleType) {
      case RoleTypes.EMPLOYEE:
        return `${THREE_SIXTY_RATING_PAGE_DATA_URLs.peerData}`;
      case RoleTypes.LINE_MANAGER:
      return `${THREE_SIXTY_RATING_PAGE_DATA_URLs.peerData}`;
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

  private getPageDataUrl(parameter: IReviewPageParameter, roleType: number, pageId: number): string {
    let employeeId = 0;

    if (parameter.reviewForm && parameter.reviewForm.EmployeeInfo) {
      employeeId = parameter.reviewForm.EmployeeInfo.employee_id;
    }

    switch (roleType) {
      case RoleTypes.EMPLOYEE:
        return `${THREE_SIXTY_RATING_PAGE_DATA_URLs.pageData}/${pageId}`;
      case RoleTypes.LINE_MANAGER:
        return `${THREE_SIXTY_RATING_PAGE_DATA_URLs.lineManagerPageData}/${employeeId}/${pageId}`;
      case RoleTypes.EMPLOYEE_ACCEPT_REJECT:
        return `${THREE_SIXTY_RATING_PAGE_DATA_URLs.pageData}/${pageId}`;
      case RoleTypes.REVIEWER_ASSESSING:
        return ``;
      case RoleTypes.REVIEWER_REVIEWING:
        return `${THREE_SIXTY_RATING_PAGE_DATA_URLs.reviewerPageData}/${employeeId}/${pageId}`;
      case RoleTypes.MODERATION:
        return `${THREE_SIXTY_RATING_PAGE_DATA_URLs.moderatorPageData}/${employeeId}/${pageId}`;
      case RoleTypes.HR:
        return `${THREE_SIXTY_RATING_PAGE_DATA_URLs.hrPageData}/${employeeId}/${pageId}`;
    }
  }

}
