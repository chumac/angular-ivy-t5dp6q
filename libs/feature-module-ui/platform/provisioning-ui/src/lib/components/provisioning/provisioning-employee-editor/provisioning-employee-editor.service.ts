import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';

import { employmentExitFutureDateValidator, endDateValidator, titleCheckValidator } from './provisioning-employee-editor.factory';
import { ProvisioningUtilService } from '../../../services';
import { ageRangeValidator, futureDateValidator, formatDate } from '@nutela/core-services';

@Injectable({
  providedIn: 'root'
})
export class ProvisioningEmployeeEditorService {
  public form: FormGroup = new FormGroup({});

  minimumAge = 18;
  maximumAge = 65;
  validationMessages: any;
  autogenerat


  showInput: boolean;
  showEmailType: boolean = false;
  permanentStaff: boolean;
  userOnPayroll: boolean;
  generatedStaffNum = null;
  isAdmin: boolean;
  isEndDateRequired: boolean;

  constructor(
    private fb: FormBuilder,
    private util: ProvisioningUtilService
  ) {
    this.form = this.buildForm();
    this.validationMessages = this.getValidationMessages();

    endDateValidator(this.permStaff, this.endDate);
  }

  buildForm(): FormGroup {
    return this.fb.group({
      staff_category_id: [null],
      employee_number: [null, Validators.required],
      title: [null, Validators.required],
      employee_surname: [null, Validators.required],
      employee_firstname: [null, Validators.required],
      employee_midname: [null, Validators.required],
      gender: [null, Validators.required],
      date_of_birth: [
        null,
        [
          Validators.required,
          ageRangeValidator(
            this.util.currentDate,
            this.minimumAge,
            this.maximumAge
          )
        ]
      ],
      rec_category: [null, Validators.required],
      user_on_ad: [false],
      sync_firstname: [null],
      sync_surname: [null],
      username: [null, Validators.required],
      send_creation_email_to: [0],
      creation_email_custom: [null, Validators.email],
      designation_id: [null],
      position_id: [null],
      reports_to: [null],
      employment_date: [null, Validators.compose([Validators.required])],
      a_confirm_date: [null],
      backup_officer_id: [null],
      is_permanent_staff: [true],
      emp_duration_from: [null],
      emp_duration_to: [null, Validators.compose([futureDateValidator(this.util.currentDate)])],
      on_payroll: [false],
      paygroup_id: [null],
      grade_id: [null, Validators.required],
      pay_newstaff_arrears: [false],
      compute_pension: [false],
      compute_nhf: [false],
      compute_tax: [false],
      user_type: [null, Validators.required],
      ent_struc_type_id: [null, Validators.required],
      ent_struc_details_id: [null],
      cost_centre_id: [null],
      roleNames: [[]]
    }, {
      validator: [
        titleCheckValidator,
        employmentExitFutureDateValidator()
      ]
    }
    );
  }

