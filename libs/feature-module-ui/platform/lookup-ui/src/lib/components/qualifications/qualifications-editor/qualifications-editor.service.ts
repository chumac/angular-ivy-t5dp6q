import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';


import { UtilService} from '@nutela/core-services';
import { IQualifications } from '@nutela/models/platform/lookup';

@Injectable({
  providedIn: 'root'
})
export class QualificationCategoryEditorService {
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
      qualification_id:[],
      description: ['', Validators.required],
      qualification_code: ['',Validators.required],
      qualification_type:['',Validators.required],
      qualification_category:['',Validators.required],
      }, {
        validator: []
      }
    );
  }

  init(
    data: IQualifications,
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }




  fieldData(data: IQualifications): IQualifications | {} {
    if (data) {
      console.log(data)
      return {
        qualification_id: data.qualification_id,
        description: data.description,
        qualification_code: data.qualification_code,
        qualification_type:data.qualification_type,
        qualification_category:data.QualCategoryInfo.category_id,
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
