import { Injectable } from '@angular/core';
import { FilteringLogic, IgxStringFilteringOperand, IgxGridComponent } from 'igniteui-angular';
import { ISelectOption } from '@nutela/models/core-data';

@Injectable()
export class ReboardEmployeeProfileService {

  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'employee_number', label: 'Staff Number'  },
    { value: 'title', label: 'Title' },
    { value: 'employee_surname', label: 'Surname' },
    { value: 'employee_midname', label: 'Middle name' },
    { value: 'employee_firstname', label: 'First name'  },
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
