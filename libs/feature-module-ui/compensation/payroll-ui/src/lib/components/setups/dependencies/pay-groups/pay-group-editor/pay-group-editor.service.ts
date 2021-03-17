import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { UtilService } from '@nutela/core-services';
import { IPayGroup } from '@nutela/models/compensation/payroll';

@Injectable()
export class PayGroupEditorService {
  public form: FormGroup = new FormGroup({});

  validationMessages: any;
  showPaygroups: boolean = false;
  restrictToRole: boolean = false

  constructor(
    private fb: FormBuilder,
    private util: UtilService
  ) {
    this.form = this.buildForm();
    this.validationMessages = this.getValidationMessages();
  }
// { value: this.confirmationStatus ? this.confirmationStatus : null, disbled: true }
  buildForm(): FormGroup {
    return this.fb.group({
      paygroup_code: [null, Validators.required],
      description: [null],
      shortname: [null, Validators.required],
      grade_id: [null, Validators.required],
      rank: [null, Validators.required],
      annual_gross: [null],
      confirmation_status: [{value: null, disabled: true}, Validators.required],
      fixed_relief: [null],
      fixed_total_taxable: [null],
      fixed_total_annual_tax: [null],
      estimated_tax_rate: [null],
      is_active: [true]
    }, {
      validator: []
    }
    );
  }

  init(
    data: IPayGroup
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: IPayGroup): IPayGroup | {} {
    if (data) {

      return {
        paygroup_code: data.paygroup_code,
        description: data.description,
        shortname: data.shortname,
        // currency_id: data.currencyInfo ? data.currencyInfo.currency_id : null,
        grade_id: data.gradeInfo ? data.gradeInfo.grade_id : null,
        rank: data.rank,
        is_active: typeof data.is_active ==='boolean' ? data.is_active : true,
        estimated_tax_rate: data.taxpercentongross,
        // unconfirmed_pg: data.unconfirmedPaygroupInfo ? data.unconfirmedPaygroupInfo.unconfirmed_pg_id : null,
        confirmation_status: data.confirmation_status,
        annual_gross: data.annual_gross,
        fixed_relief: data.fixed_relief,
        fixed_total_taxable: data.fixed_total_taxable,
        fixed_total_annual_tax: data.fixed_total_annual_tax,
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      Code: {
        fieldTitle: `PayGroup_code`,
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
    return this.form.get('Paygroup_code');
  }

  get ShortName(): AbstractControl {
    return this.form.get('shortname');
  }

  get Grade(): AbstractControl {
    return this.form.get('grade_id');
  }

  get Rank(): AbstractControl {
    return this.form.get('rank');
  }

  get taxRate(): AbstractControl {
    return this.form.get('estimated_tax_rate');
  }

  get confirmationStatus(): AbstractControl {
    return this.form.get('confirmation_status');
  }
}
