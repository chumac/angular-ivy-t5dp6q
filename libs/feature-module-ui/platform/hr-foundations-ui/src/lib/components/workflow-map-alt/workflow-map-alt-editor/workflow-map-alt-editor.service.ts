import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';

import {
  IWorkflowAlternates
} from '@nutela/models/foundation';
import { UtilService} from '@nutela/core-services';

@Injectable({
  providedIn: 'root'
})

export class WorkflowMapAltEditorService{


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
        for_employee_id:[null],
        ruletype:[null],
        analysis_id:[null],
        analysis_det_id:[null],
        grade_id:[null],
        msg_source:[null, Validators.required],
        w_flow_id:[null, Validators.required],
        position_category:[null],
        position_id:[null],
        designation_id:[null],
        category_id:[null],
        staff_group_id:[null],

        }, {
          validator: []
        }
      );
    }

    // init(
    //   data: IWorkflowAlternates,
    // ) {
    //   if (data) {
    //     this.form.patchValue(this.fieldData(data));
    //   }
    // }

    // fieldData(data: IWorkflowAlternates): IWorkflowAlternates | {} {
    //   console.log('data from service ', data);
    //   if (data) {
    //     return {
    //     for_employee_id:data.for_employee_id?data.for_employee_id:0,
    //     ruletype:data.ruletype?data.ruletype:null,
    //     analysis_id:data.analysis_id?data.analysis_id:0,
    //     analysis_det_id:data.analysis_det_id?data.analysis_det_id:0,
    //     grade_id:data.grade_id?data.grade_id:0,
    //     msg_source:data.msg_source?data.msg_source:null,
    //     wflow_id:data.w_flow_id ? data.w_flow_id:0,
    //     };
    //   } else {
    //     return {};
    //   }
    // }

    getValidationMessages(): any {
      return {
        msg_source:{
          fieldTitle: `System Entity`,
          required: `This field is required.`
        },
        w_flow_id:{
          fieldTitle: `WorkFlow`,
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
}
