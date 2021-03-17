import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { IndividualConfig } from 'ng-uikit-pro-standard';

import { IErrorMessage } from '@nutela/models/core-data';

@Component({
  template: ``
})
export class BaseFormComponent {
  constructor() {}

  public markFormAsTouched(form: FormGroup) {
    Object.values(form.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  // Validate form instance
  // check_dirty true will only emit errors if the field is touched
  // check_dirty false will check all fields independent of
  // being touched or not. Use this as the last check before submitting
  public validate(
    form: FormGroup,
    validationMessages: any,
    checkDirty?: boolean
  ) {
    let errorMessages: IErrorMessage[] = [];
    let fieldValidationMessages: string[];

    for (const field in form.controls) {
      if (form.controls.hasOwnProperty(field)) {
        const control = form.get(field);

        if (control && control.invalid) {
          if (!checkDirty || (control.dirty || control.touched)) {
            fieldValidationMessages = [];
            const fieldMessages = validationMessages[field];

            for (const key in control.errors) {
              if (key) {
                const errorMessage = fieldMessages
                  ? fieldMessages[key]
                    ? fieldMessages[key]
                    : 'Error occured.'
                  : 'Error occured.';
                fieldValidationMessages.push(errorMessage);
              }
            }

            if (fieldValidationMessages.length > 0) {
              const payload: IErrorMessage = {
                title: fieldMessages ? fieldMessages.fieldTitle : field,
                messages: fieldValidationMessages
              };
              errorMessages.push(payload);
            }
          }
        }
      }
    }

    fieldValidationMessages = [];
    const fieldMessages = validationMessages['flx'];

    for (const key in form.errors) {
      if (key) {
        const errorMessage = fieldMessages? fieldMessages[key] ? fieldMessages[key] : 'Error occured.' : 'Error occured.';
        fieldValidationMessages.push(errorMessage);
      }
    }

    if (fieldValidationMessages.length > 0) {
      const payload: IErrorMessage = {
        title: fieldMessages ? fieldMessages.fieldTitle : 'Other Errors',
        messages: fieldValidationMessages
      };
      errorMessages.push(payload);
    }

    return errorMessages;
  }

  public markFormGroupAsTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
