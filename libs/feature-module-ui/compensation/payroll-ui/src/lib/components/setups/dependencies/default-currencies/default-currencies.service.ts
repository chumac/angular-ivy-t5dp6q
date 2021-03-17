import { Injectable } from '@angular/core';

import { ISelectOption } from '@nutela/models/core-data';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';

@Injectable()
export class DefaultCurrenciesService {

  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'formula_code', label: 'Code' },
    { value: 'description', label: 'Description' },
    { value: 'description', label: 'Current Period' },
    { value: 'cut_off_day', label: 'Cut-off Day' },
    { value: 'tax_rule', label: 'Tax Rule' },
    { value: 'run_cycle', label: 'Run Cycle' },
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
