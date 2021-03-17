import { Injectable } from "@angular/core";

import { Store } from "@ngrx/store";

import { IAppState } from "@nutela/store/app-state";
import { ISelectOption } from "@nutela/models/core-data";
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from "igniteui-angular";

@Injectable({
  providedIn: 'root'
})
export class EnterpriseStructureTypeService {

  constructor(private store: Store<IAppState>) {}

  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'description', label: 'Description'  },
    { value: 'Known_type', label: 'Known Type'  },
    { value: 'ranking', label: 'Ranking'  }
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
