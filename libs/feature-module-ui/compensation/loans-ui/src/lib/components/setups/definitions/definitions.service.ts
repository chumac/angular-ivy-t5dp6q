import { Injectable } from '@angular/core';

import { ISelectOption } from '@nutela/models/core-data';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';

@Injectable({
  providedIn: 'root'
})
export class DefinitionsService {

  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'description', label: 'Description'  },
    { value: 'shortname', label: 'Short Name'  },
    { value: 'interest_rate', label: 'Interest Rate'  },
    { value: 'ordering_rank', label: 'Ranking'  }
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
