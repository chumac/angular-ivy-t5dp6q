import { Injectable } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
    AbstractControl,
} from '@angular/forms';

import { UtilService } from '@nutela/core-services';

import { IConfigureTransaction } from 'libs/models/compensation/payroll/src/lib/interfaces/configure-transaction.interface';

@Injectable({
    providedIn: 'root'
})
export class ConfigureCreateEditorService {
    private form: FormGroup = new FormGroup({});

    validationMessages: any;

    constructor(
        private fb: FormBuilder,
        private util: UtilService
    ) {
        this.form = this.buildForm();
        this.setExcludePercentValidators();
        this.validationMessages = this.getValidationMessages();
    }

    buildForm(): FormGroup {
        return this.fb.group({
            exclusion_id: [null],
            exclusion_det_id: [null],
            item_type: [null, Validators.required],
            item_description: [null, Validators.required],
            exclude_by_percent: [true],
            percent_value: [null, Validators.required],
            amount_value: [null],
            selected_allowance_id: [null],
        }, {

        }
        );
    }

    init(
        data: IConfigureTransaction
    ) {
        if (data) {
            this.form.patchValue(this.fieldData(data));
        }
    }

    fieldData(data: IConfigureTransaction): IConfigureTransaction | {} {
        if (data) {
            return {
                exclusion_id: data.exclusion_id,
                exclusion_det_id: data.exclusion_det_id,
                item_type: data.item_type,
                item_description: data.item_description,
                exclude_by_percent: data.exclude_by_percent,
                percent_value: data.percent_value,
                amount_value: data.amount_value,
                selected_allowance_id: data.selected_allowance_id,
            };
        } else {
            return {};
        }
    }

    getValidationMessages(): any {
        return {
            item_type: {
                fieldTitle: `Item Type`,
                required: `This field is required.`
            },
            item_description: {
                fieldTitle: `Item Description`,
                required: `This field is required.`
            },
            // exclude_by_percent: {
            //     fieldTitle: `Exclude By Percent`,
            //     required: `This field is required.`
            // },
            percent_value: {
                fieldTitle: `Percent Value`,
                required: `This field is required.`
            },
            amount_value: {
                fieldTitle: `Amount Value`,
                required: `This field is required.`
            }
        };
    }

    setExcludePercentValidators() {
        const percent_valueControl = this.form.get('percent_value');
        const amount_valueControl = this.form.get('amount_value');
    
        this.form.get('exclude_by_percent').valueChanges
          .subscribe(exclude_by_percent => {    

            if (exclude_by_percent == null || exclude_by_percent === false) {
                percent_valueControl.setValidators(null);
                amount_valueControl.setValidators([Validators.required]);
            }

            if (exclude_by_percent === true) {
                percent_valueControl.setValidators([Validators.required]);
                amount_valueControl.setValidators(null);
            }    
            percent_valueControl.updateValueAndValidity();
            amount_valueControl.updateValueAndValidity();
          });
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
