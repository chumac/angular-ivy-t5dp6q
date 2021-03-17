import { Injectable } from '@angular/core';

import { ISelectOption } from '@nutela/models/core-data';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';

@Injectable()
export class ReviewGroupsService {

  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'code', label: 'Code' },
    { value: 'description', label: 'Description' },
    { value: 'effective_date', label: 'Effective Date' },
    { value: 'status_text', label: 'Status' },
    { value: 'created_by', label: 'Created By' },
    { value: 'created_date', label: 'Created Date' },
    { value: 'execution_date', label: 'Execution Date' },
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
