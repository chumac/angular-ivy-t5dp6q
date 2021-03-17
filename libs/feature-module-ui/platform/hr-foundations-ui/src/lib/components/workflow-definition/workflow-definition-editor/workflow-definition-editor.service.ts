import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';

import {
   IWorkDefinition
} from '@nutela/models/foundation';
import { UtilService } from '@nutela/core-services';

@Injectable({
  providedIn: 'root'
})

export class WorkflowDefinitionEditorService{


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

        wflow_id : [null],
        code: [null, Validators.required],
        description: [null, Validators.required],
        w_sys_rule: [null],
        }, {
          validator: []
        }
      );
    }

    init(
      data: IWorkDefinition,

    ) {
      if (data) {
        this.form.patchValue(this.fieldData(data));
      }
    }




    fieldData(data: IWorkDefinition): IWorkDefinition | {} {
      if (data) {
        return {
            wflow_id: data.wflow_id,
            code: data.code,
            description: data.description,
            w_sys_rule: data.w_sys_rule,
        };
      } else {
        return {};
      }
    }

    getValidationMessages(): any {
      return {
        code: {
          fieldTitle: `Code`,
          required: `This field is required.`
        },

        description: {
          fieldTitle: `Description`,
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
