import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  AbstractControl,
  Validators
} from '@angular/forms';

import { Store } from '@ngrx/store';

import { UtilService} from '@nutela/core-services';
import { IReport } from '@nutela/models/foundation';


@Injectable({
  providedIn: 'root'
})
export class ReportPermissionEditorService {
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
    return this.fb.group(
      {
        assign_to:[null, Validators.required],
        rolename:[null],
        logon_name:[null],
        report_key: [null],
      },
      {
        validator: []
      }
    );
  }

//   init(
//     data: IReport[],
//   ) {
//     if (data) {
//  this.form.patchValue(this.fieldData(data));
//     }
//   }

//   fieldData(data: IReport): IReport | {} {
//     if (data) {
//       return {
//         assign_to : data.assign_to,
//         rolename: data.roleInfo.rolename,
//         logon_name: data.logon_name,
//         report_key: data.report_key,
//       };
//     } else {
//       return {};
//     }
//   }

  getValidationMessages(): any {
    return {};
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
