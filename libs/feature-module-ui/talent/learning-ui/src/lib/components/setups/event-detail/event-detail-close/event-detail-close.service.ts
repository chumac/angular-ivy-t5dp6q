import { Injectable } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
    AbstractControl,
} from '@angular/forms';

import { UtilService } from '@nutela/core-services';
import { IEventDetailData } from '@nutela/models/talent/learning';
import { IEventSchedule } from 'libs/models/talent/learning/src/lib/interfaces/schedule.interface';

@Injectable({
    providedIn: 'root'
})
export class EventDetailCLoseService {
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
            id: [null],
            event_title: [null],
            start_date: [null],
            description: [null],
            checked:false,
            completion_date : [null, Validators.required]
        }, {

        }
        );
    }

    init(
        data: IEventDetailData
    ) {
        if (data) {
            this.form.patchValue(this.fieldData(data));
        }
    }

    fieldData(data: IEventDetailData): IEventDetailData | {} {
        if (data) {
            return {
                id: data.id,
                event_title: data.event_title,
                start_date: data.start_date,
                end_date: data.end_date,
                description: data.description,
            };
        } else {
            return {};
        }
    }

    getValidationMessages(): any {
        return {
            completion_date: {
                fieldTitle: `Completion Date`,
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
