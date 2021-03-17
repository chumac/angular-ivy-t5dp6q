import { Injectable } from '@angular/core';
import { AbstractControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ITimeSheetProject } from '@nutela/models/workforce/time-sheet';

@Injectable({
  providedIn: 'root'
})
export class TimesheetProjectEditorService {
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
      code: ['', Validators.required],
      sub_code: ['', Validators.required],	
      description: ['', Validators.required],	
      sys_rule: [''],
      analysis_det_id: ['', Validators.required]
      }, {
        validator: []
      }
    );
  }

  init(
    data: any
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: ITimeSheetProject): ITimeSheetProject | {} {
    if (data) {
      return {
        code: data.code,	
        sub_code: data.sub_code,
        description: data.description,
        sys_rule: data.sys_rule,
        analysis_det_id: data.AnalysisDetailsMapDTO?data.AnalysisDetailsMapDTO.analysis_det_id:null
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
      sub_code: {
        fieldTitle: `Sub-Code`,
        required: `This field is required.`
      },
      description: {
        fieldTitle: `Description`,
        required: `This field is required.`
      },
      analysis_det_id: {
        fieldTitle: `Enterprise Structure`,
        required: `This field is required.`
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

  get stuctureId(): AbstractControl {
    return this.form.get('analysis_det_id');
  }

}
