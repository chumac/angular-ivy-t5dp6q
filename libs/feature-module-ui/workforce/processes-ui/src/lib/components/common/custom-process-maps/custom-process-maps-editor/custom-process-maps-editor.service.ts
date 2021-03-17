import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ICustomProcessMap } from '@nutela/models/workforce/employee-profiles';

@Injectable({
  providedIn: 'root'
})
export class CustomProcessMapsEditorService {
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
      process_id: [null],
      section_title: [null, Validators.required],
      description: [null, Validators.required],
      rank: [null, Validators.required],
      form_id: [null, Validators.required],
      role: [null, Validators.required],
      emp_role_perm: [null, Validators.required],
      has_attachment: [false],
      has_comment: [false],
      business_rule: [null]
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

  fieldData(data: ICustomProcessMap): ICustomProcessMap | {} {
    if (data) {
      return {
        process_id: data.process_id,
        section_title: data.section_title,
        description: data.description,
        rank: data.rank,
        form_id: data.form_id,
        role: data.role,
        emp_role_perm: data.emp_role_perm,
        has_attachment: data.has_attachment,
        has_comment: data.has_comment,
        business_rule: data.business_rule
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      form_id: {
        fieldTitle: `Custom form`,
        required: `This field is required.`
      },
      section_title: {
        fieldTitle: `Section Title`,
        required: `This field is required.`
      },
      description: {
        fieldTitle: `Description`,
        required: `This field is required.`
      },
      rank: {
        fieldTitle: `Rank`,
        required: `This field is required.`
      },
      role: {
        fieldTitle: `Role`,
        required: `This field is required.`
      },
      emp_role_perm: {
        fieldTitle: `Permission`,
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
  
  get processId(): AbstractControl {
    return this.form.get('process_id');
  }

  get role(): AbstractControl {
    return this.form.get('role');
  }

  get empPermission(): AbstractControl {
    return this.form.get('emp_role_perm');
  }

  get hasAttachment(): AbstractControl {
    return this.form.get('has_attachment');
  }

  get hasComment(): AbstractControl {
    return this.form.get('has_comment');
  }

}
