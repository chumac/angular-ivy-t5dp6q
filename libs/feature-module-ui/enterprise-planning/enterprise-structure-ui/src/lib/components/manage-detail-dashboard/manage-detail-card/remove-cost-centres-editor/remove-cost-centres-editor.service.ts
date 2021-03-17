import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  AbstractControl,
  Validators
} from '@angular/forms';

import { UtilService } from '@nutela/core-services';
import { ICostCentreTransform } from '../../../../models/interfaces';


@Injectable({
  providedIn: 'root'
})
export class RemoveCostCentresEditorService {
  public form: FormGroup = new FormGroup({});

  validationMessages: any;

  constructor(
    private fb: FormBuilder,
    private util: UtilService
  ) {
    this.form = this.buildForm();
    this.validationMessages = this.getValidationMessages();

  }

  buildForm(): FormGroup {
    return this.fb.group({
      cost_centre_id: [[], Validators.required],
    }
    );
  }

  init(
    data: ICostCentreTransform[],
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: ICostCentreTransform[]): ICostCentreTransform[] | {} {
    if (data) {
      return {
        cost_centre_code: data
      };

    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      cost_centre_code: {
        fieldTitle: `Cost Centres`,
        required: `Please select at least one cost centre.`
      },
      flx: {
        fieldTitle: `Other Errors`,
        employmentExitFutureDate: `Employment date cannot be after Exit date.`
      }
    };
  }

  get initialLinks(): AbstractControl {
    return this.form.get('virtual_links');
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
