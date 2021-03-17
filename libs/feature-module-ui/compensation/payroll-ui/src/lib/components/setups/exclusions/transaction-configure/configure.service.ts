import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ISelectOption } from '@nutela/models/core-data';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';
import { IConfigureTransaction } from 'libs/models/compensation/payroll/src/lib/interfaces/configure-transaction.interface';

@Injectable({
    providedIn: 'root'
})
export class ConfigureService {
    private form: FormGroup = new FormGroup({});

    public filterList: ISelectOption[] = [
        { value: '', label: 'All Columns' },
        { value: 'item_type_text', label: 'Item Type' },
        { value: 'item_description', label: 'Item Description' },
        { value: 'type', label: 'Type' },
        { value: 'percent_value', label: 'Percent Value' },
        { value: 'amount_value', label: 'Amount Value' }
    ];

    constructor() { }

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
            exclusion_det_id:data.exclusion_det_id,
            item_type: data.item_type,
            item_type_text: data.item_type_text,
            item_description: data.item_description,
            allowance_id: data.allowance_id,
            deduction_id: data.deduction_id,
            varallowance_id: data.varallowance_id,
            vardeduction_id: data.vardeduction_id,
            loan_id: data.loan_id,
            exclude_by_percent: data.exclude_by_percent,
            type: data.type,
            percent_value: data.percent_value,
            amount_value: data.amount_value,
          };
        } else {
          return {};
        }
      }

    search(grid: IgxGridComponent, term: string, filterBy: string): any {
        if (grid) {
            if (filterBy) {
                grid.clearFilter();
                grid.filteringLogic = FilteringLogic.Or;
                grid.filter(
                    filterBy,
                    term,
                    IgxStringFilteringOperand.instance().condition('contains'),
                    false
                );
            } else {
                grid.clearFilter();
                grid.filteringLogic = FilteringLogic.Or;
                grid.filterGlobal(
                    term,
                    IgxStringFilteringOperand.instance().condition('contains'),
                    false
                );
            }
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