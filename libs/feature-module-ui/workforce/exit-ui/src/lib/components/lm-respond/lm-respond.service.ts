import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';

import { UtilService, formatDate } from '@nutela/core-services';
import { IApprovedLoan } from '@nutela/models/compensation/loans';
import { ISelectOption } from '@nutela/models/core-data';
import { BaseFormComponent } from '@nutela/shared/app-global';

@Injectable()
export class LMRespondService {
  public form: FormGroup = new FormGroup({});

  public tenorTypes: ISelectOption[] = [
    { value: '1', label: 'Years' },
    { value: '2', label: 'Months' },
    { value: '3', label: 'Days' }
  ];

  validationMessages: any;

  constructor(private fb: FormBuilder, private util: UtilService) {
    this.form = this.buildForm();
    this.validationMessages = this.getValidationMessages();
  }

  buildForm(): FormGroup {
    return this.fb.group(
      {
        checklist_id: [null],
        validator_comment: [null]
      },
      {
        validator: []
      }
    );
  }

  init(data: IApprovedLoan) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: IApprovedLoan): IApprovedLoan | {} {
    if (data) {
      return {};
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      resign_letter: {
        fieldTitle: `Resignation Message`,
        required: `This field is required.`
      },
      effective_date: {
        fieldTitle: `Effective Date`,
        required: `This field is required.`
      },
      flx: {
        fieldTitle: `Other Errors`
      }
    };
  }

  get effectiveDate(): AbstractControl {
    return this.form.get('effective_date');
  }

  transformInputsToNumber() {
    if (
      this.effectiveDate.value !== null &&
      !isNaN(parseFloat(this.effectiveDate.value))
    ) {
      return this.effectiveDate.setValue(
        +parseFloat(this.effectiveDate.value).toFixed(2)
      );
    }
  }

  transformDatesInput() {
    if (this.effectiveDate.value !== null) {
      return this.effectiveDate.setValue(formatDate(this.effectiveDate.value));
    }
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
}
