import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { IProcessTransactionMaster } from '@nutela/models/workforce/employee-profiles';

@Injectable({
  providedIn: 'root'
})
export class TeamProcessTransactionsEditorService {
  private form: FormGroup = new FormGroup({});
  validationMessages: any;

  constructor(
    private fb: FormBuilder
  ) {
    this.form = this.buildForm();
    this.validationMessages = this.getValidationMessages();
  }

  buildForm(): FormGroup {
    return this.fb.group({
      // code: [null, Validators.required],
      // title: [null, Validators.required],
      // description: [null, Validators.required],
      // area:  [null, Validators.required],
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

  fieldData(data: IProcessTransactionMaster): IProcessTransactionMaster | {} {
    if (data) {
      return {
        // code: data.code,
        // title: data.title,
        // description: data.description,
        // area:  data.area,
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
      title: {
        fieldTitle: `Title`,
        required: `This field is required.`
      },
      description: {
        fieldTitle: `Description`,
        required: `This field is required.`
      },
      workflow_id: {
        fieldTitle: `Workflow`,
        required: `This field is required.`
      },
      area: {
        fieldTitle: `Area`,
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

  get ratingValue(): AbstractControl {
    return this.form.get('rating_value');
  }

  get description(): AbstractControl {
    return this.form.get('description');
  }

}
