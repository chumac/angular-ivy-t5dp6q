import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';

import {
  IPreviousEmployer
} from '@nutela/models/workforce/employee-profiles';
import { UtilService, futureDateValidator } from '@nutela/core-services';
import { employmentExitFutureDateValidator } from './work-history-editor.factory';

@Injectable({
  providedIn: 'root'
})
export class WorkHistoryEditorService {
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
        requirement_type: [null, [Validators.required]],
        employer: ['', [Validators.required]],
        company_address: [''],
        employment_date: ['', Validators.compose([Validators.required, futureDateValidator(this.util.currentDate)])],
        exit_date: ['', Validators.compose([Validators.required, futureDateValidator(this.util.currentDate)])],
        postheld_at_employment: ['', [Validators.required]],
        count_experience:[true],
        business_type:[null],
        remark:[''],
        starting_salary:[null],
        salary_before_exit:[null],
        reason_4_exit: [null],
        position_before_exit: [null],
        verification_sent_date:[null],
        verification_received_date:[null],
        department: [null],
        attach_document: [null],
        img_size: [null],
        img_extension: [null],
        img_url:[null],
        img_guid:[null],
      }, {
        validator: [employmentExitFutureDateValidator()]
      }
    );
  }

  init(
    data: IPreviousEmployer
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: IPreviousEmployer): IPreviousEmployer | {} {
    if (data) {
      return {
        requirement_type: data.requirement_type,
        employer: data.employer,
        company_address: data.company_address,
        employment_date: data.employment_date,
        starting_salary:this.util.maskInput(data.starting_salary),
        salary_before_exit:this.util.maskInput(data.salary_before_exit),
        exit_date: data.exit_date,
        postheld_at_employment: data.postheld_at_employment,
        reason_4_exit: data.reason_4_exit,
        position_before_exit: data.position_before_exit,
        department: data.department,
        attach_document: data.attach_document,
        img_extension: data.img_extension,
        img_size: data.img_size
      };
    } else {
      return {};
    }
  }


  transformEntrySalaryInput(value: string) { // Transforms the input to comma separated numbers
    this.startSalary.patchValue(this.util.maskInput(value)); 
  }

  transformExitSalaryInput(value: string) { // Transforms the input to comma separated numbers
    this.exitSalary.patchValue(this.util.maskInput(value)); 
  }

  getValidationMessages(): any {
    return {
      requirement_type: {
        fieldTitle: `Tag`,
        required: `This field is required.`
      },
      employer: {
        fieldTitle: `Employer`,
        required: `This field is required. Enter full employer address.`
      },
      company_address: {
        fieldTitle: `Address`,
        required: `This field is required.`
      },
      employment_date: {
        fieldTitle: `Employment Date`,
        required: `This field is required.`,
        futureDate: `Employment date can't be in the future.`
      },
      exit_date: {
        fieldTitle: `Exit Date`,
        required: `This field is required.`,
        futureDate: `Exit date can't be in the future.`
      },
      postheld_at_employment: {
        fieldTitle: `Post Held`,
        required: `This field is required.`
      },
      reason_4_exit: {
        fieldTitle: `Reason Exit`,
        required: `This field is required.`
      },
      position_before_exit: {
        fieldTitle: `Position`,
        required: `This field is required.`
      },
      department: {
        fieldTitle: `Department`,
        required: `This field is required.`
      },
      flx: {
        fieldTitle: `Other Errors`,
        employmentExitFutureDate: `Employment date cannot be after Exit date.`
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

  get startSalary(): AbstractControl {
    return this.form.get('starting_salary');
  }

  get exitSalary(): AbstractControl {
    return this.form.get('salary_before_exit');
  }

}
