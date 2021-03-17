import { Injectable } from '@angular/core';

import { ISelectOption } from '@nutela/models/core-data';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';
import { formatDate } from '@nutela/core-services';

@Injectable({
  providedIn: 'root'
})
export class GradesService {

  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'grade_code', label: 'Code'  },
    { value: 'description', label: 'Description'  },
    { value: 'ranking', label: 'Ranking'  }
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
