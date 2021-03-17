import { Injectable } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class EventDetailNominationService {
    public form: FormGroup = new FormGroup({});

    validationMessages: any;

    constructor(
        private fb: FormBuilder,
    ) {
        this.form = this.buildForm();
        this.validationMessages = this.getValidationMessages();
    }

    buildForm(): FormGroup {
        return this.fb.group({
            employee_id: ['', Validators.required],
            event_id: ['', Validators.required],
            nominated_reason: [''],
        }, {

        }
        );
    }
    getValidationMessages(): any {
        return {
            employee_id: {
                fieldTitle: `Employee`,
                required: `This field is required.`
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
