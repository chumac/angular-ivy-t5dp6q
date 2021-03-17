import { Injectable } from '@angular/core';
import {  FormBuilder,  FormGroup,  Validators,  AbstractControl,} from '@angular/forms';
import { UtilService } from '@nutela/core-services';
import { IReliefGloble } from '@nutela/models/compensation/payroll';
import { ITaxPercentageGrossEditor } from 'libs/models/compensation/payroll/src/lib/interfaces/tax-pecentage-gross-editor.interface';

@Injectable({
  providedIn: 'root'
})
export class PercentGrossEditorService {
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
      taxpercentongross:[null,Validators.required],
    }, {

      }
    );
  }

  init(
    data: ITaxPercentageGrossEditor
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }
  
  fieldData(data: ITaxPercentageGrossEditor): ITaxPercentageGrossEditor | {} {
    if (data) {
      return {
        paygroup_id: data.paygroup_id,
        payrollProfileID: data.payrollProfileID,
        taxpercentongross: data.taxpercentongross,
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      taxpercentongross: {
        fieldTitle: `Tax Percent Of Gross`,
        required: `This field is required.`
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
