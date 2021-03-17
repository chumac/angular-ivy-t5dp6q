import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';

import { IDisciplinaryActionTransaction, IDisciplinaryActionTransactionEdit } from '@nutela/models/workforce/employee-profiles';
import { UtilService, futureDateValidator, formatDate } from '@nutela/core-services';

@Injectable({
  providedIn: 'root'
})
export class DisciplinaryActionEditorService {
  public form: FormGroup = new FormGroup({});

  validationMessages: any;
  concurWithSystemRecommendation: boolean = false;
  changeSystemRecommendation: boolean = false;
  showHrRecommendationInput: boolean = false;
  showReasonForDifference: boolean = false

  constructor(
    private fb: FormBuilder,
    private util: UtilService,
  ) {
    this.form = this.buildForm();
    this.validationMessages = this.getValidationMessages();
  }

  buildForm(): FormGroup {
    return this.fb.group({
      issued_to_employee_id: [null, Validators.required],
      issued_by_role: [null],
      issued_by_employee_id: [null, Validators.required],
      issue_detail: [null, Validators.required],
      event_date: [null, Validators.compose([Validators.required, futureDateValidator(this.util.currentDate)])],
      h_action: [null],
      h_recommendation_id: [null],
      x_recommendation_id: [null],
      h_reason_for_difference: [null]
    }, {
      validator: []
    }
    );
  }

  init(
    data: any
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: IDisciplinaryActionTransaction): IDisciplinaryActionTransactionEdit | {} {
    if (data) {
      return {
        issued_to_employee_id: data.issue_to_employee_id,
        issued_by_role: data.issued_by_role_i,
        issued_by_employee_id: data.issued_by_employee_id,
        issue_detail: data.issue_detail,
        event_date: data.event_date,
        h_action: data.h_action_i,
        h_recommendation_id: data.hr_recommendation_id,
        x_recommendation_id: data.x_recommendation_id,
        h_reason_for_difference: data.hr_reason_for_difference,
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      issued_to_employee_id: {
        fieldTitle: `Issued to`,
        required: `This field is required.`
      },
      issued_by_employee_id: {
        fieldTitle: `Issued by`,
        required: `This field is required.`
      },
      issue_detail: {
        fieldTitle: `Event Details`,
        required: `This field is required.`
      },
      event_date: {
        fieldTitle: `Event Date`,
        required: `This field is required.`,
        futureDate: `Event Date can't be in the future.`
      },
      h_recommendation_id: {
        fieldTitle: `HR Recommendation`,
        required: `This field is required if "Change" is selected.`,
      },
      h_reason_for_difference: {
        fieldTitle: `Reason for difference`,
        required: `This field is required if "Change" is selected.`,
      },
      flx: {
        fieldTitle: `Other Errors`
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



  get xRecommendation(): AbstractControl {
    return this.form.get('x_recommendation_id');
  }

  get hrRecommendation(): AbstractControl {
    return this.form.get('h_recommendation_id');
  }

  get hrAction(): AbstractControl {
    return this.form.get('h_action');
  }

  get hrReasonForDifference(): AbstractControl {
    return this.form.get('h_reason_for_difference');
  }

  get eventDate(): AbstractControl {
    return this.form.get('event_date');
  }

  transformDatesInput() {
    if (this.eventDate.value !== null) {
      return this.eventDate.setValue(formatDate(this.eventDate.value))
    };
  }

  initializeForm() {
    this.form = this.buildForm();
    this.hrAction.setValue(1);
    this.concurWithSystemRecommendation = false;
    this.changeSystemRecommendation = true;
    this.showHrRecommendationInput = true;
    this.showReasonForDifference = false;
  }

  useHrRecommendationLogic(actionValue: number) {
    switch (actionValue) {
      case 0:
        this.hrRecommendation.setValidators(Validators.required)
        this.hrRecommendation.setValue(this.xRecommendation.value);
        this.showHrRecommendationInput = true;
        this.concurWithSystemRecommendation = true;
        this.changeSystemRecommendation = false;
        this.showReasonForDifference = false;
        this.hrReasonForDifference.setValidators(null)
        this.hrReasonForDifference.setValue(null);
        break;
      case 1:
        this.hrRecommendation.setValue(null);
        this.hrReasonForDifference.setValue(null);
        this.hrRecommendation.setValidators(Validators.required)
        this.hrReasonForDifference.setValidators(Validators.required)
        this.concurWithSystemRecommendation = false;
        this.showHrRecommendationInput = true;
        this.changeSystemRecommendation = true;
        this.showReasonForDifference = this.xRecommendation.value ? true : false;
        break;
      case 2:
        this.hrRecommendation.setValue(null);
        this.hrReasonForDifference.setValue(null);
        this.concurWithSystemRecommendation = false;
        this.showHrRecommendationInput = false;
        this.changeSystemRecommendation = false;
        this.showReasonForDifference = false;
        this.hrRecommendation.setValidators(null)
        this.hrReasonForDifference.setValidators(null)
        break;
      default:
        this.hrReasonForDifference.setValue(null);
        this.hrRecommendation.setValue(null);
        this.hrRecommendation.setValidators(null)
        this.hrReasonForDifference.setValidators(null)
        this.concurWithSystemRecommendation = false;
        this.showHrRecommendationInput = false;
        this.changeSystemRecommendation = false;
        this.showReasonForDifference = false;
    }
  }
}
