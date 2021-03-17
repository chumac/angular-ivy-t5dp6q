import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, } from '@angular/forms';
import { UtilService } from '@nutela/core-services';
import { IFixedDeductionReliefUpdate } from 'libs/models/compensation/payroll/src/lib/interfaces/relief-fixedDeduction-update.interface';
import { ITaxFixedDeductionupdate } from 'libs/models/compensation/payroll/src/lib/interfaces/tax-fixedDeduction-update.interface';

@Injectable({
    providedIn: 'root'
})
export class TaxFixedDeductionService {
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
            deduction_id: [null, Validators.required],
            payroll_profile_id: [null],
        }, {

        }
        );
    }

    init(
        data: ITaxFixedDeductionupdate
    ) {
        if (data) {
            this.form.patchValue(this.fieldData(data));
        }
    }

    fieldData(data: ITaxFixedDeductionupdate): ITaxFixedDeductionupdate | {} {
        if (data) {
            return {
                deduction_id: data.deduction_id,
                payroll_profile_id: data.payroll_profile_id,
            };
        } else {
            return {};
        }
    }

    getValidationMessages(): any {
        return {
            deduction_id: {
                fieldTitle: `Fixed Deduction`,
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
