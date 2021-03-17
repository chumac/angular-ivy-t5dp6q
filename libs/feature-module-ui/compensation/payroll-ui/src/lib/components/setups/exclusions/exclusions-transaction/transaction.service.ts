import { Injectable } from '@angular/core';

import { ISelectOption } from '@nutela/models/core-data';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'employee_name', label: 'Employee Name'  },
    { value: 'exclusion_type_text', label: 'Scope'  },
    { value: 'rule', label: 'Rule'  },
    { value: 'start_date', label: 'Starting '  },
    { value: 'end_date', label: 'Ending '  },
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
