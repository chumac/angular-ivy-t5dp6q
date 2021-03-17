import { Injectable } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';

import { UtilService } from '@nutela/core-services';
import { ITaxStandard } from 'libs/models/compensation/payroll/src/lib/interfaces/tax-standard.interface';

@Injectable({
    providedIn: 'root'
})
export class TaxStandardViewService {
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
