import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ILibraryObjective } from '@nutela/models/talent/performance';

@Injectable({
  providedIn: 'root'
})
export class LibraryLoadObjectivesEditorService {
  private form: FormGroup = new FormGroup({});
  validationMessages: any;

  constructor(
    private fb: FormBuilder
  ) {
    this.form = this.buildForm();
    this.validationMessages = this.getValidationMessages();
  }

  buildForm(): FormGroup {
    return this.fb.group({
      visibility: ['', Validators.required],
      perspective_id: ['', Validators.required],
      code: ['', Validators.required],
      description:  ['', Validators.required],
      legend_info:  [''],
      metric:  ['', Validators.required],
      weight:  ['', Validators.required],
      target_type:  ['', Validators.required],
      target_type_other:  [''],
      is_strategic:  ['', Validators.required],
      lower_is_better:  ['', Validators.required],
      eligibility_rule:  ['', Validators.required],
      allow_self_rating:  ['', Validators.required],
      analysis_id:  [null],
      analysis_det_id:  [null],
      position_id:  [null],
      designation_id:  [null],
      grade_id:  [null],
      employee_id:  [null],
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

  fieldData(data: ILibraryObjective): ILibraryObjective | {} {
    if (data) {
      return {
        visibility: data.visibility,
        perspective_id: data.perspective_id,
        perspective_code: data.perspective_code,
        description:  data.description,
        legend_info:  data.legend_info,
        metric:  data.metric,
        weight:  data.weight,
        target_type:  data.target_type,
        target_type_other:  data.target_type_other,
        is_strategic:  data.is_strategic,
        lower_is_better:  data.lower_is_better,
        eligibility_rule:  data.eligibility_rule,
        eligibility_code:  data.eligibility_code,
        allow_self_rating:  data.allow_self_rating,
        analysis_id:  data.analysis_id,
        analysis_det_id:  data.analysis_det_id,
        position_id:  data.position_id,
        designation_id:  data.designation_id,
        grade_id:  data.grade_id,
        employee_id:  data.employee_id,
        is_active:  data.is_active

      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      visibility: {
        fieldTitle: `Visibility`,
        required: `This field is required.`
      },
      perspective_id: {
        fieldTitle: `Perspective Id`,
        required: `This field is required.`
      },
      perspective_code: {
        fieldTitle: `Perspective Code`,
        required: `This field is required.`
      },
      description: {
        fieldTitle: `Description`,
        required: `This field is required.`
      },
      metric: {
        fieldTitle: `Metric`,
        required: `This field is required.`
      },
      weight: {
        fieldTitle: `Weight`,
        required: `This field is required.`
      },
      target_type: {
        fieldTitle: `Target Type`,
        required: `This field is required.`
      },
      target_type_other: {
        fieldTitle: `Target Type Other`,
        required: `This field is required.`
      },
      is_strategic: {
        fieldTitle: `Is Strategic`,
        required: `This field is required.`
      },
      lower_is_better: {
        fieldTitle: `Lower is better`,
        required: `This field is required.`
      },
      eligibility_rule: {
        fieldTitle: `Eligibility Rule`,
        required: `This field is required.`
      },
      eligibility_code: {
        fieldTitle: `Eligibility code`,
        required: `This field is required.`
      },
      allow_self_rating: {
        fieldTitle: `Allow Self Rating`,
        required: `This field is required.`
      },
      analysis_id: {
        fieldTitle: `Analysis`,
        required: `This field is required.`
      },
      analysis_det_id: {
        fieldTitle: `Analysis Det`,
        required: `This field is required.`
      },
      position_id: {
        fieldTitle: `Position`,
        required: `This field is required.`
      },
      designation_id: {
        fieldTitle: `Designation`,
        required: `This field is required.`
      },
      grade_id: {
        fieldTitle: `Grade`,
        required: `This field is required.`
      },
      employee_id: {
        fieldTitle: `Employee`,
        required: `This field is required.`
      },
      is_active: {
        fieldTitle: `Is Active`,
        required: `This field is required.`
      },

      flx: {}
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

  get eligibilityRule(): AbstractControl {
    return this.form.get('eligibility_rule');
  }

}
