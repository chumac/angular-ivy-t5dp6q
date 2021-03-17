import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';

import { ApiService } from '@nutela/core-services';

@Injectable({
  providedIn: 'root'
})
export class RecallTimeSheetService {
  private form: FormGroup = new FormGroup({});

  validationMessages: any;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.form = this.buildForm();
    this.validationMessages = this.getValidationMessages();
   }

   buildForm(): FormGroup {
    return this.fb.group({
      recall_reason: [null, Validators.required]
    });
  }

  getValidationMessages(): any {
    return {
      recall_reason: {
        fieldTitle: `Reason`,
        required: `This field is required. Enter a reason.`
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

  get recallReason(): AbstractControl {
    return this.form.get('recall_reason');
  }
}
