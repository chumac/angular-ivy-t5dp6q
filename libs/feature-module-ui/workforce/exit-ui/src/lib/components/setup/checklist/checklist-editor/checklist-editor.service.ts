import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { UtilService } from '@nutela/core-services';
import { IChecklistItem } from '../../../../interfaces';

@Injectable()
export class ChecklistEditorService {
  public form: FormGroup = new FormGroup({});

  validationMessages: any;
  showPaygroups: boolean = false;

  constructor(
    private fb: FormBuilder,
    private util: UtilService
  ) {
    this.form = this.buildForm();
    this.validationMessages = this.getValidationMessages();
  }

  buildForm(): FormGroup {
    return this.fb.group({
      code: [null, Validators.required],
      description: [null, Validators.required],
      link_to_exit_interview: [false, Validators.required],
      summary: [null, Validators.required],
      validation_role: [null, Validators.required],
      instructions: [null],
      requires_comment: [false, Validators.required],
      use_custom_form: [false, Validators.required],
      form_id: [null],
      option_values: [null],
      sys_rule: [null],
      security_role: [null],
      position_id: [null],
      workflow_id: [null],
    }, {
      validator: []
    }
    );
  }

  init(
    data: IChecklistItem
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: IChecklistItem): IChecklistItem | {} {
    if (data) {
      return {
        code: data.code,
        description: data.description,
        link_to_exit_interview: data.link_to_exit_interview.toLowerCase() === 'yes' ? true : false,
        summary: data.summary,
        validation_role: data.validation_role,
        instructions: data.instructions,
        requires_comment: data.requires_comment.toLowerCase() === 'yes' ? true : false,
        // use_custom_form: data.use_custom_form,
        // form_id: data.form_id,
        option_values: data.option_values,
        sys_rule: data.sys_rule,
        security_role: data.security_role,
        position_id: data.position_id,
        workflow_id: data.workflow_id,
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
