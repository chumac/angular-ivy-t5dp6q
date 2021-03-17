import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';

import { Observable } from 'rxjs/internal/Observable';

import { ApiService } from '@nutela/core-services';
import { IApiResult, ISelectOption } from '@nutela/models/core-data';
import { IEmployeeReviewForm, IScore } from '@nutela/models/talent/performance';
import { RoleTypes } from '../../../../enumerations';
import { APPRAISAL_FORMS_DATA_URLs, REVIEW_SUMMARY_PAGE_DATA_URLs, GENERAL_DATA_URLs } from '../../../../constants';
import { IReviewPageParameter } from '../../../../models';
import { ICommentBoxData } from '../../../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ReviewerSummaryPageService {
  private form: FormGroup = new FormGroup({});

  reviewForms: IEmployeeReviewForm[];
  score: IScore;
  recommendations: ISelectOption[];
  comments: ICommentBoxData[];

  validationMessages: any;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.form = this.buildForm();
    this.validationMessages = this.getValidationMessages();
   }

   buildForm(): FormGroup {
    return this.fb.group({
      nextReviewer: [null],
      comment: [null, Validators.required],
      recommendation: [null]
    });
  }

  getReviewForms(parameter: IReviewPageParameter, role: number, planId: number): Observable<IApiResult> {
    return this.apiService.read(this.getReviewFormsUrl(parameter, role, planId));
  }

  getComments(parameter: IReviewPageParameter, role: number, planId: number): Observable<IApiResult> {
    let employeeId = 0;

    if (parameter.reviewForm && parameter.reviewForm.EmployeeInfo) {
      employeeId = parameter.reviewForm.EmployeeInfo.employee_id;
    }

    return this.apiService.read(`${REVIEW_SUMMARY_PAGE_DATA_URLs.comments}/${employeeId}/${planId}`);
  }

  getScoreEmployee(parameter: IReviewPageParameter, planId: number): Observable<IApiResult> {
    let employeeId = 0;

    if (parameter.reviewForm && parameter.reviewForm.EmployeeInfo) {
      employeeId = parameter.reviewForm.EmployeeInfo.employee_id;
    }

    return this.apiService.read(`${REVIEW_SUMMARY_PAGE_DATA_URLs.reviewScoreEmployee}/${employeeId}/${planId}`);
  }

  getScore(parameter: IReviewPageParameter, planId: number): Observable<IApiResult> {
    let employeeId = 0;

    if (parameter.reviewForm && parameter.reviewForm.EmployeeInfo) {
      employeeId = parameter.reviewForm.EmployeeInfo.employee_id;
    }

    return this.apiService.read(`${REVIEW_SUMMARY_PAGE_DATA_URLs.reviewScore}/${employeeId}/${planId}`);
  }

  getRecommendations(): Observable<IApiResult> {
    return this.apiService.read(GENERAL_DATA_URLs.recommendationData);
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
        return `${APPRAISAL_FORMS_DATA_URLs.getEmployeeReviewForms}/${planId}`;
      case RoleTypes.EMPLOYEE_ACCEPT_REJECT:
        return `${APPRAISAL_FORMS_DATA_URLs.getEmployeeReviewForms}/${planId}`;
      case RoleTypes.REVIEWER_ASSESSING:
        return `${APPRAISAL_FORMS_DATA_URLs.getEmployeeReviewForms}/${planId}`;
      case RoleTypes.REVIEWER_REVIEWING:
        return `${APPRAISAL_FORMS_DATA_URLs.getReviewerReviewForms}/${employeeId}/${planId}`;
      case RoleTypes.MODERATION:
        return `${APPRAISAL_FORMS_DATA_URLs.getEmployeeReviewForms}/${planId}`;
      case RoleTypes.HR:
        return `${APPRAISAL_FORMS_DATA_URLs.getEmployeeReviewForms}/${planId}`;
    }
  }

  getValidationMessages(): any {
    return {
      comment: {
        fieldTitle: `Reviewer Comment`,
        required: `This field is required.`
      },
      flx: {
        fieldTitle: `Other Errors`,
        nullCheck: ``
      }
    };
  }

  get f() {
    return this.form;
  }

  get value(): any {
    return this.form.getRawValue();
  }

  get valid(): boolean {
    return this.form.valid;
  }

  patch(value: { [key: string]: any }) {
    this.form.patchValue(value);
  }

  get nextReviewer(): AbstractControl {
    return this.form.get('nextReviewer');
  }

  get comment(): AbstractControl {
    return this.form.get('comment');
  }

  get recommendation(): AbstractControl {
    return this.form.get('recommendation');
  }
}
