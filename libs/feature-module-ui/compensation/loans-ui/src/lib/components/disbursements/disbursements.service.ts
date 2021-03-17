import { Injectable } from '@angular/core';

import { ISelectOption } from '@nutela/models/core-data';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';

@Injectable({
  providedIn: 'root'
})
export class DisbursementsService {

  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'loan', label: 'Loan Type'  },
    { value: 'book_date', label: 'Book Date'  },
    { value: 'monthly_deduction', label: 'Monthly Deduction'  },
    { value: 'initial_loan_amount', label: 'Initial Amount'  },
    { value: 'tenor_months', label: 'Tenor'  }
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
