import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  AbstractControl,
  Validators,
} from '@angular/forms';
import { ITeamDeployment } from '@nutela/models/workforce/employee-profiles';

@Injectable({
  providedIn: 'root'
})
export class TeamDeploymentEditorService {
  public form: FormGroup = new FormGroup({});
  validationMessages: any;

  constructor(
    private fb: FormBuilder 
  ) {
    this.form = this.buildForm();
    this.validationMessages = this.getValidationMessages();
  }

  buildForm(): FormGroup {
    return this.fb.group({
      employee_id: [null, Validators.required],
      s_local_type_id: [null],
      s_local_detail_id: [null],
      structure_change: [false],
      d_local_type_id: [null],
      d_local_detail_id: [null],
      effective_date: [null, Validators.required],
      is_temporary: [false],
      revert_date: [null],
      role_change: [false],
      c_position_id: [null],
      n_position_id: [null],
      reason_for_action: [null],
      reports_to_change: [false],
      report_to_id: [null]
      // transaction_type: [null],
      }, {
        validator: []
      }
    );
  }

  init(
    data: ITeamDeployment
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: ITeamDeployment): ITeamDeployment | {} {
    if (data) {
      return {
      employee_id: data.employee_id,
      s_local_type_id: data.s_local_type_id,
      s_local_detail_id: data.s_local_detail_id,
      structure_change: data.structure_change,
      d_local_type_id: data.d_local_type_id,
      d_local_detail_id: data.d_local_detail_id,
      effective_date: data.effective_date,
      is_temporary: data.is_temporary,
      revert_date: data.revert_date,
      role_change: data.role_change,
      c_position_id: data.c_position_id,
      n_position_id: data.n_position_id,
      reason_for_action: data.reason_for_action,
      reports_to_change: data.reports_to_change,
      report_to_id: data.report_to_id
      // transaction_type: data.transaction_type,
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      employee_id: {
        fieldTitle: `Employee`,
        required: `This field is required.`,
        // pastDate: `Start date cannot be in the past.`
      },
      s_local_type_id: {
        fieldTitle: `Source Location Type`,
        required: `This field is required.`,
      },
      s_local_detail_id: {
        fieldTitle: `Source Location`,
        required: `This field is required.`,
      },
      d_local_type_id: {
        fieldTitle: `Destination Location Type`,
        required: `This field is required.`,
      },
      d_local_detail_id: {
        fieldTitle: `Destination Location`,
        required: `This field is required.`,
      },
      effective_date: {
        fieldTitle: `Effective Date`,
        required: `This field is required.`,
      },
      revert_date: {
        fieldTitle: `Revert Date`,
        required: `This field is required.`,
      },
      c_position_id: {
        fieldTitle: `Current Position`,
        required: `This field is required.`,
      },
      n_position_id: {
        fieldTitle: `New Position`,
        required: `This field is required.`,
      },
      report_to_id: {
        fieldTitle: `Report to officer`,
        required: `This field is required.`,
      },
      flx: {}
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


  get changeStructure(): AbstractControl {
    return this.form.get('structure_change');
  }
  get sourceStrTypeId(): AbstractControl {
    return this.form.get('s_local_type_id');
  }
  get sourceStrDetailId(): AbstractControl {
    return this.form.get('s_local_detail_id');
  }
  get destinationStrTypeId(): AbstractControl {
    return this.form.get('d_local_type_id');
  }
  get destinationStrDetailId(): AbstractControl {
    return this.form.get('d_local_detail_id');
  }
  get effectiveDate(): AbstractControl {
    return this.form.get('effective_date');
  }


  get isTemporary(): AbstractControl {
    return this.form.get('is_temporary');
  }
  get revertDate(): AbstractControl {
    return this.form.get('revert_date');
  }


  get changeRole(): AbstractControl {
    return this.form.get('role_change');
  }
  get currentPosId(): AbstractControl {
    return this.form.get('c_position_id');
  }
  get newPosId(): AbstractControl {
    return this.form.get('n_position_id');
  }


  get changeReportTo(): AbstractControl {
    return this.form.get('reports_to_change');
  }
  get reportToId(): AbstractControl {
    return this.form.get('report_to_id');
  }

}

