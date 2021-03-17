import { Injectable } from '@angular/core';

import { ISelectOption } from '@nutela/models/core-data';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';

@Injectable()
export class ReviewPlanDetailsService {

  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'paygroup_code', label: 'Code' },
    { value: 'description', label: 'Description' },
    { value: 'rank', label: 'Current Period' },
    { value: 'estimated_tax_rate', label: 'Tax Rate' },
    { value: 'grade', label: 'Tax Rule' },
    { value: 'confirmation_status', label: 'Status' },
  ];

  public confirmationStatus: ISelectOption[] = [
    { value: 'confirmation_status', label: 'Not Applicable' },
    { value: 'confirmation_status', label: 'confirmed Only' },
    { value: 'confirmation_status', label: 'Unconfirmed Only' },
  ]

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
