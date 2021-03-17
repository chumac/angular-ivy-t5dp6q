import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';

import { Observable } from 'rxjs/internal/Observable';

import { ApiService } from '@nutela/core-services';

@Injectable({
  providedIn: 'root'
})
export class AppraisalReRouteService {
  private form: FormGroup = new FormGroup({});

  validationMessages: any;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.form = this.buildForm();
    this.validationMessages = this.getValidationMessages();
   }

   buildForm(): FormGroup {
    return this.fb.group({
      employee: [null, Validators.required]
    });
  }

  getValidationMessages(): any {
    return {
      employee: {
        fieldTitle: `Employee`,
        required: `Select employee to re-route to.`
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

  get employee(): AbstractControl {
    return this.form.get('employee');
  }
}
