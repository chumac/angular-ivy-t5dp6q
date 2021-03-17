import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
} from '@angular/forms';

import { UtilService } from '@nutela/core-services';
import { IAnalysisDetail } from '@nutela/models/workforce/personnel';

@Injectable({
  providedIn: 'root'
})
export class ConnectChildrenEditorService {
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
      analysis_id: [null],
      analysis_det_id: [null]
    }
    );
  }

  init(
    data: IAnalysisDetail,
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: IAnalysisDetail): IAnalysisDetail | {} {
    if (data) {
      return {
        promote: data
      };

    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      flx: {
        fieldTitle: `Other Errors`,
        employmentExitFutureDate: `Employment date cannot be after Exit date.`
      }
    };
  }

  get promote() {
    return this.form.get('promote');
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
