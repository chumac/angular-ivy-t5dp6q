import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';


import { UtilService, formatDate} from '@nutela/core-services';
import { IReInstate } from '@nutela/models/workforce/employee-profiles';

@Injectable()
export class ReInstateEditorService {
  public form: FormGroup = new FormGroup({});

  validationMessages: any;
  status=false;

  constructor(
    private fb: FormBuilder,
    private util: UtilService
  ) {
    this.form = this.buildForm();
    this.validationMessages = this.getValidationMessages();
  }

  buildForm(): FormGroup {
    return this.fb.group({
      employee_id:[null, Validators.required],
      effective_date: [null, Validators.required],
      new_sn:[false],
      staff_number:[null],
      new_un:[false],
      new_username:[null],
      rec_category:[null, Validators.required],
      old_sn:[null],
      old_un:[null],
      new_contract:[false],
      new_employment_date:[null],
      }, {
        validator: []
      }
    );
  }

  init(
    data: IReInstate,
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }




  fieldData(data: IReInstate): IReInstate | {} {
    if (data) {
      console.log('edit', data);
      return {
        employee_id:data.employee_id,
        effective_date:data.effective_date,
        new_sn:false,
        staff_number: null,
        new_un: false,
        new_username:null,
        rec_category: null,
        old_sn: data.employee_number,
        old_un: data.logon_name,
        new_contract: false,
        new_employment_date:null,
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      employee_id: {
        fieldTitle: `Employee`,
        required: `This field is required.`
      },
      effective_date: {
        fieldTitle: `Effective Date`,
        required: `This field is required.`
      },
      rec_category: {
        fieldTitle: `Record Category`,
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

  get EffectiveDate(): AbstractControl {
    return this.form.get('effective_date');
  }

  get EmploymentDate(): AbstractControl {
    return this.form.get('new_employment_date');
  }

  formatDate(){
    this.EffectiveDate.setValue(formatDate(this.EffectiveDate.value));
    if(this.EmploymentDate.value != null){
      this.EmploymentDate.setValue(formatDate(this.EmploymentDate.value));
    }
  }
}
