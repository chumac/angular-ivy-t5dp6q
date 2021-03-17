import { Injectable } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class LearningLibraryEnrollEditorService {
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
            course_id: [''],
            start_date: [''],
        }, {
            validator: []
        }
        );
    }

    getValidationMessages(): any {
        return {
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
