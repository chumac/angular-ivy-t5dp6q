import { Injectable } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class MyActionFeedbackFormService {
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
            nominated_replace_id: ['', Validators.required],
            mgr_comment: ['', Validators.required],
        }, {
            validator: []
        }
        );
    }

    getValidationMessages(): any {
        return {
            nominated_replace_id: {
                fieldTitle: `Employee Id`,
                required: `This field is required.`
            },
            mgr_comment: {
                fieldTitle: `Manager Comment`,
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
