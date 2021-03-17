import { Injectable } from '@angular/core';

import { ISelectOption } from '@nutela/models/core-data';
import { IgxStringFilteringOperand, FilteringLogic, IgxGridComponent } from 'igniteui-angular';


@Injectable({
  providedIn: 'root'
})
export class RepaymentsService {

  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'employeeInfo', label: 'Employee'  },
    { value: 'loanDefinition', label: 'Loan Type'  },
    { value: 'initial_amount', label: 'Initial Amount'  },
    { value: 'monthly_deduction', label: 'Monthly Deduction'  },
    { value: 'interest_rate', label: 'Rate'  },
    { value: 'loan_balance', label: 'Balance'  },
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
