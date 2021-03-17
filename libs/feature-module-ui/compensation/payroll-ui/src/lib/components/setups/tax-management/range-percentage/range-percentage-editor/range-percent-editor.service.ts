import { Injectable } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
    AbstractControl,
} from '@angular/forms';

import { UtilService } from '@nutela/core-services';

import { IConfigureTransaction } from 'libs/models/compensation/payroll/src/lib/interfaces/configure-transaction.interface';
import { IRangePercent } from 'libs/models/compensation/payroll/src/lib/interfaces/range-percent.interface';
import { ITaxStandard } from 'libs/models/compensation/payroll/src/lib/interfaces/tax-standard.interface';

@Injectable({
    providedIn: 'root'
})
export class RangePercentEditorService {
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
            gross_lower: [null, Validators.required],
            gross_upper: [null, Validators.required],
            gross_percent: [null, Validators.required],
            is_annual_tax: [false, Validators.required],
            payroll_profile_id: [null],
            taxchart_id: [0]
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

    getValidationMessages(): any {
        return {
            gross_lower: {
                fieldTitle: `Gross lower`,
                required: `This field is required.`
            },
            gross_upper: {
                fieldTitle: `Gross upper`,
                required: `This field is required.`
            },
            gross_percent: {
                fieldTitle: `Gross Percent`,
                required: `This field is required.`
            },
            is_annual_tax: {
                fieldTitle: `Is Annual Tax`,
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
