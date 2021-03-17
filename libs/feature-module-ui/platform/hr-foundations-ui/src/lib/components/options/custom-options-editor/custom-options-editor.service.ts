import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import {
  IOptions
} from '@nutela/models/foundation';
import { UtilService} from '@nutela/core-services';

@Injectable({
  providedIn: 'root'
})
export class CustomOptionEditorService {
  private form: FormGroup = new FormGroup({});

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
      sysoption_id: [''],
      option_key:[''],
      description: ['', Validators.required],
      option_value: ['', Validators.required],
      helptext: [''],
     
      }, {
        validator: []
      }
    );
  }

  init(
    data: IOptions,
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }
  
  
  

  fieldData(data: IOptions): IOptions | {} {
    if (data) {
      return {
        option_key: data.option_key,
        description: data.description,
        option_value: data.option_value,
        helptext: data.helptext, 
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      description: {
        fieldTitle: `Description`,
        required: `This field is required.`
      },
      
      option_value: {
        fieldTitle: `Current Value`,
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
