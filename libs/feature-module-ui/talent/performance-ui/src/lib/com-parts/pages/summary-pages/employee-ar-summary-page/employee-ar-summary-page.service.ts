import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';

import { Observable } from 'rxjs/internal/Observable';

import { ApiService } from '@nutela/core-services';
import { IApiResult } from '@nutela/models/core-data';
import { IEmployeeReviewForm, IScore } from '@nutela/models/talent/performance';
import { RoleTypes } from '../../../../enumerations';
import { APPRAISAL_FORMS_DATA_URLs, EMPLOYEE_AR_SUMMARY_PAGE_DATA_URLs } from '../../../../constants';
import { acceptedOrRejectedValidator } from './employee-ar-summary-page.factory';

const PAGE_COMPLETION_ACCEPT = 1;
const PAGE_COMPLETION_REJECT = 2;
@Injectable({
  providedIn: 'root'
})
export class EmployeeArSummaryPageService {
  private form: FormGroup = new FormGroup({});
  reviewForms: IEmployeeReviewForm[];
  score: IScore;

  validationMessages: any;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.form = this.buildForm();
    this.watchFormChanges();
    this.validationMessages = this.getValidationMessages();
   }

   watchFormChanges() {
    this.accepted.valueChanges.subscribe(status => {
        this.rejected.setValue(!status);
      }
    );
   }

   buildForm(): FormGroup {
    return this.fb.group({
      oneOnOneCompleted: [null, Validators.compose([Validators.required, Validators.requiredTrue])],
      oneOnOneComment: [null, Validators.required],
      accepted: [null],
      rejected: [null],
      comment: [null]
    } , {
        validator: []
      }
    );
  }

  getReviewForms(role: number, planId: number): Observable<IApiResult> {
    return this.apiService.read(this.getReviewFormsUrl(role, planId));
  }

  getScore(planId: number): Observable<IApiResult> {
    return this.apiService.read(`${APPRAISAL_FORMS_DATA_URLs.finalScore}/${planId}`);
  }

  completeReview(workflowProcessId: number, approvalStatus: number, body: any): Observable<IApiResult> {
    let url = `${EMPLOYEE_AR_SUMMARY_PAGE_DATA_URLs.completeReviewReject}/${workflowProcessId}`;

    if (approvalStatus === PAGE_COMPLETION_ACCEPT) {
      url = `${EMPLOYEE_AR_SUMMARY_PAGE_DATA_URLs.completeReviewAccept}/${workflowProcessId}`;
    } else if (approvalStatus === PAGE_COMPLETION_REJECT){
      url = `${EMPLOYEE_AR_SUMMARY_PAGE_DATA_URLs.completeReviewReject}/${workflowProcessId}`;
    }

  	return this.apiService.create(url, body);
  }

  getReviewFormsUrl(roleType: number, planId: number): string {
    switch (roleType) {
      case RoleTypes.EMPLOYEE:
        return `${APPRAISAL_FORMS_DATA_URLs.getEmployeeReviewForms}/${planId}`;
      case RoleTypes.LINE_MANAGER:
        return `${APPRAISAL_FORMS_DATA_URLs.getLineManagerReviewForms}/${planId}`;
      case RoleTypes.EMPLOYEE_ACCEPT_REJECT:
        return `${APPRAISAL_FORMS_DATA_URLs.getAcceptRejectReviewForms}/${planId}`;
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
      comment: {
        fieldTitle: `Employee Comment`,
        required: `This field is required.`
      },
      flx: {
        fieldTitle: `Other Errors`,
        acceptedOrRejectedCheck: `You must 'Accept' or 'Reject' review.`
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

  get accepted(): AbstractControl {
    return this.form.get('accepted');
  }

  get rejected(): AbstractControl {
    return this.form.get('rejected');
  }

  get oneOnOneCompleted(): AbstractControl {
    return this.form.get('oneOnOneCompleted');
  }

  get oneOnOneComment(): AbstractControl {
    return this.form.get('oneOnOneComment');
  }

  get comment(): AbstractControl {
    return this.form.get('comment');
  }
}
