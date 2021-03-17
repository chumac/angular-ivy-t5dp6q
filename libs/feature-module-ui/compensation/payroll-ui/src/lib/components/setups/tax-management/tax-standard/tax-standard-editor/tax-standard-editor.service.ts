import { Injectable } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
    AbstractControl,
} from '@angular/forms';

import { UtilService } from '@nutela/core-services';

import { IConfigureTransaction } from 'libs/models/compensation/payroll/src/lib/interfaces/configure-transaction.interface';
import { ITaxStandard } from 'libs/models/compensation/payroll/src/lib/interfaces/tax-standard.interface';

@Injectable({
    providedIn: 'root'
})
export class TaxStandardEditorService {
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
            step: [null, Validators.required],
            tax_value: [null, Validators.required],
            percentage_of_tv: [null, Validators.required],
            percentage_of_rm: [null],
            ignore_rm: [false, Validators.required],
            cumulative: [null, Validators.required],
            cumulative_taxable_value: [null],
            payroll_profile_id: [null],
            description: [null],
            tax_remainder_values: [null],
            percentage: [null],
            tax_id: [null],
            percantage_of_tv: [null],
        }, {

        }
        );
    }

    init(
        data: ITaxStandard
    ) {
        if (data) {
            this.form.patchValue(this.fieldData(data));
        }
    }

    fieldData(data: ITaxStandard): ITaxStandard | {} {
        if (data) {
            return {
                step: data.step,
                tax_value: data.tax_value,
                percentage_of_tv: data.percentage_of_tv,
                percentage_of_rm: data.percentage_of_rm,
                ignore_rm: data.ignore_rm,
                cumulative: data.cumulative,
                cumulative_taxable_value: data.cumulative_taxable_value,
                payroll_profile_id: data.payroll_profile_id,
            };
        } else {
            return {};
        }
    }

    getValidationMessages(): any {
        return {
            step: {
                fieldTitle: `Step`,
                required: `This field is required.`
            },
            tax_value: {
                fieldTitle: `Tax Value`,
                required: `This field is required.`
            },
            percentage_of_tv: {
                fieldTitle: `% of tax value`,
                required: `This field is required.`
            },
            percentage_of_rm: {
                fieldTitle: `% of remainder`,
                required: `This field is required.`
            },
            ignore_rm: {
                fieldTitle: `Ignore remainder`,
                required: `This field is required.`
            },
            cumulative: {
                fieldTitle: `Cumulative`,
                required: `This field is required.`
            },
            cumulative_taxable_value: {
                fieldTitle: `Cumulative taxable value`,
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
