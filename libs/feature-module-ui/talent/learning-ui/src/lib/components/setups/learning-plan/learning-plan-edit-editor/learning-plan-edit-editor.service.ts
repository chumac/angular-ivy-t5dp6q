import { Injectable } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class LearningPlanEditEditorService {
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
            event_title: ['', Validators.required],
        }, {
            validator: []
        }
        );
    }

    getValidationMessages(): any {
        return {
            event_title: {
                fieldTitle: `Event`,
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

    patch(value: { [key: string]: any }) {
        this.form.patchValue(value);
    }

}
