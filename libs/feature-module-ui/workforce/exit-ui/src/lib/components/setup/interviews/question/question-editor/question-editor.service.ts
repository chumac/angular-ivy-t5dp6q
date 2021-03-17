import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { UtilService } from '@nutela/core-services';

@Injectable({
  providedIn: 'root'
})
export class QuestionEditorService {
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
      question_text: ['', Validators.required],
      response_type: ['', Validators.required],
    }
    );
  }

  init(
    data: any,
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: any): any | {} {
    if (data) {
      return {
        question_text: data.question_text,
        response_type: data.response_type,
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
      headed_by: {
        fieldTitle: `Headed By`,
        required: `This field is required.`
      },
      headed_by_position: {
        fieldTitle: `Surname`,
        required: `This field is required.`
      },
      link_id: {
        fieldTitle: `First Name`,
        required: `This field is required.`
      },
      cost_center_code: {
        fieldTitle: `Middle Name`,
        required: `This field is required.`
      },
      shared_code: {
        fieldTitle: `Gender`,
        required: `This field is required.`
      },
      mis_code: {
        fieldTitle: `Username`,
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
