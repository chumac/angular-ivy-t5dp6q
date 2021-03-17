import { Injectable } from '@angular/core';
import {  FormBuilder,  FormGroup,  Validators,  AbstractControl,} from '@angular/forms';
import { UtilService } from '@nutela/core-services';
import { IReliefGloble } from '@nutela/models/compensation/payroll';
import { ITaxPercentageGrossEditor } from 'libs/models/compensation/payroll/src/lib/interfaces/tax-pecentage-gross-editor.interface';
import { ITaxPercentageGross } from 'libs/models/compensation/payroll/src/lib/interfaces/tax-pecentage-gross.interface';

@Injectable({
  providedIn: 'root'
})
export class PercentGrossViewService {
  public form: FormGroup = new FormGroup({});

  validationMessages: any;

  constructor(
    private fb: FormBuilder,
    private util: UtilService
  ) {
    this.form = this.buildForm();
  }

  buildForm(): FormGroup {
    return this.fb.group({
    }, {

      }
    );
  }

  init(
    data: ITaxPercentageGross
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }
  
  fieldData(data: ITaxPercentageGross): ITaxPercentageGross | {} {
    if (data) {
      return {
        paygroup_id: data.paygroup_id,
        payroll_profile_id: data.payroll_profile_id,
        taxpercentongross: data.taxpercentongross,
      };
    } else {
      return {};
    }
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
