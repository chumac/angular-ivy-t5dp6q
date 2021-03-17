import { Injectable } from '@angular/core';
import { ISelectOption } from '@nutela/models/core-data';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';

@Injectable()
export class TaxManagementService {

  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'code', label: 'Code'  },
    { value: 'description', label: 'Description'  },
    { value: 'current_period', label: 'Current Period'  },
    { value: 'tax_rule_text', label: 'Tax Rule'  },
  ];

  constructor() { }
}
