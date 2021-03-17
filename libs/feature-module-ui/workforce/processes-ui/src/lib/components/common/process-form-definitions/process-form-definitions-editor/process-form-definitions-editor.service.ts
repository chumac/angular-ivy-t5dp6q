import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { IProcessFormDefinition } from '@nutela/models/workforce/employee-profiles';

@Injectable({
  providedIn: 'root'
})
export class ProcessFormDefinitionsEditorService {
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
      title_art: [null],
      area:  [null, Validators.required],
      business_rule: [null],
      workflow_id:  [null],
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

  fieldData(data: IProcessFormDefinition): IProcessFormDefinition | {} {
    if (data) {
      return {
        code: data.code,
        title: data.title,
        description: data.description,
        title_art: data.title_art,
        area:  data.area,
        business_rule: data.business_rule,
        workflow_id:  data.workflow_id,
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
      workflow_id: {
        fieldTitle: `Workflow`,
        required: `This field is required.`
      },
      area: {
        fieldTitle: `Area`,
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

  get ratingValue(): AbstractControl {
    return this.form.get('rating_value');
  }

  get description(): AbstractControl {
    return this.form.get('description');
  }

}
