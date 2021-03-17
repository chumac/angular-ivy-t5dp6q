import { Injectable } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
    AbstractControl,
} from '@angular/forms';

import { UtilService } from '@nutela/core-services';

import { IRangePercent } from 'libs/models/compensation/payroll/src/lib/interfaces/range-percent.interface';

@Injectable({
    providedIn: 'root'
})
export class RangePercentViewService {
    public form: FormGroup = new FormGroup({});

    validationMessages: any;

    constructor(
        private fb: FormBuilder,
        private util: UtilService
    ) {
        this.form = this.buildForm();
    }

    buildForm(): FormGroup {
        return this.fb.group({
        }, {}
        );
    }

    init(
        data: IRangePercent
    ) {
        if (data) {
            this.form.patchValue(this.fieldData(data));
        }
    }

    fieldData(data: IRangePercent): IRangePercent | {} {
        if (data) {
            return {
                taxchart_id: data.taxchart_id,
                payroll_profile_id: data.payroll_profile_id,
                payroll_profile_id_text: data.payroll_profile_id_text,
                gross_lower: data.gross_lower,
                gross_upper: data.gross_upper,
                use_rule: data.use_rule,
                gross_percent: data.gross_percent,
                gross_amount: data.gross_amount,
                approval_status: data.approval_status,
                is_annual_tax: data.is_annual_tax,
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
