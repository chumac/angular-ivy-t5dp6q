import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';

import { ISubscription } from '@nutela/models/workforce/subscription';
import { UtilService, greaterThanValidator } from '@nutela/core-services';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsEditorService {
  private form: FormGroup = new FormGroup({});

  validationMessages: any;

  constructor(private fb: FormBuilder, private util: UtilService) {
    this.form = this.buildForm();
    this.validationMessages = this.getValidationMessages();
  }

  buildForm(): FormGroup {
    return this.fb.group( 
      {
        is_refund: [false],
        subscription_type_id: [null, Validators.required],
        subscription_type_list_id: [null, Validators.required],
        details: [null],
        doc_extension: [null],
        doc_binary: [null],
        doc_size: [null],
        request_refund_amount: [null, Validators.required],
        currency: [null, Validators.required],
        membership_number: [null],

        grade: [null],
        scheduled_grade_amount: [null],
        membership_fee: [null], 

      },
      {
        validator: []
      }
    );
  }

  init(data: ISubscription) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: ISubscription): ISubscription | {} {
    if (data) {
      return {

      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      subscription_type_id: {
        fieldTitle: `Subscription Type`,
        required: `This field is required.`
      },
      subscription_type_list_id: {
        fieldTitle: `Membership Type`,
        required: `This field is required.`
      },
      details: {
        fieldTitle: `Details`,
        required: `This field is required.`
      },
      request_refund_amount: {
        fieldTitle: `Request/Refund Amount`,
        required: `This field is required.`
      },
      currency: {
        fieldTitle: `Currency`,
        required: `This field is required.`
      },
      membership_number: {
        fieldTitle: `Membership Number`,
        required: `This field is required.`
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

  get grade(): AbstractControl {
    return this.form.get('grade');
  }

  get scheduledGradeAmount(): AbstractControl {
    return this.form.get('scheduled_grade_amount');
  }

  get membershipFee(): AbstractControl {
    return this.form.get('membership_fee');
  }
}
