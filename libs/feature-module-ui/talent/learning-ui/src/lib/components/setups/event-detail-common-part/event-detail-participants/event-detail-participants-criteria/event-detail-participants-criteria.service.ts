import { Injectable } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
    AbstractControl,
} from '@angular/forms';

import { UtilService } from '@nutela/core-services';
import { IEventDetailData, IEventParticipants } from '@nutela/models/talent/learning';

@Injectable({
    providedIn: 'root'
})
export class EventDetailCriteriaService {
    public form: FormGroup = new FormGroup({});

    validationMessages: any;

    constructor(
        private fb: FormBuilder,
        private util: UtilService
    ) {
        this.form = this.buildForm();
        this.validationMessages = this.getValidationMessages();
    }

    buildForm(): FormGroup {
        return this.fb.group({
            event_id: [null],
            employee_id: [null],
            schedule_id: [null, Validators.required],
            source: [0, Validators.required],
            is_recommendation: [null, Validators.required],
        }, {

        }
        );
    }

    init(
        data: IEventParticipants
    ) {
        if (data) {
            this.form.patchValue(this.fieldData(data));
        }
    }

    fieldData(data: IEventParticipants): IEventParticipants | {} {
        if (data) {
            return {
                event_id: data.event_id,
                employee_id: data.employee_id,
                schedule_id: data.schedule_id,
                source: data.source,
                is_recommendation: data.is_recommendation,
            };
        } else {
            return {};
        }
    }

    getValidationMessages(): any {
        return {
            source: {
                fieldTitle: `Source`,
                required: `This field is required.`
            },
            is_recommendation: {
                fieldTitle: `Is Recommendation`,
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
