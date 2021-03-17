import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  FormControl,
} from '@angular/forms';

import { UtilService, futureDateValidator, ageRangeValidator } from '@nutela/core-services';
import { IEnterpriseStructure } from '../../../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseStructureTypeEditorService {
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
      analysis_Code: [''],
      description: [''],
      ranking: [0],
      has_address: [false],
      Known_type: [''],
      can_transfer: [false],
      analysis_id_link: [0],
      usefor_organization_chart: [false],
      has_virtual_links: [false],
    }
    );
  }

  init(
    data: IEnterpriseStructure,
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: IEnterpriseStructure): IEnterpriseStructure | {} {

    if (data) {

      return {
        analysis_Code: data.analysis_Code,
        description: data.description,
        ranking: data.ranking,
        has_address: data.has_address,
        Known_type: data.Known_type,
        can_transfer: data.can_transfer? data.can_transfer : false,
        analysis_id_link: data.analysis_id_link,
        usefor_organization_chart: data.usefor_organization_chart,
        has_virtual_links: data.has_virtual_links,

      };

    } else {
      return {};
    }
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
        required: `This field is required.`,
        futureDate: `Employment date can't be in the future.`
      },
      a_confirm_date: {
        fieldTitle: `Confirm Date`,
        employmentConfirmedDate: `This date must be thesame with Employment Date.`
      },
      emp_duration_from: {
        fieldTitle: `Start Date`,
        required: `This field is required.`,
        futureDate: `Start date can't be in the future.`,

      },
      emp_duration_to: {
        fieldTitle: `End Date`,
        required: `This field is required if staff is not permanent.`,
        futureDate: `Exit date can't be in the future.`,
        futureEmpDate: `Exit date can't be in the future of start date`
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
        fieldTitle: `Pay Grade`,
        required: `This field is required when employee is on payroll.`
      },
      flx: {
        fieldTitle: `Other Errors`,
        employmentExitFutureDate: `Employment date cannot be after Exit date.`
      }
    };
  }

  get knownType() {
    return this.form.get('Known_type') as FormControl;
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
