import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/internal/Observable';

import { ApiService } from '@nutela/core-services';
import { IApiResult, ISelectOption } from '@nutela/models/core-data';
import { IReviewPageParameter, IKPIRowData } from '../../../models';
import { RoleTypes } from '../../../enumerations';
import { KPI_PAGE_DATA_URLs } from '../../../constants';
import { IReviewKPIPage, IObjectiveRating, IPerspective, IEmployeeReviewForm, IReviewer } from '@nutela/models/talent/performance';

@Injectable({
  providedIn: 'root'
})
export class KPIPageService {
  data: IReviewKPIPage[];
  pageData: IEmployeeReviewForm;
  rowData: IKPIRowData[];
  previousRowData: IKPIRowData[];

  perspectives: IPerspective[];
  valueLabelPerspectives: ISelectOption[];

  ratings: IObjectiveRating[];
  valueLabelRatings: ISelectOption[];

  supervisors: IReviewer[];
  valueLabelSupervisors: ISelectOption[];

  constructor(private apiService: ApiService) { }

  getPerspectives(): Observable<IApiResult> {
    return this.apiService.read(`${KPI_PAGE_DATA_URLs.perspectives}`);
  }

  getRatings(): Observable<IApiResult> {
    return this.apiService.read(`${KPI_PAGE_DATA_URLs.ratings}`);
  }

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
    return this.apiService.update(this.getSaveAndContinueUrl(parameter, parameter.role, planId), body);
  }

  completeSection(parameter: IReviewPageParameter, pageId: number, planId: number): Observable<IApiResult> {
    // console.log('KPI-completeSection url ', this.getCompleteSectionUrl(parameter, parameter.role, pageId, planId));
    return this.apiService.update(this.getCompleteSectionUrl(parameter, parameter.role, pageId, planId), {});
  }

  
  reOpenCompletedSection(pageId: number, employeeId: number, planId: number): Observable<IApiResult> {
    return this.apiService.read(this.reOpenCompletedSectionService(pageId, employeeId, planId));
  }

  private getSaveAndContinueUrl(parameter: IReviewPageParameter, roleType: number, planId: number): string {
    let employeeId = 0;

    if (parameter.reviewForm && parameter.reviewForm.EmployeeInfo) {
      employeeId = parameter.reviewForm.EmployeeInfo.employee_id;
    }

    switch (roleType) {
      case RoleTypes.EMPLOYEE:
        return `${KPI_PAGE_DATA_URLs.saveAndContinue}/${planId}`;
      case RoleTypes.LINE_MANAGER:
        return `${KPI_PAGE_DATA_URLs.lineManagerSaveAndContinue}/${employeeId}/${planId}`;
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

  private getCompleteSectionUrl(parameter: IReviewPageParameter, roleType: number, pageId: number, planId: number): string {
    let employeeId = 0;

    if (parameter.reviewForm && parameter.reviewForm.EmployeeInfo) {
      employeeId = parameter.reviewForm.EmployeeInfo.employee_id;
    }

    switch (roleType) {
      case RoleTypes.EMPLOYEE:
        return `${KPI_PAGE_DATA_URLs.completeSection}/${pageId}/${planId}`;
      case RoleTypes.LINE_MANAGER:
        return `${KPI_PAGE_DATA_URLs.lineManagerCompleteSection}/${employeeId}/${planId}/${pageId}`;
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

  private getDataUrl(parameter: IReviewPageParameter, roleType: number, planId: number, selectedSupervisorId: string): string {
    let employeeId = 0;

    if (parameter.reviewForm && parameter.reviewForm.EmployeeInfo) {
      employeeId = parameter.reviewForm.EmployeeInfo.employee_id;
    }

    switch (roleType) {
      case RoleTypes.EMPLOYEE:
        return `${KPI_PAGE_DATA_URLs.data}/${planId}`;
      case RoleTypes.LINE_MANAGER:
        return `${KPI_PAGE_DATA_URLs.lineManagerData}/${employeeId}/${planId}`;
      case RoleTypes.EMPLOYEE_ACCEPT_REJECT:
        if (selectedSupervisorId === '0') {
          return `${KPI_PAGE_DATA_URLs.acceptRejectAllData}/${planId}`;
        } else {
          return `${KPI_PAGE_DATA_URLs.acceptRejectDataByLineManager}/${selectedSupervisorId}/${planId}`;
        }
      case RoleTypes.REVIEWER_ASSESSING:
        return ``;
      case RoleTypes.REVIEWER_REVIEWING:
        if (selectedSupervisorId === '0') {
          return `${KPI_PAGE_DATA_URLs.reviewerAllData}/${employeeId}/${planId}`;
        } else {
          return `${KPI_PAGE_DATA_URLs.reviewerDataByLineManager}/${employeeId}/${planId}/${selectedSupervisorId}`;
        }
      case RoleTypes.MODERATION:
        if (selectedSupervisorId === '0') {
          return `${KPI_PAGE_DATA_URLs.moderatorAllData}/${employeeId}/${planId}`;
        } else {
          return `${KPI_PAGE_DATA_URLs.moderatorDataByLineManager}/${employeeId}/${planId}/${selectedSupervisorId}`;
        }
      case RoleTypes.HR:
        if (selectedSupervisorId === '0') {
          return `${KPI_PAGE_DATA_URLs.hrAllData}/${employeeId}/${planId}`;
        } else {
          return `${KPI_PAGE_DATA_URLs.hrDataByLineManager}/${employeeId}/${planId}/${selectedSupervisorId}`;
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
        return `${KPI_PAGE_DATA_URLs.pageData}/${pageId}`;
      case RoleTypes.LINE_MANAGER:
        return `${KPI_PAGE_DATA_URLs.lineManagerPageData}/${employeeId}/${pageId}`;
      case RoleTypes.EMPLOYEE_ACCEPT_REJECT:
        return `${KPI_PAGE_DATA_URLs.acceptRejectPageData}/${pageId}`;
      case RoleTypes.REVIEWER_ASSESSING:
        return ``;
      case RoleTypes.REVIEWER_REVIEWING:
        return `${KPI_PAGE_DATA_URLs.reviewerPageData}/${employeeId}/${pageId}`;
      case RoleTypes.MODERATION:
        return `${KPI_PAGE_DATA_URLs.moderatorPageData}/${employeeId}/${pageId}`;
      case RoleTypes.HR:
        return `${KPI_PAGE_DATA_URLs.hrPageData}/${employeeId}/${pageId}`;
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
        return `${KPI_PAGE_DATA_URLs.supervisors}/${planId}`;
      case RoleTypes.REVIEWER_ASSESSING:
        return ``;
      case RoleTypes.REVIEWER_REVIEWING:
        return `${KPI_PAGE_DATA_URLs.reviewerSupervisors}/${planId}/${employeeId}`;
      case RoleTypes.MODERATION:
        return `${KPI_PAGE_DATA_URLs.reviewerSupervisors}/${planId}/${employeeId}`;
      case RoleTypes.HR:
        return `${KPI_PAGE_DATA_URLs.reviewerSupervisors}/${planId}/${employeeId}`;
    }
  }

  private reOpenCompletedSectionService(pageId, employeeId, planId): string {
    return `${KPI_PAGE_DATA_URLs.reOpenCompletedSection}/${pageId}/${employeeId}/${planId}`;
  }
}
