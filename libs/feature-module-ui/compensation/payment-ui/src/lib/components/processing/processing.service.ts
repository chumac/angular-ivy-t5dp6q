import { Injectable } from '@angular/core';

import { ISelectOption } from '@nutela/models/core-data';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';

@Injectable({
  providedIn: 'root'
})
export class ProcessingService {

  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'description', label: 'Type' },
    { value: 'account_no', label: 'Account Number' },
    { value: 'account_type', label: 'Account Type' },
    { value: 'source_text', label: 'Payment Source' },
    { value: 'expiry_date', label: 'Expiry Date' },
    { value: 'total_value', label: 'Total Amount' },
    { value: 'status_text', label: 'Status' },
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
