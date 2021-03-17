import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';


import { UtilService} from '@nutela/core-services';
import { IEducationalInstitution } from '@nutela/models/platform/lookup';

@Injectable({
  providedIn: 'root'
})
export class EducationalInstitutionEditorService {
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
      institution_id:[null],
      institution_code:  ['', Validators.required],
      description: ['', Validators.required],
      institution_type:['', Validators.required],
      rating:[null],
      country:[null],
      city:[null],
      }, {
        validator: []
      }
    );
  }

  init(
    data: IEducationalInstitution,
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }




  fieldData(data: IEducationalInstitution): IEducationalInstitution | {} {
    if (data) {
      return {
        institution_id: data.institution_id,
        institution_code:data.institution_code,
        description: data.description,
        institution_type: data.institution_type,
        rating:data.rating,
        country:data.country,
        city:data.city,
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
      institution_code: {
        fieldTitle: `Institution Code`,
        required: `This field is required.`
      },
      institution_type: {
        fieldTitle: `Institution Type`,
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


  // getUpdatedFormValues(formValue = this.value) {
  //   const rating = formValue.rating ? formValue.rating.toString() : null;
  //   const newValue = { ...formValue, rating };

  //   return newValue;
  // }

}
