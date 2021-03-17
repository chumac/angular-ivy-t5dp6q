import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';


import { UtilService} from '@nutela/core-services';
import { IStaffCategory } from '@nutela/models/platform/lookup';

@Injectable({
  providedIn: 'root'
})
export class StaffCategoryEditorService {
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
      category_id:[],
      description: ['', Validators.required],
      category_code: ['',Validators.required],
      numbering_scheme: ['',Validators.required],
      }, {
        validator: []
      }
    );
  }

  init(
    data: IStaffCategory,
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }




  fieldData(data: IStaffCategory): IStaffCategory | {} {
    if (data) {
      return {
        category_id: data.category_id,
        description: data.description,
        category_code: data.category_code,
        numbering_scheme:data.numbering_scheme,
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
