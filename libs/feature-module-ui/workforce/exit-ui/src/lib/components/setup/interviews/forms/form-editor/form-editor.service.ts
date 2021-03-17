import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { UtilService } from '@nutela/core-services';

@Injectable({
  providedIn: 'root'
})
export class FormEditorService {
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
      title: ['', Validators.required],
      description: ['', Validators.required],
      specific_grade: [false],
    }
    );
  }

  init(
    data: any,
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: any): any | {} {
    if (data) {
      return {
        code: data.analysis_det_code,
        description: data.description ? data.description : null,
        headed_by: data.headed_by.employee_id ? data.headed_by.employee_id : null,
        headed_by_position: data.headed_by_position.position_id ? data.headed_by_position.position_id.toString() : null,
        link_id: data.AnalysisDetailsLinkInfo.analysis_det_id ? data.AnalysisDetailsLinkInfo.analysis_det_id.toString() : null,
        cost_center_code: data.cost_centre_code ? data.cost_centre_code : null,
        shared_code: data.shared_code ? data.shared_code : null,
        mis_code: data.mis_code ? data.mis_code : null,
        virtual_structure_link: data.link_to_nonvirtual ? data.link_to_nonvirtual : null,
        ent_struc: data.AnalysisInfo.description ? data.AnalysisInfo.description : null
      };

    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      code: {
        fieldTitle: `Code`,
        required: `This field is required.`
      },
      description: {
        fieldTitle: `Description`,
        required: `This field is required.`
      },
      headed_by: {
        fieldTitle: `Headed By`,
        required: `This field is required.`
      },
      headed_by_position: {
        fieldTitle: `Surname`,
        required: `This field is required.`
      },
      link_id: {
        fieldTitle: `First Name`,
        required: `This field is required.`
      },
      cost_center_code: {
        fieldTitle: `Middle Name`,
        required: `This field is required.`
      },
      shared_code: {
        fieldTitle: `Gender`,
        required: `This field is required.`
      },
      mis_code: {
        fieldTitle: `Username`,
        required: `This field is required.`
      },
      flx: {
        fieldTitle: `Other Errors`
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
