import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Store } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';
import { ILeaveDailyData, ILeaveContactInfo } from '@nutela/models/workforce/leave';
import { IAppState } from '@nutela/store/app-state';
import { IAbsenceState } from '../../../store/root';
declare var DevExpress: any;

@Injectable({
  providedIn: 'root'
})
export class LeaveApplyContinueService {
  public form: FormGroup = new FormGroup({});

  validationMessages: any;

  constructor(
    private fb: FormBuilder,
    private util: UtilService,
    private store: Store<IAbsenceState>,
  ) {
    this.form = this.buildForm();
    this.validationMessages = this.getValidationMessages();
  }

  buildForm(): FormGroup {
    return this.fb.group({
      leave_id: [null, Validators.required],
      entitlement: [{ value: '', disabled: true}],
      start_date: [null, [Validators.required]],
      end_date: [{ value: null, disabled: false}],
      resumption_date: [{ value: null, disabled: false}],
      no_of_days: [null, [Validators.required, Validators.min(1)]],
      pay_allowance: [false],
      assigned_backup_id: [null],
      supervisor_id: [null],
      leave_reason: [null],
      telephone_no: [null],
      emergency_no: [null],
      address1: [null],
      address2: [null],
      country_id: [null],
      state_id: [null],
      city_id: [null],
      zip: [null],
      doc_binary: [null],
      doc_size: [0],
      doc_extension: [null],
      leave_trans_id: [null],
      currency_id: [null],
      supporting_document: [null],
      reschedule_id: [null],
      doc_url: [null],
      doc_guid: [null],
      }, {
        validator: []
      }
    );
  }

  init(
    data: ILeaveDailyData,
    selectOptionData: any
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }

  disablePreFormControls(){
    this.leaveId.disable();
    this.numberOfDays.disable();
    this.startDate.disable();
    this.endDate.disable();
    this.resumptionDate.disable();
    // this.assignedBackupId.disable();
    // this.supervisorId.disable();
  }

  enablePreFormControls(){
    this.leaveId.enable();
    this.numberOfDays.enable();
    this.startDate.enable();
    this.endDate.enable();
    this.resumptionDate.enable();
    // this.assignedBackupId.enable();
    // this.supervisorId.enable();
  }

  resetFormControls() {
    // this.employeeId.setValue('');
    // this.leaveId.setValue('');
    this.entitlement.setValue('');
    this.startDate.setValue(null);
    this.endDate.setValue(null);
    this.resumptionDate.setValue(null);
    this.numberOfDays.setValue(null);
    // this.payAllowance.setValue(false);
    this.assignedBackupId.setValue(null);
    this.supervisorId.setValue(null);
    this.country.setValue(null);
    this.state.setValue(null);
    this.city.setValue(null);
  }

  fieldData(data: ILeaveDailyData): ILeaveDailyData | {} {
    if (data) {
      return {
        leave_id: data.LeaveInfo.leave_id,
        entitlement: data.entitlement,
        start_date: data.start_date,
        end_date: data.end_date,
        resumption_date: data.resumption_date,
        no_of_days: data.no_of_days,
        pay_allowance: data.pay_allowance,
        assigned_backup_id: data.assigned_backup_id,
        supervisor_id: data.supervisor_id,
        leave_reason: data.leave_reason,
        telephone_no: data.telephone_no,
        emergency_no: data.emergency_no,
        address1: data.address1,
        address2: data.address2,
        country_id: data.NationalityInfo? data.NationalityInfo.nationality_id: null,
        state_id: data.StateInfo? data.StateInfo.state_id: null,
        city_id: data.CityInfo? data.CityInfo.city_id: null,
        zip: data.zip,
        leave_trans_id: data.leave_trans_id,
        doc_size: data.doc_size? data.doc_size:'0'
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
      flx: {
        fieldTitle: `Other Errors`,
        availableDays: `Number of Days requested is more than your current leave balance.`
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

  get leaveId(): AbstractControl {
    return this.form.get('leave_id');
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
    return this.form.get('resumption_date');
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
    return this.form.get('country_id');
  }

  get state(): AbstractControl {
    return this.form.get('state_id');
  }

  get city(): AbstractControl {
    return this.form.get('city_id');
  }
  get addressOne(): AbstractControl {
    return this.form.get('address1');
  }
  get addressTwo(): AbstractControl {
    return this.form.get('address2');
  }
  get zip(): AbstractControl {
    return this.form.get('zip');
  }
  get phone(): AbstractControl {
    return this.form.get('telephone_no');
  }
}
