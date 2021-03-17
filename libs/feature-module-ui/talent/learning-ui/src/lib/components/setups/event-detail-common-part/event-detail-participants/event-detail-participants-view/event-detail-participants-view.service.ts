import { Injectable } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
    AbstractControl,
} from '@angular/forms';

import { UtilService } from '@nutela/core-services';
import { IEventParticipants } from 'libs/models/talent/learning/src/lib/interfaces/event-participants.interface';

@Injectable({
    providedIn: 'root'
})
export class EventParticipantsViewService {
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
            employee_id: [null, Validators.required],
            schedule_id: [null],
            source: [null, Validators.required],
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
