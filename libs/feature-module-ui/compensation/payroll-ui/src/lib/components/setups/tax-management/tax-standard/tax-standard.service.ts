import { Injectable } from '@angular/core';

import { ISelectOption } from '@nutela/models/core-data';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';
import { formatDate } from '@nutela/core-services';
import { ITaxPercentageGross } from 'libs/models/compensation/payroll/src/lib/interfaces/tax-pecentage-gross.interface';
import { FormGroup } from '@angular/forms';
import { ITaxStandard } from 'libs/models/compensation/payroll/src/lib/interfaces/tax-standard.interface';

@Injectable({
    providedIn: 'root'
})
export class TaxStandardService {
    private form: FormGroup = new FormGroup({});

    public filterList: ISelectOption[] = [
        { value: '', label: 'All Columns' },
        { value: 'tax_value', label: 'Tax Value' },
        { value: 'percentage_of_tv', label: '% of tax value' },
        { value: 'percentage_of_rm', label: '% of remainder' },
        { value: 'ignore_rm', label: 'Ignore remainder' },
        { value: 'cumulative', label: 'Cumulative' },
        { value: 'cumulative_taxable_value', label: 'Cumulative taxable value' }
    ];

    constructor() { }

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
}
