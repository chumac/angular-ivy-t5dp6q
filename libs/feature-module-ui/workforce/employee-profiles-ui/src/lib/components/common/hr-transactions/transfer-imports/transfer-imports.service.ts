import { Injectable } from '@angular/core';

import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';

import { ISelectOption } from '@nutela/models/core-data';

@Injectable()
export class TransferImportService {
batchId:number;
  constructor() { }

  public filterList: ISelectOption[] = [
    { value: '', label: 'All' },
    { value: 'emp_fullname', label: 'Employee Name' },
    { value: 'review_status_text', label: 'Appraisal Stage' },
    { value: 'role_text', label: 'Location' },
    { value: 'reviewer_fullname', label: 'Reviewer' },
    { value: 'exemption_status', label: 'Exemption Status' }
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
