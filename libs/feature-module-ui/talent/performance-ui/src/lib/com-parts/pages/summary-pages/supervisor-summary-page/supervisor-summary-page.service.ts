import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';

import { Observable } from 'rxjs/internal/Observable';

import { ApiService } from '@nutela/core-services';
import { IApiResult } from '@nutela/models/core-data';
import { IEmployeeReviewForm, IScore } from '@nutela/models/talent/performance';
import { RoleTypes } from '../../../../enumerations';
import { APPRAISAL_FORMS_DATA_URLs, GENERAL_DATA_URLs, SUPERVISOR_SUMMARY_PAGE_DATA_URLs } from '../../../../constants';
import { IReviewPageParameter } from '../../../../models';
import { ISelectOption } from 'dist/libs/models/core-data';
import { ICommentBoxData } from '../../../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class SupervisorSummaryPageService {
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
      oneOnOneCompleted: [null, Validators.compose([Validators.required, Validators.requiredTrue])],
      oneOnOneComment: [null, Validators.required],
      nextReviewer: [null, Validators.required],
      recommendation: [null, Validators.required],
      comment: [null, Validators.required]
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

    return this.apiService.read(`${SUPERVISOR_SUMMARY_PAGE_DATA_URLs.comments}/${employeeId}/${planId}`);
  }

  getScore(parameter: IReviewPageParameter, planId: number): Observable<IApiResult> {
    let employeeId = 0;

    if (parameter.reviewForm && parameter.reviewForm.EmployeeInfo) {
      employeeId = parameter.reviewForm.EmployeeInfo.employee_id;
    }

    return this.apiService.read(`${SUPERVISOR_SUMMARY_PAGE_DATA_URLs.reviewScore}/${employeeId}/${planId}`);
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
        return `${APPRAISAL_FORMS_DATA_URLs.getLineManagerReviewForms}/${employeeId}/${planId}`;
      case RoleTypes.EMPLOYEE_ACCEPT_REJECT:
        return '';
      case RoleTypes.REVIEWER_ASSESSING:
        return `${APPRAISAL_FORMS_DATA_URLs.getLineManagerTwoReviewForms}/${employeeId}/${planId}`;
      case RoleTypes.REVIEWER_REVIEWING:
        return '';
      case RoleTypes.MODERATION:
        return '';
      case RoleTypes.HR:
        return '';
    }
  }

  getValidationMessages(): any {
    return {
      oneOnOneCompleted: {
        fieldTitle: `One-on-one Completed`,
        required: `This field is required.`,
        isFalse: `Check the 'One-on-one Completed' checkbox.`
      },
      oneOnOneComment: {
        fieldTitle: `One-on-one Comment`,
        required: `This field is required.`
      },
      nextReviewer: {
        fieldTitle: `Next Reviewer`,
        required: `This field is required.`
      },
      recommendation: {
        fieldTitle: `Recommendation`,
        required: `This field is required.`
      },
      comment: {
        fieldTitle: `Supervisor Comment`,
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

  get oneOnOneCompleted(): AbstractControl {
    return this.form.get('oneOnOneCompleted');
  }

  get oneOnOneComment(): AbstractControl {
    return this.form.get('oneOnOneComment');
  }

  get nextReviewer(): AbstractControl {
    return this.form.get('nextReviewer');
  }

  get recommendation(): AbstractControl {
    return this.form.get('recommendation');
  }

  get comment(): AbstractControl {
    return this.form.get('comment');
  }
}
