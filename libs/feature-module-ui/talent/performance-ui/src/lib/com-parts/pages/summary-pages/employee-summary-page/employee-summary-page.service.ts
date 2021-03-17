import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/internal/Observable';

import { ApiService } from '@nutela/core-services';
import { IApiResult } from '@nutela/models/core-data';
import { IEmployeeReviewForm } from '@nutela/models/talent/performance';
import { RoleTypes } from '../../../../enumerations';
import { APPRAISAL_FORMS_DATA_URLs, EMPLOYEE_SUMMARY_PAGE_DATA_URLs } from '../../../../constants';
import { IReviewPageParameter } from '../../../../models';

@Injectable({
  providedIn: 'root'
})
export class EmployeeSummaryPageService {
  reviewForms: IEmployeeReviewForm[];
  score: string;
  scoreDesc: string;

  constructor(private apiService: ApiService) { }

  getReviewForms(parameter: IReviewPageParameter, role: number, planId: number): Observable<IApiResult> {
    return this.apiService.read(this.getReviewFormsUrl(parameter, role, planId));
  }

  getScore(planId: number): Observable<IApiResult> {
    return this.apiService.read(`${EMPLOYEE_SUMMARY_PAGE_DATA_URLs.score}/${planId}`);
  }

  completeSelfReview(workflowProcessId: number): Observable<IApiResult> {
  	return this.apiService.update(`${EMPLOYEE_SUMMARY_PAGE_DATA_URLs.completeSelfReview}/${workflowProcessId}`, {});
  }

  getReviewFormsUrl(parameter: IReviewPageParameter, roleType: number, planId: number): string {
    let employeeId = 0;

    if (parameter.reviewForm && parameter.reviewForm.EmployeeInfo) {
      employeeId = parameter.reviewForm.EmployeeInfo.employee_id;
    }

    switch (roleType) {
      case RoleTypes.EMPLOYEE:
        return `${APPRAISAL_FORMS_DATA_URLs.getEmployeeReviewForms}/${planId}`;
      case RoleTypes.LINE_MANAGER:
        return `${APPRAISAL_FORMS_DATA_URLs.getLineManagerReviewForms}/${employeeId}/${planId}`;
      case RoleTypes.EMPLOYEE_ACCEPT_REJECT:
        return '';
      case RoleTypes.REVIEWER_ASSESSING:
        return '';
      case RoleTypes.REVIEWER_REVIEWING:
        return '';
      case RoleTypes.MODERATION:
        return '';
      case RoleTypes.HR:
        return '';
    }
  }

  get allFormsAreCompleted(): boolean {
    if (this.reviewForms) {
      const countOfForms = this.reviewForms.length;
      const completedForms = this.reviewForms.filter(item => item.status === 1);
      if (completedForms) {
        const countOfCompletedForms = completedForms.length;
        return (countOfForms === countOfCompletedForms);
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
