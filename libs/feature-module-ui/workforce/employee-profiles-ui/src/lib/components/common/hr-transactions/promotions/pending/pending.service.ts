import { Injectable } from '@angular/core';

import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';

import { ISelectOption } from '@nutela/models/core-data';

@Injectable({
  providedIn: 'root'
})
export class PendingService {

  constructor() { }

  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'employee_name', label: 'Employee Name' },
    { value: 'current_grade', label: 'Current Grade' },
    { value: 'current_paygroup', label: 'Current Paygroup' },
    { value: 'new_grade', label: 'New Grade' },
    { value: 'new_paygroup', label: 'New Paygroup' },
    { value: 'effective_date', label: 'Effective Date' }
  ];

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
