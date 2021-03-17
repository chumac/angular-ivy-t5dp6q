import { Injectable } from '@angular/core';

import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';

import { ISelectOption } from '@nutela/models/core-data';

@Injectable({
  providedIn: 'root'
})
export class DisciplinaryActionsService {

  constructor() { }

  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'issue_to_employee', label: 'Issued To' },
    { value: 'issued_by_role', label: 'Who Issued' },
    { value: 'issued_by_employee', label: 'Issued By' },
    { value: 'issue_detail', label: 'Issue Detail'},
    { value: 'event_date', label: 'Event Date' }
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
