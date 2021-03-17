import { Injectable } from '@angular/core';

import { ISelectOption } from '@nutela/models/core-data';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';

@Injectable({
  providedIn: 'root'
})
export class ScheduleDetailService {

  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'fullname', label: 'Full Name' },
    { value: 'mobile_number', label: 'Mobile Number' },
    { value: 'email', label: 'Email Address' },
    { value: 'account_type', label: 'Account Type' },
    { value: 'account_no', label: 'Account Number' },
    { value: 'actual_amount', label: 'Actual Amount' },
    { value: 'payable_amount', label: 'Amount Payable' },
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
