import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';


import { UtilService} from '@nutela/core-services';
import { IState } from '@nutela/models/platform/lookup';

@Injectable({
  providedIn: 'root'
})
export class StateEditorService {
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
      state_id:[],
      state_code:['',Validators.required],
      description: ['', Validators.required],
      nationality_id:['',Validators.required]
      }, {
        validator: []
      }
    );
  }

  init(
    data: IState,
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }




  fieldData(data: IState): IState | {} {
    if (data) {
      return {
        state_id: data.state_id,
        state_code:data.state_code,
        description: data.description,
        nationality_id:data.nationality_id,
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      description: {
        fieldTitle: `Description`,
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

  get nationalityId():AbstractControl{
    return this.form.get('nationality_id');
  }
}
