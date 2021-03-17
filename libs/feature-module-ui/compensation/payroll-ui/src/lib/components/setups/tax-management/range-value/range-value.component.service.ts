import { Injectable } from '@angular/core';

import { ISelectOption } from '@nutela/models/core-data';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';
import { FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class RangeValueService {
    private form: FormGroup = new FormGroup({});

    public filterList: ISelectOption[] = [
        { value: '', label: 'All Columns' },
        { value: 'gross_lower', label: 'Gross lower' },
        { value: 'gross_upper', label: 'Gross upper' },
        { value: 'gross_amount', label: 'Gross amount' }
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
