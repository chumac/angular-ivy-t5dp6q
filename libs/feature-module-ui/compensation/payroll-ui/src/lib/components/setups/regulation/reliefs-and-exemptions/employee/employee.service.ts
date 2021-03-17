import { Injectable } from '@angular/core';

import { ISelectOption } from '@nutela/models/core-data';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';
import { formatDate } from '@nutela/core-services';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'surname', label: 'Surname' },
    { value: 'midname', label: 'Midname' },
    { value: 'firstname', label: 'Firstname' },
    { value: 'gender', label: 'Gender' },
    { value: 'logon_name', label: 'Logon Name' }
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
