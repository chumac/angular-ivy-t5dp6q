import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';

import {
  IFamily
} from '@nutela/models/workforce/employee-profiles';
import { UtilService, futureDateValidator, greaterThanValidator } from '@nutela/core-services';
import { Store } from '@ngrx/store';
import { LoadStatesFamily, LoadCitiesFamily } from '@nutela/store/modules/workforce/employee-profiles';
import { INationalitySelectOption, IStateSelectOption } from '@nutela/models/core-data';
declare var DevExpress: any;

@Injectable({
  providedIn: 'root'
})
export class SubmissionProcessEditorService {
  public form: FormGroup = new FormGroup({});

  validationMessages: any;

  constructor(
    private fb: FormBuilder,
    private util: UtilService,
  ) {
    this.form = this.buildForm();
    this.validationMessages = this.getValidationMessages();
  }

  buildForm(): FormGroup {
    return this.fb.group({
      process_id: [null, Validators.required],
      selectedPromotions: [[]]
  }, {
        validator: []
      }
    );
  }


  getValidationMessages(): any {
    return {
      process_id: {
        fieldTitle: `Submission Process`,
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



  get process(): AbstractControl {
    return this.form.get('process_id');
  }

  get state(): AbstractControl {
    return this.form.get('state_id');
  }

  get city(): AbstractControl {
    return this.form.get('area_id');
  }
}
