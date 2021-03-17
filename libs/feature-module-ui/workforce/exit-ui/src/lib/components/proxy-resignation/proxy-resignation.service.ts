import { Injectable } from '@angular/core';

import { ISelectOption } from '@nutela/models/core-data';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { UtilService, formatDate } from '@nutela/core-services';
import { IResignationLetter } from '../../interfaces';

@Injectable()
export class ProxyResignationService {

  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'fullname', label: 'Fullname' },
    { value: 'logon_name', label: 'Username' }
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
