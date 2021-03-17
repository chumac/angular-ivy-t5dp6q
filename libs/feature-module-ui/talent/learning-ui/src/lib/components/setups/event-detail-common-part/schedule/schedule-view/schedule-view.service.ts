import { Injectable } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
    AbstractControl,
} from '@angular/forms';

import { UtilService } from '@nutela/core-services';
import { IEventSchedule } from 'libs/models/talent/learning/src/lib/interfaces/schedule.interface';

@Injectable({
    providedIn: 'root'
})
export class EventScheduleViewService {
    private form: FormGroup = new FormGroup({});

    validationMessages: any;

    constructor(
        private fb: FormBuilder,
        private util: UtilService
    ) {
        this.form = this.buildForm();
    }

    buildForm(): FormGroup {
        return this.fb.group({
            event_id: [null],
            title: [null, Validators.required],
            start_date: [null, Validators.required],
            end_date: [null, Validators.required],
            hall_id: [null, Validators.required],
        }, {

        }
        );
    }

    init(
        data: IEventSchedule
    ) {
        if (data) {
            this.form.patchValue(this.fieldData(data));
        }
    }

    fieldData(data: IEventSchedule): IEventSchedule | {} {
        if (data) {
            return {
                event_id: data.event_id,
                title: data.title,
                start_date: data.start_date,
                end_date: data.end_date,
                hall_id: data.hall_id,
            };
        } else {
            return {};
        }
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
