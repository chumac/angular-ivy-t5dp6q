import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ObjectiveEditorService {
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
      id:[null],
      plan_code: ['', Validators.required],	
      staff_number: ['', Validators.required],	
      perspective_id: [''],	
      perspective_code: ['', Validators.required],	
      description: ['', Validators.required],	
      legend_info:  [''],
      metric: ['', Validators.required],	
      allow_self_rating: ['', Validators.required],	
      weight: ['', Validators.required],	
      target: ['', Validators.required],	
      target_type: [''],	
      target_type_other: ['', Validators.required],	
      start_date: ['', Validators.required],	
      due_date: ['', Validators.required],	
      is_strategic: ['', Validators.required],	
      lower_is_better: ['', Validators.required],
      PlanInfo: [],
      EmployeeInfo: [],
      PerspectiveInfo: [],
      perc_complete: [null],
      prob_of_success: [''],
      is_uploaded: [''],
      source: ['']
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

  fieldData(data: any): any | {} {
    if (data) {
      return {
        id:data.id,
        plan_code: data.plan_code,
        staff_number: data.staff_number,
        perspective_id: data.perspective_id,
        perspective_code: data.perspective_code,
        description: data.description,
        legend_info:  data.legend_info,
        metric: data.metric,
        allow_self_rating: data.allow_self_rating,
        weight: data.weight,
        target: data.target,
        target_type: data.target_type,
        target_type_other: data.target_type_other,
        start_date: data.start_date,
        due_date: data.due_date,
        is_strategic: data.is_strategic,
        lower_is_better: data.lower_is_better,
        PlanInfo: data.PlanInfo,
        EmployeeInfo: data.EmployeeInfo,
        PerspectiveInfo: data.PerspectiveInfo,
        perc_complete: data.perc_complete,
        prob_of_success: data.prob_of_success,
        is_uploaded: data.is_uploaded,
        source: data.source

      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      plan_code: {
        fieldTitle: `Plan Code`,
        required: `This field is required.`
      },
      staff_number: {
        fieldTitle: `Staff Number`,
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
      allow_self_rating: {
        fieldTitle: `Allow Self Rating`,
        required: `This field is required.`
      },
      weight: {
        fieldTitle: `Weight`,
        required: `This field is required.`
      },
      target: {
        fieldTitle: `Target`,
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
      start_date: {
        fieldTitle: `Start Date`,
        required: `This field is required.`
      },
      due_date: {
        fieldTitle: `Due Date`,
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

  get planCode(): AbstractControl {
    return this.form.get('plan_code');
  }

}
