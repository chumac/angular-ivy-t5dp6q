import { Injectable } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
    AbstractControl,
} from '@angular/forms';

import { UtilService } from '@nutela/core-services';

import { IApprovedLoan } from 'libs/models/compensation/loans/src/lib/interfaces/approved-loan.interface';
import { IPayrollProfile } from '@nutela/models/compensation/payment';
import { IExclusionTransactionCreate } from '@nutela/models/compensation/payroll';
import { IConfigureTransactionCreate } from 'libs/models/compensation/payroll/src/lib/interfaces/configure-transaction-create.interface';
import { IExclusionClose } from 'libs/models/compensation/payroll/src/lib/interfaces/exclusion-close.inerface';

@Injectable({
    providedIn: 'root'
})
export class ExclusionCloseService {
    private form: FormGroup = new FormGroup({});

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
            unsuspend_reason: [null,Validators.required],
        }, {

        }
        );
    }

    init(
        data: IExclusionClose
    ) {
        if (data) {
            this.form.patchValue(this.fieldData(data));
        }
    }

    fieldData(data: IExclusionClose): IExclusionClose | {} {
        if (data) {
            return {
                unsuspend_reason: data.unsuspend_reason,
            };
        } else {
            return {};
        }
    }

    getValidationMessages(): any {
        return {
            unsuspend_reason: {
                fieldTitle: `Reason`,
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
