import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ICustomForm } from '@nutela/models/workforce/employee-profiles';

@Injectable({
  providedIn: 'root'
})
export class CustomFormsEditorService {
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
      code: [null, Validators.required],
      title: [null, Validators.required],
      description: [null, Validators.required],
      type: [null, Validators.required],
      area: [null, Validators.required],
      scope: [null, Validators.required],
      eligibility: [null, Validators.required],
      business_rule: [null],
      workflow_id: [null],
      has_document_attach: [null],
      form_json: [null],
      is_published: [false]
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

  fieldData(data: ICustomForm): ICustomForm | {} {
    if (data) {
      return {
        code: data.code,
        title: data.title,
        description: data.description,
        type: data.type,
        area: data.area,
        scope: data.scope,
        eligibility: data.eligibility,
        business_rule: data.business_rule,
        workflow_id: data.workflow_id,
        has_document_attach: data.has_document_attach,
        form_json: data.form_json,
        is_published: data.is_published
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
      title: {
        fieldTitle: `Title`,
        required: `This field is required.`
      },
      description: {
        fieldTitle: `Description`,
        required: `This field is required.`
      },
      type: {
        fieldTitle: `Type`,
        required: `This field is required.`
      },
      area: {
        fieldTitle: `Area`,
        required: `This field is required.`
      },
      scope: {
        fieldTitle: `Scope`,
        required: `This field is required.`
      },
      eligibility: {
        fieldTitle: `Eligibility`,
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

  get code(): AbstractControl {
    return this.form.get('code');
  }

  get description(): AbstractControl {
    return this.form.get('description');
  }

  get formJson(): AbstractControl {
    return this.form.get('form_json');
  }

  get workflowId(): AbstractControl {
    return this.form.get('workflow_id');
  }

  get hasDocument(): AbstractControl {
    return this.form.get('has_document_attach');
  }

  get isPublished(): AbstractControl {
    return this.form.get('is_published');
  }

}
