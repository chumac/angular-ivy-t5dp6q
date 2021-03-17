import { Injectable } from '@angular/core';
import {  FormBuilder,  FormGroup,  Validators,  AbstractControl,} from '@angular/forms';
import { UtilService } from '@nutela/core-services';
import { IEmployee, IReliefGloble } from '@nutela/models/compensation/payroll';

@Injectable({
  providedIn: 'root'
})
export class ReliefEmployeeService {
  public form: FormGroup = new FormGroup({});

  validationMessages: any;

  constructor(
    private fb: FormBuilder,
    private util: UtilService
  ) {
    this.form = this.buildForm();
    this.setEmployeeValidators();
    this.validationMessages = this.getValidationMessages();
  }

 


  buildForm(): FormGroup {
    return this.fb.group({
      relief_id: [null],
      employee_id: [null],
      use_rule: [0,Validators.required],
      direct_value: [null,Validators.required],
      gross_percentage: [null],
      relief_currency:[null,Validators.required],
    }, {

      }
    );
  }

  init(
    data: IEmployee
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }
  setEmployeeValidators() {
    // const use_ruleControl = this.form.get('use_rule');
     const direct_valueControl = this.form.get('direct_value');
     const gross_percentageControl = this.form.get('gross_percentage');
 
     this.form.get('use_rule').valueChanges
       .subscribe(use_rule => {
         if (use_rule == 0) { 
           direct_valueControl.setValidators([Validators.required]);
           gross_percentageControl.setValidators(null);
         }
 
         if (use_rule === 1) {
           gross_percentageControl.setValidators([Validators.required]);
           direct_valueControl.setValidators(null);
         }
         if (use_rule === 2  || use_rule === 3) {
           gross_percentageControl.setValidators([Validators.required]);
           direct_valueControl.setValidators([Validators.required]);
         }
 
         direct_valueControl.updateValueAndValidity();
         gross_percentageControl.updateValueAndValidity();
       });
   }

  fieldData(data: IEmployee): IEmployee | {} {
    if (data) {
      return {
        relief_id: data.relief_id,
        employee_id: data.employee_id,
        use_rule: data.use_rule,
        direct_value: data.direct_value,
        gross_percentage: data.gross_percentage,
        relief_currency: data.relief_currency,
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      use_rule: {
        fieldTitle: `Use Rule`,
        required: `This field is required.`
      },
      direct_value: {
        fieldTitle: `Direct Value`,
        required: `This field is required.`
      },
      gross_percentage: {
        fieldTitle: `Gross Percentage`,
        required: `This field is required.`
      },
      relief_currency: {
        fieldTitle: `Currency`,
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
