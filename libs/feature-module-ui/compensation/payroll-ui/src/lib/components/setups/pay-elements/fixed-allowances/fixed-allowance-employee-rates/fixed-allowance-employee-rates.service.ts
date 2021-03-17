import { Injectable } from '@angular/core';

import { ISelectOption } from '@nutela/models/core-data';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';

@Injectable({
  providedIn: 'root'
})
export class FixedAllowanceEmployeeRatesService {

  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'employeename', label: 'Employee'  },
    { value: 'pay_amount', label: 'Amount'  },
    { value: 'pay_formula_type', label: 'Formula'  },
    { value: 'eff_date_from', label: 'Start Date'  },
    { value: 'eff_date_to', label: 'End Date'  },
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
