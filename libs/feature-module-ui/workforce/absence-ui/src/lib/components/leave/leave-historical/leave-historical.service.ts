import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Store } from '@ngrx/store';

import { UtilService, pastDateValidator } from '@nutela/core-services';
import { ILeaveDailyData } from '@nutela/models/workforce/leave';
import { INationalitySelectOption, IStateSelectOption } from '@nutela/models/core-data';
import { IAppState } from '@nutela/store/app-state';
import { LoadStatesLeaveApply, LoadCitiesLeaveApply } from '../../../store/leave-apply';
import { IAbsenceState } from '../../../store/root';
declare var DevExpress: any;

@Injectable()
export class LeaveHistoricalService {
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
      employee_id: [null, Validators.required],
      leave_id: [null, Validators.required],
      no_of_days: [null, [Validators.required, Validators.min(1)]],
      start_date: [null, [Validators.required]],
      end_date: [{ value: null, disabled: false}],
      resumption_date: [{ value: null, disabled: false}],
      return_reason: [null],
      leave_reason: [null],
      pay_allowance: [false],
      assigned_backup_id: [null],
      supervisor_id: [null],
      telephone_no: [null],
      emergency_no: [null],
      address1: [null],
      address2: [null],
      country_id: [null],
      state_id: [null],
      city_id: [null],
      zip: [null],
      currency_id: [null],
      supporting_document: [null],
      has_returned: [false],
      credit_back_days: [null],
      actual_return_date: [null],
      days_takenfrom_backlog: [0],
      recall_comments: [null],
      excess_days: [null],
      last_notice_date: [null],
      notify_count: [null],
      no_of_days_trans: [null],
      last_reminder_date: [null],
      is_rolled_over: [false],
      ess_source_id: [null],
      auto_rollover_date: [null],
      is_rescheduled: [false],
  

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
      if (selectOptionData && selectOptionData.Nationality) {
        this.setCountryLists(data, selectOptionData);
      }
    }
  }

  setCountryLists(data: ILeaveDailyData, selectOptionData: any) {
    if (data.NationalityInfo) {
      const countryVal = this.getNationality(
        data.NationalityInfo.nationality_id,
        selectOptionData.Nationality
      );
      if (countryVal) {
        this.store.dispatch(
          new LoadStatesLeaveApply({
            selectedCountry: countryVal
          })
        );
      }

      if (countryVal && data.StateInfo) {
        const stateVal = this.getNationalityState(
          data.StateInfo.state_id,
          countryVal.StatesList
        );
        if (stateVal) {
          this.store.dispatch(
            new LoadCitiesLeaveApply({
              selectedState: stateVal
            })
          );
        }
      }
    }
  }

  getNationality(
    nationalityId: number,
    nationalityList: INationalitySelectOption[]
  ): INationalitySelectOption | null {
    const filteredList = DevExpress.data
      .query(nationalityList)
      .filter(['value', '=', nationalityId])
      .toArray();
    return filteredList[0];
  }

  getNationalityState(
    stateId: number,
    nationalityStateList: IStateSelectOption[]
  ): IStateSelectOption | null {
    const filteredList = DevExpress.data
      .query(nationalityStateList)
      .filter(['value', '=', stateId])
      .toArray();
    return filteredList[0];
  }

  disablePreFormControls(){
    this.leaveId.disable();
    this.employeeId.disable();
    this.numberOfDays.disable();
    this.startDate.disable();
    this.endDate.disable();
    this.resumptionDate.disable();
    this.assignedBackupId.disable();
    this.supervisorId.disable();
  }

  enablePreFormControls(){
    this.leaveId.enable();
    this.employeeId.enable();
    this.numberOfDays.enable();
    this.startDate.enable();
    this.endDate.enable();
    this.resumptionDate.enable();
    this.assignedBackupId.enable();
    this.supervisorId.enable();
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
        country_id: data.NationalityInfo? data.NationalityInfo.nationality_id: 0,
        state_id: data.StateInfo? data.StateInfo.state_id: 0,
        city_id: data.CityInfo? data.CityInfo.city_id: 0,
        zip: data.zip,
        leave_trans_id: data.leave_trans_id,
        doc_size: data.doc_size
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

  get employeeId(): AbstractControl {
    return this.form.get('employee_id');
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

  get payAllowance(): AbstractControl {
    return this.form.get('pay_allowance');
  }

  get assignedBackupId(): AbstractControl {
    return this.form.get('assigned_backup_id');
  }

  get supervisorId(): AbstractControl {
    return this.form.get('supervisor_id');
  }

  get leaveReason(): AbstractControl {
    return this.form.get('leave_reason');
  }


  get telephoneNo(): AbstractControl {
    return this.form.get('telephone_no');
  } 


  get emergencyNo(): AbstractControl {
    return this.form.get('emergency_no');
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

  get transactionId(): AbstractControl {
    return this.form.get('leave_trans_id');
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
}
