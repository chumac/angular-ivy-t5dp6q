import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { IHurdle } from '@nutela/models/talent/performance';

@Injectable({
  providedIn: 'root'
})
export class HurdlesEditorService {
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
      code: ['', Validators.required],	
      description: ['', Validators.required],	
      range_lower: ['', Validators.required],	
      range_higher: ['', Validators.required],	
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

  fieldData(data: IHurdle): IHurdle | {} {
    if (data) {
      return {
        code: data.code,	
        description: data.description,	
        range_lower: data.range_lower,	
        range_higher: data.range_higher,
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
      range_lower: {
        fieldTitle: `Lower Range`,
        required: `This field is required.`
      },
      range_higher: {
        fieldTitle: `Higher Range`,
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

}
