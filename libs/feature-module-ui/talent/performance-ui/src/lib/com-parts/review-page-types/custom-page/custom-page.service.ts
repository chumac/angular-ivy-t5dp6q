import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/internal/Observable';

import { ApiService } from '@nutela/core-services';
import { IApiResult, IFormSectionData } from '@nutela/models/core-data';
import { IReviewPageParameter } from '../../../models';
import { RoleTypes } from '../../../enumerations';
import { KPI_PAGE_DATA_URLs } from '../../../constants';
import { IEmployeeReviewForm, IReviewCustomPage } from '@nutela/models/talent/performance';
import { CUSTOM_PAGE_DATA_URLs } from '../../../constants/api-urls/custom-page.constants';

@Injectable({
  providedIn: 'root'
})
export class CustomPageService {
  data: IReviewCustomPage[];
  pageData: IEmployeeReviewForm;
  rowData: IFormSectionData[];

  constructor(private apiService: ApiService) { }

  getData(parameter: IReviewPageParameter, planId: number): Observable<IApiResult> {
    return this.apiService.read(this.getDataUrl(parameter.role, planId));
  }

  getPageData(parameter: IReviewPageParameter, pageId: number): Observable<IApiResult> {
    return this.apiService.read(this.getPageDataUrl(parameter.role, pageId));
  }

  saveAndContinue(parameter: IReviewPageParameter, planId: number, body: any): Observable<IApiResult> {
    return this.apiService.update(this.getSaveAndContinueUrl(parameter.role, planId), body);
  }

  completeSection(parameter: IReviewPageParameter, pageId: number, planId: number): Observable<IApiResult> {
    return this.apiService.update(this.getCompleteSectionUrl(parameter.role, pageId, planId), {});
  }

  private getSaveAndContinueUrl(roleType: number, planId: number): string {
    switch (roleType) {
      case RoleTypes.EMPLOYEE:
        return `${CUSTOM_PAGE_DATA_URLs.saveAndContinue}/${planId}`;
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

  private getCompleteSectionUrl(roleType: number, pageId: number, planId: number): string {
    switch (roleType) {
      case RoleTypes.EMPLOYEE:
        return `${CUSTOM_PAGE_DATA_URLs.completeSection}/${pageId}/${planId}`;
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

  private getDataUrl(roleType: number, planId: number): string {
    switch (roleType) {
      case RoleTypes.EMPLOYEE:
        return `${CUSTOM_PAGE_DATA_URLs.data}/${planId}`;
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

  private getPageDataUrl(roleType: number, pageId: number): string {
    switch (roleType) {
      case RoleTypes.EMPLOYEE:
        return `${KPI_PAGE_DATA_URLs.pageData}/${pageId}`;
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

}
