import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';
import { UtilService } from '@nutela/core-services';
import { IReviewChecklist } from 'libs/models/workforce/exit/src/lib/interfaces';

@Injectable()
export class ValidateEditorService {
  public form: FormGroup = new FormGroup({});

  validationMessages: any;
  showPaygroups: boolean = false;

  constructor(private fb: FormBuilder, private util: UtilService) {
    this.form = this.buildForm();
    this.validationMessages = this.getValidationMessages();
  }

  buildForm(): FormGroup {
    return this.fb.group(
      {
        employee_id: [null, Validators.required],
        title: [null],
        message: [null, Validators.required]
      },
      {
        validator: []
      }
    );
  }

  init(data: IReviewChecklist) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: IReviewChecklist): IReviewChecklist | {} {
    if (data) {
      return {
        // paygroup_code: data.paygroup_code,
        // description: data.description,
        // shortname: data.shortname,
        // currency_id: data.currencyInfo.id,
        // grade_id: data.gradeInfo.grade_id,
        // rank: data.rank,
        // non_conventional: data.non_conventional,
        // taxpercentongross: data.taxpercentongross,
        // unconfirmed_pg: data.unconfirmedPaygroupInfo.paygroup_id,
        // confirmation_status: data.confirmation_status,
        // annual_gross: data.annual_gross,
        // fixed_relief: data.fixed_relief,
        // fixed_total_taxable: data.fixed_total_taxable,
        // fixed_total_annual_tax: data.fixed_total_annual_tax,
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

  get Taxpercentongross(): AbstractControl {
    return this.form.get('taxpercentongross');
  }

  get ConfirmationStatus(): AbstractControl {
    return this.form.get('confirmation_status');
  }
}
