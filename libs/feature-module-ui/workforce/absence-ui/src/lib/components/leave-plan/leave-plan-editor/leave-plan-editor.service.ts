import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  AbstractControl
} from '@angular/forms';

import { ILeaveDailyData, ILeavePlanDetail, ILeaveContactInfo } from '@nutela/models/workforce/leave';
import { UtilService } from '@nutela/core-services';

@Injectable({
  providedIn: 'root'
})
export class LeavePlanEditorService {
  public form: FormGroup = new FormGroup({});
  public rowForm: FormGroup = new FormGroup({});

  validationMessages: any;

  constructor(private fb: FormBuilder) {
    this.form = this.buildForm();
    this.rowForm = this.buildRowForm();
    this.validationMessages = this.getValidationMessages();
  }

  buildForm(): FormGroup {
    return this.fb.group( 
      {
        EssHrLeaveplanDetails: this.fb.array([
        
      ]),
        EssHrLeavePlansMaster: this.fb.group({
          leave_plan_id: [null],
          leave_id: [null, Validators.required],
          leave_reason: [null],
          address1: [null],
          address2: [null],
          city_id: [null],
          state_id: [null],
          country_id: [null],
          zip: [null],
          telephone_no: [null],
          emergency_no: [null]
        })
      },
      {
        validator: []
      }
    );
  }

  buildRowForm(): FormGroup {
    return this.fb.group( 
      {
        leave_plan_id: [null],
        start_date: [null,  Validators.required],
        assigned_backup_id: [null,  Validators.required],
        no_of_days: [null,   [Validators.required, Validators.min(1)]],
        pay_allowance: [false],
        currency_id: [null]
      },
      {
        validator: []
      }
    );
  }

  init(data: ILeaveDailyData) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: ILeaveDailyData): ILeaveDailyData | {} {
    if (data) {
      return {
        EssHrLeaveplanDetails: data.EssHrLeaveplanDetails,
        EssHrLeavePlansMaster: data.EssHrLeavePlansMaster
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      leave_id: {
        fieldTitle: `Type`,
        required: `This field is required.`
      },
      start_date: {
        fieldTitle: `Start Date`,
        required: `This field is required.`,
        pastDate: `Start date cannot be in the past.`
      },
      no_of_days: {
        fieldTitle: `Number of Days`,
        required: `This field is required.`,
        min: `You need to specify a minimum of 1 day.`,
      },
      assigned_backup_id: {
        fieldTitle: `Backup Officer`,
        required: `This field is required.`,
      },
      flx: {
        fieldTitle: `Other Errors`
      }
    };
  }

  addLeaveDetails(formData: ILeavePlanDetail) {
    this.essHrLeaveplanDetails.push(this.fb.group(formData));
  }

  deleteLeaveDetails(index) {
    this.essHrLeaveplanDetails.removeAt(index);
  }

  resetLeaveDetails() {
    while (this.essHrLeaveplanDetails.length !== 0) {
      this.essHrLeaveplanDetails.removeAt(0);
    }
  }

  get f() {
    return this.form;
  }

  get rf() {
    return this.rowForm;
  }

  get essHrLeaveplanDetails() {
    return this.f.get('EssHrLeaveplanDetails') as FormArray;
  }

  get essHrLeavePlansMaster() {
    return this.f.get('EssHrLeavePlansMaster') as FormGroup;
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

  get leaveId(): AbstractControl {
    return this.form.get('leave_id');
  }

  get leavePlanId(): AbstractControl {
    return this.essHrLeavePlansMaster.get('leave_plan_id');
  }

  get entitlement(): AbstractControl {
    return this.form.get('entitlement');
  }

  get startDate(): AbstractControl {
    return this.form.get('start_date');
  }

  get endDate(): AbstractControl {
    return this.form.get('end_date');
  }

  get resumptionDate(): AbstractControl {
    return this.form.get('resdate');
  }

  get numberOfDays(): AbstractControl {
    return this.form.get('no_of_days');
  }

  get assignedBackupId(): AbstractControl {
    return this.form.get('assigned_backup_id');
  }

  get supervisorId(): AbstractControl {
    return this.form.get('supervisor_id');
  }

  get payAllowance(): AbstractControl {
    return this.form.get('pay_allowance');
  }

  get country(): AbstractControl {
    return this.essHrLeavePlansMaster.get('country_id');
  }

  get state(): AbstractControl {
    return this.essHrLeavePlansMaster.get('state_id');
  }

  get city(): AbstractControl {
    return this.essHrLeavePlansMaster.get('city_id');
  }

  get zip(): AbstractControl {
    return this.essHrLeavePlansMaster.get('zip');
  }

  get phone(): AbstractControl {
    return this.essHrLeavePlansMaster.get('telephone_no');
  }

  get emergencyPhone(): AbstractControl {
    return this.essHrLeavePlansMaster.get('emergency_no');
  }

  get addressOne(): AbstractControl {
    return this.essHrLeavePlansMaster.get('address1');
  }

  
  get addressTwo(): AbstractControl {
    return this.essHrLeavePlansMaster.get('address2');
  }
}
