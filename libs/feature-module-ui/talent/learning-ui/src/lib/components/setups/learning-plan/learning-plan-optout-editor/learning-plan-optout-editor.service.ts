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
export class LearningPlanOptOutEditorService {
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
            opt_out_reason: ['', Validators.required],
        }, {
            validator: []
        }
        );
    }

    getValidationMessages(): any {
        return {
            opt_out_reason: {
                fieldTitle: `Opt-Out Reason`,
                required: `This field is required.`
            },
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

}
