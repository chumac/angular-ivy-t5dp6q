import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';


import { UtilService} from '@nutela/core-services';
import { ICity } from '@nutela/models/platform/lookup';

@Injectable({
  providedIn: 'root'
})
export class CityEditorService {
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
      city_id:[],
      city_code:['',Validators.required],
      description: ['', Validators.required],
      state_id:['',Validators.required]
      }, {
        validator: []
      }
    );
  }

  init(
    data: ICity,
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }




  fieldData(data: ICity): ICity | {} {
    if (data) {
      return {
        city_id: data.city_id,
        city_code:data.city_code,
        description: data.description,
        state_id:data.state_id,
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
      city_code: {
        fieldTitle: `City Code`,
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

  get stateId():AbstractControl{
    return this.form.get('state_id');
  }
}
