import { Injectable } from '@angular/core';

import { ISelectOption } from '@nutela/models/core-data';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';
import { formatDate } from '@nutela/core-services';

@Injectable({
  providedIn: 'root'
})
export class LastRunItemsService {

  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'a_rundate', label: 'Actual Date'  },
    { value: 'grouprunType', label: 'Group Run'  },
    { value: 'status_text', label: 'Status'  }
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

  setCancelledData({payroll_profile_id, payroll_period, grouprun, grouprun_id }): any {
    return {
      payroll_profile_id,
      payroll_period: formatDate(payroll_period),
      grouprun,
      grouprun_id
    }
  }


}
