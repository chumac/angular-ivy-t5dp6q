import { Injectable } from '@angular/core';

import { ISelectOption } from '@nutela/models/core-data';
import { FilteringLogic, IgxStringFilteringOperand, IgxGridComponent } from 'igniteui-angular';

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {

  constructor() { }

  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'loanTypeDescription', label: 'Loan Type' },
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
