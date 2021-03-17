import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';

import { ProvisioningUtilService } from '../../../services';
import { formatDate } from '@nutela/core-services';
import { IProvisioning } from '../../../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProvisionedEmployeeEditorService {
  public form: FormGroup = new FormGroup({});

  validationMessages: any;

  public disableRecCategoryInput: boolean;
  public disableUsernameInput: boolean;

  constructor(
    private fb: FormBuilder,
    private util: ProvisioningUtilService
  ) {
    this.form = this.buildForm();
    this.validationMessages = this.getValidationMessages();
  }

  buildForm(): FormGroup {
    return this.fb.group({
      new_username: [null, Validators.required],
      new_record_category: [null, Validators.required],
      un_changed: [false],
      cat_changed: [false]
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

  fieldData(data: IProvisioning): IProvisioning | {} {
    if (data) {
      return {
        new_username: data.username,
        new_record_category: data.rec_category,
        un_changed: false,
        cat_changed: false
      };
    } else {
      return {};
    }
  }
  getValidationMessages(): any {
    return {
      new_record_category: {
        fieldTitle: `User Type`,
        required: `This field is required.`
      },
      new_username: {
        fieldTitle: `Username`,
        required: `This field is required.`
      },
      flx: {
        fieldTitle: `Other Errors`,
        employmentExitFutureDate: `Start date cannot be after Exit date.`,
        employmentConfirmationFutureDate: `Confirmation Date can not before employment date`
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

  initializeForm() {
    this.disableUsernameInput = true;
    this.disableRecCategoryInput = true;
    this.form = this.buildForm();
  }
}
