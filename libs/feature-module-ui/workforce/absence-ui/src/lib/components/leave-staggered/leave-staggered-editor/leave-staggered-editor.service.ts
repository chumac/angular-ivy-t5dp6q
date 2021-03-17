import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  AbstractControl
} from '@angular/forms';

import { ILeaveDailyData, ILeaveStaggeredDetail, ILeaveStaggered, ILeaveContactInfo } from '@nutela/models/workforce/leave';
import { UtilService } from '@nutela/core-services';

@Injectable({
  providedIn: 'root'
})
export class LeaveStaggeredEditorService {
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
        DetailsModel: this.fb.array([
        
      ]),
        MasterModel: this.fb.group({
          mleave_trans_id: [null],
          leave_id: [null, Validators.required],
          leave_reason: [null],
          supervisor_id: [null],
          address1: [null],
          address2: [null],
          city_id: [null],
          state_id: [null],
          country_id: [null],
          zip: [null],
          telephone_no: [null],
          emergency_no: [null],
          doc_binary: [null],
          doc_guid: [null],
          doc_url: [null],
          doc_extension: [null],
          doc_size: [0]
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

  init(data: ILeaveStaggered) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: ILeaveStaggered): ILeaveStaggered | {} {
    if (data) {
      return {
        DetailsModel: data.DetailsModel,
        MasterModel: data.MasterModel
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
      currency_id: {
        fieldTitle: `Currency`,
        required: `This field is required.`,
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

  addLeaveDetails(formData: ILeaveStaggeredDetail) {
    this.detailsModel.push(this.fb.group(formData));
  }

  deleteLeaveDetails(index) {
    this.detailsModel.removeAt(index);
  }

  resetLeaveDetails() {
    while (this.detailsModel.length !== 0) {
      this.detailsModel.removeAt(0);
    }
  }

  get f() {
    return this.form;
  }

  get rf() {
    return this.rowForm;
  }

  get detailsModel() {
    return this.f.get('DetailsModel') as FormArray;
  }

  get masterModel() {
    return this.f.get('MasterModel') as FormGroup;
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

  patchMasterForm(value: { [key: string]: any }) {
    this.masterModel.patchValue(value);
  }

  get leaveId(): AbstractControl {
    return this.form.get('leave_id');
  }

  get leaveStaggeredId(): AbstractControl {
    return this.masterModel.get('mleave_trans_id');
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
    return this.masterModel.get('country_id');
  }

  get state(): AbstractControl {
    return this.masterModel.get('state_id');
  }

  get city(): AbstractControl {
    return this.masterModel.get('city_id');
  }

  get zip(): AbstractControl {
    return this.masterModel.get('zip');
  }

  get phone(): AbstractControl {
    return this.masterModel.get('telephone_no');
  }

  get emergencyPhone(): AbstractControl {
    return this.masterModel.get('emergency_no');
  }

  get addressOne(): AbstractControl {
    return this.masterModel.get('address1');
  }

  get addressTwo(): AbstractControl {
    return this.masterModel.get('address2');
  }
}
