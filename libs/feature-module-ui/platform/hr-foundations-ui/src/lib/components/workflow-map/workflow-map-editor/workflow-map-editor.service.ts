import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';

import {
    IWorkflowMap
} from '@nutela/models/foundation';
import { UtilService} from '@nutela/core-services';

@Injectable({
  providedIn: 'root'
})

export class WorkflowMapEditorService{


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
        entity_id:[''],
        wflow_id:[''],
        }, {
          validator: []
        }
      );
    }

    init(
      data: IWorkflowMap,
    ) {
      if (data) {
        this.form.patchValue(this.fieldData(data));
      }
    }

    fieldData(data: IWorkflowMap): IWorkflowMap | {} {
      console.log('data from service ', data);
      if (data) {
        return {
          entity_id:data.entity_id ? data.entity_id: 0,
          wflow_id:data.wflow_id ? data.wflow_id:0,
        };
      } else {
        return {};
      }
    }

    getValidationMessages(): any {
      return {
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

    get Entity_id(): AbstractControl {
      return this.form.get('entity_id');
    }

    get Work_id(): AbstractControl {
      return this.form.get('wflow_id');
    }



}