  getValidationMessages(): any {
    return {
      staff_category_id: {
        fieldTitle: `Category`,
        required: `This field is required.`
      },
      employee_number: {
        fieldTitle: `Staff Number`,
        required: `This field is required.`
      },
      title: {
        fieldTitle: `Title`,
        required: `This field is required.`
      },
      employee_surname: {
        fieldTitle: `Surname`,
        required: `This field is required.`
      },
      employee_firstname: {
        fieldTitle: `First Name`,
        required: `This field is required.`
      },
      employee_midname: {
        fieldTitle: `Middle Name`,
        required: `This field is required.`
      },
      gender: {
        fieldTitle: `Gender`,
        required: `This field is required.`
      },
      username: {
        fieldTitle: `Username`,
        required: `This field is required.`
      },
      date_of_birth: {
        fieldTitle: `Date of birth`,
        required: `This field is required.`,
        ageRange: `Your date of birth falls outside the age range`
      },
      rec_category: {
        fieldTitle: `Record Category`,
        required: `This field is required.`
      },
      employment_date: {
        fieldTitle: `Employment Date`,
        required: `This field is required.`
      },
      a_confirm_date: {
        fieldTitle: `Confirmation Date`,
      },
      emp_duration_to: {
        fieldTitle: `End Date`,
        required: `This field is required if staff is not permanent.`,
        futureDate: `Exit date can't be in the future.`,
        futureEmpDate: `Exit date can't be in the past of start date`
      },
      sync_firstname: {
        fieldTitle: `Sync Firstname`,
        required: `This field is required.`
      },
      sync_surname: {
        fieldTitle: `Sync Surname`,
        required: `This field is required.`
      },

      user_type: {
        fieldTitle: `User Type`,
        required: `This field is required.`
      },
      ent_struc_type_id: {
        fieldTitle: `Enterprise Structure Type`,
        required: `This field is required.`
      },
      ent_struc_id: {
        fieldTitle: `Enterprise Structure`,
        required: `This field is required.`
      },
      grade_id: {
        fieldTitle: `Grade`,
        required: `This field is required when employee is on payroll.`
      },
      creation_email_custom: {
        fieldTitle: `Custom Email`,
        email: `Please provide a valid email address.`,
      },
      flx: {
        fieldTitle: `Other Errors`,
        employmentExitFutureDate: `Start date cannot be after Exit date.`,
        employmentConfirmationFutureDate: `Confirmation Date can not before employment date`
      }
    };
  }



  get numberTest(): AbstractControl {
    return this.form.get('number_test');
  }

  get firstName(): AbstractControl {
    return this.form.get('employee_firstname');
  }

  get staffCategory(): AbstractControl {
    return this.form.get('staff_category_id');
  }

  get surname(): AbstractControl {
    return this.form.get('employee_surname');
  }

  get middleName(): AbstractControl {
    return this.form.get('employee_midname');
  }

  get permStaff(): AbstractControl {
    return this.form.get('is_permanent_staff');
  }

  get startDate(): AbstractControl {
    return this.form.get('emp_duration_from');
  }
  get endDate(): AbstractControl {
    return this.form.get('emp_duration_to');
  }
  get confirmationDate(): AbstractControl {
    return this.form.get('a_confirm_date');
  }
  get employmentDate(): AbstractControl {
    return this.form.get('employment_date');
  }
  get birthDate(): AbstractControl {
    return this.form.get('date_of_birth');
  }
  get employeeTitle(): AbstractControl {
    return this.form.get('title');
  }

  get employeeGender(): AbstractControl {
    return this.form.get('gender');
  }

  get employeeNumber(): AbstractControl {
    return this.form.get('employee_number');
  }

  get roles(): AbstractControl {
    return this.form.get('roleNames');
  }

  get employeeUsername(): AbstractControl {
    return this.form.get('username');
  }

  get enterpriseStructureDetail(): AbstractControl {
    return this.form.get('ent_struc_details_id');
  }
  get costCentre(): AbstractControl {
    return this.form.get('cost_centre_id');
  }

  get payGroup(): AbstractControl {
    return this.form.get('paygroup_id');
  }

  transformDate() {
    if (this.startDate.value !== null) {
      this.startDate.setValue(formatDate(this.startDate.value));
    }
    if (this.endDate.value !== null) {
      this.endDate.setValue(formatDate(this.endDate.value));
    }
    if (this.employmentDate.value !== null) {
      this.employmentDate.setValue(formatDate(this.employmentDate.value));
    }
    if (this.confirmationDate.value !== null) {
      this.confirmationDate.setValue(formatDate(this.confirmationDate.value));
    }
    if (this.birthDate.value !== null) {
      this.birthDate.setValue(formatDate(this.birthDate.value));
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

  endDateValidation() {
    if (this.permStaff.value == false) {
      this.endDate.setValidators([Validators.required]);
      this.endDate.updateValueAndValidity();
    }
  }

  init() {
    this.isAdmin = true;
    this.permanentStaff = true;
    this.showEmailType = false;
    this.showInput = false;
    this.userOnPayroll = false;
    this.form = this.buildForm();
  }
}
