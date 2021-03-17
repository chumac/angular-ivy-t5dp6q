import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { IContractPageDefinition } from '@nutela/models/talent/performance';

@Injectable({
  providedIn: 'root'
})
export class ContractPageDefinitionsEditorService {
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
      title: ['', Validators.required],
      body: ['', Validators.required],
      must_agree_text: ['', Validators.required],
      must_agree: [false],
      widget_guid: ['', Validators.required] 
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

  fieldData(data: IContractPageDefinition): IContractPageDefinition | {} {
    if (data) {
      return {
        title: data.title,
        body: data.body,
        must_agree_text: data.must_agree_text,
        must_agree: data.must_agree,
        widget_guid: data.widget_guid, 
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      widget_guid: {
        fieldTitle: `Contract Page`,
        required: `This field is required.`
      },
      title: {
        fieldTitle: `Title`,
        required: `This field is required.`
      },
      body: {
        fieldTitle: `Body`,
        required: `This field is required.`
      },
      must_agree_text: {
        fieldTitle: `Must Agree Text`,
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

  get widgetGuid(): AbstractControl {
    return this.form.get('widget_guid');
  }

}
