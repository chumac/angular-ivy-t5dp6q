import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';

import {
  ICurrentGradePaygroup,
  IPromotion,
  IPromotionEdit
} from '@nutela/models/workforce/employee-profiles';
import { UtilService, futureDateValidator, formatDate } from '@nutela/core-services';

@Injectable({
  providedIn: 'root'
})
export class PromotionEditorService {
  public form: FormGroup = new FormGroup({});

  validationMessages: any;
  isProcessDifferential: boolean = false;

  constructor(
    private fb: FormBuilder,
    private util: UtilService,
  ) {
    this.form = this.buildForm();
    this.validationMessages = this.getValidationMessages();
  }

  buildForm(): FormGroup {
    return this.fb.group({
      employee_id: [null, Validators.required],
      new_grade_id: [null, Validators.required],
      new_paygroup_id: [null, Validators.required],
      cur_grade_id: [null],
      cur_paygroup_id: [null],
      effective_date: [null, Validators.required],
      notes: [null],
      action: [0, Validators.required],
      status: [null, Validators.required],
      update_last_promo_date: [false],
      process_differential:[false],
      p_diff_quarterly: [false],
      p_diff_halfyear: [false],
      p_diff_year: [false],
      p_diff_triquart: [false]
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

  fieldData(data: IPromotion): IPromotionEdit | {} {
    console.log(data);

    if (data) {
      return {
        action: data.action_i,
        employee_id: data.employee_id,
        new_grade_id: data.new_grade_id,
        new_paygroup_id: data.new_paygroup_id,
        effective_date: data.effective_date,
        notes: data.notes,
        update_last_promo_date: data.update_last_promo_date,
        process_differential: data.process_differential_b,
        p_diff_quarterly: data.process_differential_quarterly_b,
        p_diff_halfyear: data.process_differential_halfyear_b,
        p_diff_year: data.process_differential_yearly_b,
        // batch_id: data.batch_id,
        status: data.status_i,
        rev_record : data.rev_record,
        p_diff_triquart: data.process_differential_triquart_b,
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      action: {
        fieldTitle: `Action`,
        required: `This field is required.`
      },
      employee_id: {
        fieldTitle: `Employee`,
        required: `This field is required.`
      },
      new_grade_id: {
        fieldTitle: `New Grade`,
        required: `This field is required.`
      },
      new_paygroup_id: {
        fieldTitle: `New Paygroup`,
        required: `This field is required.`
      },
      effective_date: {
        fieldTitle: `Effective Date`,
        required: `This field is required.`,
      },
      status: {
        fieldTitle: `Arrear Status`,
        required: `This field is required.`,
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



  get employeeId(): AbstractControl {
    return this.form.get('employee_id');
  }

  get newGroupId(): AbstractControl {
    return this.form.get('new_paygroup_id');
  }

  get curGroupId(): AbstractControl {
    return this.form.get('cur_paygroup_id');
  }

  get curGradeId(): AbstractControl {
    return this.form.get('cur_paygroup_id');
  }

  get effectiveDate(): AbstractControl {
    return this.form.get('effective_date');
  }

  get city(): AbstractControl {
    return this.form.get('area_id');
  }

  updateCurrentGradeAndPaygroup(data: ICurrentGradePaygroup) {
    this.patch({
      cur_grade_id: data.grade_id,
      cur_paygroup_id: data.paygroup_id
    })
  }
  initializeForm() {
    this.form = this.buildForm()
    this.isProcessDifferential = false;
  }

  transformDatesInput() {
    if(this.effectiveDate.value !== null) {
      return this.effectiveDate.setValue(formatDate(this.effectiveDate.value))
    };
  }
}
