import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';

import {
   IDesignationDefinition
} from '@nutela/models/workforce/employee-profiles';
import { UtilService } from '@nutela/core-services';
@Injectable({
  providedIn: 'root'
})
export class DefineDesignationEditorService {
  public form: FormGroup = new FormGroup({});

  validationMessages: any;

  constructor(
    private fb: FormBuilder,
    private util: UtilService,
  ) {
    this.form = this.buildForm();
    this.validationMessages = this.getValidationMessages();
  }

  buildForm(): FormGroup {
    return this.fb.group({
      title_code: [null],
      description: [null],
      mis_code: [null],
      position_id: [null],
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

  fieldData(data: IDesignationDefinition): IDesignationDefinition | {} {
    if (data) {
      return {
        title_code: data.title_code,
        description: data.description,
        mis_code: data.mis_code,
        position_id: data.PositionInfo? data.PositionInfo.position_id: null,
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      code: {
        fieldTitle: `Title Code`,
        required: `This field is required.`
      },
      description: {
        fieldTitle: `Discription`,
        required: `This field is required.`
      },
      mis_code: {
        fieldTitle: `MIS Code`,
        required: `This field is required.`
      },
      position_id: {
        fieldTitle: `Position`,
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
