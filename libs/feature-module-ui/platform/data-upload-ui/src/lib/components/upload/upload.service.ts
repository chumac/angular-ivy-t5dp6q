import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';


import { UtilService} from '@nutela/core-services';
import { IUpload } from '@nutela/models/platform/data-upload';

@Injectable()

export class UploadService {
  public form: FormGroup = new FormGroup({});
   fileLength:number;
  validationMessages: any;
  destine:any;
  show:boolean;

  constructor(
    private fb: FormBuilder,
    private util: UtilService
  ) {
    this.form = this.buildForm();
    this.validationMessages = this.getValidationMessages();
  }

  buildForm(): FormGroup {
    return this.fb.group({
      file_details:[null],
      destination: [null,Validators.required],
      delimeter: [null,Validators.required],
      filename: [null],
      is_reversible:[false]
      }, {
        validator: []
      }
    );
  }

  init(
    data: IUpload,
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }




  fieldData(data: IUpload): IUpload | {} {
    if (data) {
      return {
        file_details: data.file_details,
        destination: data.destination,
        delimeter: data.delimeter,
        filename: data.filename,
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      destination: {
        fieldTitle: `Destination`,
        required: `This field is required.`
      },
      delimeter: {
        fieldTitle: `Delimeter`,
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
