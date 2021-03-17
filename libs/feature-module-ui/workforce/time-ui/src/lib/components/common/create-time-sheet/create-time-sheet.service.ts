import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';

import { ApiService } from '@nutela/core-services';

@Injectable({
  providedIn: 'root'
})
export class CreateTimeSheetService {
  private form: FormGroup = new FormGroup({});

  validationMessages: any;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.form = this.buildForm();
    this.validationMessages = this.getValidationMessages();
   }

   buildForm(): FormGroup {
    return this.fb.group({
      end_date: [null, Validators.required],
      description: [null, Validators.compose([Validators.required, Validators.maxLength(100)])]
    });
  }

  getValidationMessages(): any {
    return {
      end_date: {
        fieldTitle: `End Date`,
        required: `This field is required. Enter Time Sheet End Date.`
      },
      description: {
        fieldTitle: `Description`,
        required: `This field is required. Enter a description.`,
        maxLength: `Should not exceed 100 characters.`
      },
      flx: {
        fieldTitle: `Other Errors`,
        nullCheck: ``
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

  get endDate(): AbstractControl {
    return this.form.get('end_date');
  }

  get description(): AbstractControl {
    return this.form.get('description');
  }
}
