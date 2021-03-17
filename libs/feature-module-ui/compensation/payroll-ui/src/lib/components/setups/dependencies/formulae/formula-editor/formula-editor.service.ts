import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { UtilService } from '@nutela/core-services';
import { IFormula } from '@nutela/models/compensation/payroll';
import { take } from 'rxjs/operators';

@Injectable()
export class FormulaEditorService {
  public form: FormGroup = new FormGroup({});

  validationMessages: any;
  restrictToRole: boolean = false
  isAdmin: boolean = true;
  isLinkedToPayrollProfile: any = {
    value: false,
    profile_id: null
  }

  constructor(
    private fb: FormBuilder,
    private util: UtilService
  ) {
    this.form = this.buildForm();
    this.validationMessages = this.getValidationMessages();
  }

  buildForm(): FormGroup {
    return this.fb.group({
      formula_code: [null, Validators.required],
      description: [null, Validators.required],
      formula_text: [null, Validators.required],
      link_to_profile: [{ value: this.isLinkedToPayrollProfile.value, disabled: !this.isAdmin }, Validators.required],
      payroll_profile_id: [{ value: this.isLinkedToPayrollProfile.profile_id, disabled: !this.isAdmin}],
    }, {
      validator: []
    }
    );
  }

  init(
    data: IFormula
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: IFormula): IFormula | {} {
    if (data) {

      return {
        formula_code: data.formula_code,
        description: data.description,
        formula_text: data.formula_text,
        link_to_profile: !!data.link_to_profile,
        payroll_profile_id: data.payroll_profile_id
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      Code: {
        fieldTitle: `formula_code`,
        required: `This field is required.`
      },
      description: {
        fieldTitle: `Description`,
        required: `This field is required.`
      },
      Formula: {
        fieldTitle: `formula_text`,
        required: `This field is required.`
      },
      payroll_profile_id: {
        fieldTitle: `Payroll Profile`,
        required: `This field is required if Link to Profile is YES.`
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

  get code(): AbstractControl {
    return this.form.get('formula_code');
  }

  get linkToProfile(): AbstractControl {
    return this.form.get('link_to_profile');
  }

  get profile(): AbstractControl {
    return this.form.get('payroll_profile_id');
  }

  get description(): AbstractControl {
    return this.form.get('description');
  }
}
