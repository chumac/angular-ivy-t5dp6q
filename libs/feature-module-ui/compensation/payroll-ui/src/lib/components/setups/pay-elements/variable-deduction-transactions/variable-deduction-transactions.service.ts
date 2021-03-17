import { Injectable } from '@angular/core';

import { ISelectOption } from '@nutela/models/core-data';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';

@Injectable()
export class VariableDeductionTransactionsService {

  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'transaction_date', label: 'Transaction Period'  },
    { value: 'employeeName', label: 'Employee'  },
    { value: 'variableDeduction', label: 'Variable Deduction'  },
    { value: 'deduct_in_period', label: 'Deduct Period'  },
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
