import { Injectable } from '@angular/core';

import { ISelectOption } from '@nutela/models/core-data';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';

@Injectable({
  providedIn: 'root'
})
export class ProxyApplicationsService {

  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'loanType', label: 'Type'  },
    { value: 'effective_date', label: 'Effective Date'  },
    { value: 'initial_loan_amount', label: 'Initial Amount'  },
    { value: 'interest_rate', label: 'Rate'  },
    { value: 'monthly_deduction', label: 'Monthly Deduction'  },
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
