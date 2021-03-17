import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { UtilService } from '@nutela/core-services';
import { IDefaultCurrency } from '@nutela/models/compensation/payroll';

@Injectable()
export class DefaultCurrencyEditorService {
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
      code: [null, Validators.required],
      currency_name: [null, Validators.required],
      exchange_rate: [null, Validators.required],
    }, {
      validator: []
    }
    );
  }

  init(
    data: IDefaultCurrency
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: IDefaultCurrency): IDefaultCurrency | {} {
    if (data) {

      return {
        code: data.code,
        currency_name: data.currency_name,
        exchange_rate: data.exchange_rate,
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      Code: {
        fieldTitle: `grade_code`,
        required: `This field is required.`
      },
      Description: {
        fieldTitle: `description`,
        required: `This field is required.`
      },
      Ranking: {
        fieldTitle: `ranking`,
        required: `This field is required.`
      },
      flx: {
        fieldTitle: `Other Errors`
      }
    };
  }

  rebuildForm() {
    this.form = this.buildForm();
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

  get Code(): AbstractControl {
    return this.form.get('grade_code');
  }

  get description(): AbstractControl {
    return this.form.get('description');
  }

  get Ranking(): AbstractControl {
    return this.form.get('ranking');
  }
}
