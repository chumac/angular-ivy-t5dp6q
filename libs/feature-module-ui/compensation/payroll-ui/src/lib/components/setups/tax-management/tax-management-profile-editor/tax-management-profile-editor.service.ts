import { Injectable } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
    AbstractControl,
} from '@angular/forms';

import { UtilService } from '@nutela/core-services';
import { ITaxManagement } from '@nutela/models/compensation/payroll';

import { IConfigureTransaction } from 'libs/models/compensation/payroll/src/lib/interfaces/configure-transaction.interface';
import { IRangePercent } from 'libs/models/compensation/payroll/src/lib/interfaces/range-percent.interface';
import { ITaxManagementProfile } from 'libs/models/compensation/payroll/src/lib/interfaces/tax-management-profile.interface';
import { ITaxStandard } from 'libs/models/compensation/payroll/src/lib/interfaces/tax-standard.interface';

@Injectable({
    providedIn: 'root'
})
export class TaxManagementProfileEditorService {
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
            description: [null, Validators.required],
            tax_remainder_values: [false, Validators.required],
            percentage: [null],
            tax_id: [null],
            payroll_profile_id: [null]
        }, {}
        );
    }

    init(
        data: ITaxManagement
    ) {
        if (data) {
            this.form.patchValue(this.fieldData(data));
        }
    }

    fieldData(data: ITaxManagement): ITaxManagement | {} {
        if (data) {
            return {
                tax_id: data.tax_id,
                description: data.description,
                tax_remainder_values: data.tax_remainder_values,
                percentage: data.percentage,
                payroll_profile_id: data.payroll_profile_id,
            };
        } else {
            return {};
        }
    }

    getValidationMessages(): any {
        return {
            description: {
                fieldTitle: `Description`,
                required: `This field is required.`
            },
            tax_remainder_values: {
                fieldTitle: `Tax Remainder Values`,
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
