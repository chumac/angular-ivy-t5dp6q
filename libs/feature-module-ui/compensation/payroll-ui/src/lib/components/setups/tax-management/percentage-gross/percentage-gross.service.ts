import { Injectable } from '@angular/core';

import { ISelectOption } from '@nutela/models/core-data';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';
import { formatDate } from '@nutela/core-services';
import { ITaxPercentageGross } from 'libs/models/compensation/payroll/src/lib/interfaces/tax-pecentage-gross.interface';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PercentageGrossService {
    private form: FormGroup = new FormGroup({});
    
  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'paygroup_code', label: 'Code'  },
    { value: 'description', label: 'Description'  },
    { value: 'taxpercentongross', label: 'Tax Percent on Gross'  }
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
