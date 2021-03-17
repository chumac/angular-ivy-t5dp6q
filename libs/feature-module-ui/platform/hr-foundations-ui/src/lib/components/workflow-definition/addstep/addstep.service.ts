import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';

import {
    IWorkDetails
} from '@nutela/models/foundation';
import { UtilService, futureDateValidator } from '@nutela/core-services';

@Injectable({
  providedIn: 'root'
})

export class AddStepService{


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
        wfstep: [null, Validators.required],
        sendto_type: [null, Validators.required],
        spec_individual: [null],
        spec_position : [null],
        send_to_role: [null],
        can_escalate: [false],
        escalate_hour: [null],
        use_enterprise_structure : [false],
        allow_manual_nextStep: [false],
        spec_position_basedon_sender: [false],
        sys_rule:[null],
        w_sys_rule: [null],

        }, {
          validator: []
        }
      );
    }

    init(
      data: IWorkDetails,
    ) {
      if (data) {
   this.form.patchValue(this.fieldData(data));
      }
    }

    fieldData(data: IWorkDetails): IWorkDetails | {} {
      if (data) {
        console.log('step', data)
        return {
        wflow_id : data.wflow_id,
        wfstep: data.wfstep,
        sendto_type: data.sendto_type_id,
        spec_individual: data.spec_individual,
        spec_position : data.spec_position,
        send_to_role: data.send_to_role,
        can_escalate: data.can_escalate,
        escalate_hour: data.escalate_hour? data.escalate_hour : 0,
        use_enterprise_structure : data.use_enterprise_structure,
        allow_manual_nextStep: data.allow_manual_nextStep,
        spec_position_baseon_sender: data.spec_position_basedon_sender,
        w_sys_rule: data.w_sys_rule,
        sys_rule:data.sys_rule,
        };
      } else {
        return {};
      }
    }

    getValidationMessages(): any {
      return {
        wfstep: {
          fieldTitle: `Step`,
          required: `This field is required.`
        },

        sendto_type: {
          fieldTitle: `Processing rule (sendto)`,
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

    get WflowId(): AbstractControl {
      return this.form.get('wflow_id');
    }

    get CanEscalate(): AbstractControl {
      return this.form.get('can_escalate');
    }

    get Escalatehour(): AbstractControl {
      return this.form.get('escalate_hour');
    }
}
