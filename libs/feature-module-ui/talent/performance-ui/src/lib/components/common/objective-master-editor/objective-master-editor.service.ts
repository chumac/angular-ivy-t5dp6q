import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { IObjectiveMasterDto } from '@nutela/models/talent/performance';

@Injectable({
  providedIn: 'root'
})
export class ObjectiveMasterEditorService {
  public form: FormGroup = new FormGroup({});
  validationMessages: any;

  constructor(
    private fb: FormBuilder
  ) {
    this.form = this.buildForm();
    this.validationMessages = this.getValidationMessages();
  }

  buildForm(): FormGroup {
    return this.fb.group({
      plan_id: [null],
      visibility: [0, Validators.required],
      perspective_id: ['', Validators.required],
      description: ['', Validators.required],
      legend_info:  [''],
      metric: ['', Validators.required],
      allow_self_rating: [false],
      weight: [0, Validators.required],
      target: ['', Validators.required],
      target_type: [null, Validators.required],
      target_type_other: [null],
      start_date: ['', Validators.required],
      due_date: ['', Validators.required], 
      perc_complete: [{value:0, disabled:true}, Validators.required],
      prob_of_success: [0, Validators.required],
      is_strategic: [false],
      lower_is_better: [false]
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

  fieldData(data: IObjectiveMasterDto): IObjectiveMasterDto | {} {
    if (data) {
      return {
        plan_id: data.ObjectiveMasterInfo.PlanInfo.id,
        visibility: data.visibility,
        perspective_id: data.PerspectivesInfo.id,
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
        perc_complete: data.perc_complete,
        prob_of_success: data.prob_of_success,
        is_strategic: data.is_strategic,
        lower_is_better: data.lower_is_better
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      plan_id: {
        fieldTitle: `Plan`,
        required: `This field is required.`
      },
      visibility: {
        fieldTitle: `Visibility`,
        required: `This field is required.`
      },
      perspective_id: {
        fieldTitle: `Perspective Id`,
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

  get planID(): AbstractControl {
    return this.form.get('plan_id');
  }

  get targetType(): AbstractControl {
    return this.form.get('target_type');
  }

}
