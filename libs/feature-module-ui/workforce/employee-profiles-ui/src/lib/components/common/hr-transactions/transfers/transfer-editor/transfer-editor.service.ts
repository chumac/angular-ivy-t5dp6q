import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';


import { UtilService} from '@nutela/core-services';
import { ITransferTransaction } from '@nutela/models/workforce/employee-profiles';
import { transferEndDateValidator} from './transfer-editor.factory';

@Injectable()
export class TransferEditorService {
  show:boolean= false;
  public form: FormGroup = new FormGroup({});
  dat:any=null;
  loc:any=null;
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
      employee_id:[null, Validators.required],
      reporting_to_id:[null],
      current_location_structure: [null],
      current_location_details:[null],
      new_location_structure:[null, Validators.required],
      new_location_id:[null, Validators.required],
      new_location_details :[null, Validators.required],
      effective_date:[null, Validators.required],
      is_temporary:[false, Validators.required],
      current_position:[null],
      new_position:[null],
      end_date :[null],
      is_historical:[false, Validators.required],
      narration:[null],
      current_designation_id:[null],
      new_designation_id:[null]
      }, {
        validator: [transferEndDateValidator]
      }
    );
  }

  init(
    data: ITransferTransaction,
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }




  fieldData(data: ITransferTransaction): ITransferTransaction | {} {
    if (data) {
      console.log('data patch',data)
      return {
        employee_id: data.employeeInfo?data.employeeInfo.employee_id:null,
        reporting_to_id: data.EmployeeReportToInfo?data.EmployeeReportToInfo.employee_id:null,
        current_location_structure:data.currentLocationStructure?data.currentLocationStructure.analysis_id:null, //data.countryInfo? data.countryInfo.nationality_id: 0,
        current_location_details :data.currentLocationDetails?data.currentLocationDetails.analysis_det_id:null,
        new_location_structure :data.newLocationStructure?data.newLocationStructure.analysis_id:null,
        // new_location_id:1,
        new_location_details :data.newLocationDetails?data.newLocationDetails.analysis_det_id:null,
        effective_date :data.effective_date,
        is_temporary :data.is_temporary,
        current_position :data.currentPosition?data.currentPosition.position_id:null,
        new_position :data.newPosition?data.newPosition.position_id:null,
        end_date :data.end_date,
        is_historical :data.is_historical,
        narration :data.narration,
        current_designation_id :data.currentDesignationInfo?data.currentDesignationInfo.title_id:null,
        new_designation_id :data.newDesignationInfo?data.newDesignationInfo.title_id:null,
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
      new_location_structure: {
        fieldTitle: `New Location Structure Type`,
        required: `This field is required.`
      },
      new_location_details: {
        fieldTitle: `New Location`,
        required: `This field is required.`
      },
      effective_date: {
        fieldTitle: `Effective Date`,
        required: `This field is required.`
      },
      flx: {
        fieldTitle: `Other Errors`,
        transferEndFutureDate: `Effective date cannot be after End date.`,
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

  get effectiveDate(): AbstractControl {
    return this.form.get('effective_date');
  }

  get endDate(): AbstractControl {
    return this.form.get('end_date');
  }

  get currentLocationStructure(): AbstractControl {
    return this.form.get('current_location_structure_id');
  }

  get currentLocationDetails(): AbstractControl {
    return this.form.get('current_location_details_id');
  }

  get newStructureType(): AbstractControl {
    return this.form.get('new_location_structure');
  }

  get newStructureDetails(): AbstractControl {
    return this.form.get('new_location_id');
  }

  get newCostCenter(): AbstractControl {
    return this.form.get('new_location_details');
  }
}
