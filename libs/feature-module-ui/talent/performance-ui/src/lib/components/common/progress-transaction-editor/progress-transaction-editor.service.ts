import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ProgressTransactionEditorService {
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
      transaction_date: [null, Validators.required],
      progress_type_id: [null],
      progress_type: [null],
      perc_complete: [null],
      actual_complete_date: [null],
      comment: [null],
      doc_binary: [null],
      doc_extension: [null],
      is_active:  [true]
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

  fieldData(data: any): any | {} {
    if (data) {
      return {
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      transaction_date: {
        fieldTitle: `Transaction Date`,
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

  get progressTypeId(): AbstractControl {
    return this.form.get('progress_type_id');
  }

  get progressType(): AbstractControl {
    return this.form.get('progress_type');
  }

}
