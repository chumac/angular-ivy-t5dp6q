import { Injectable } from '@angular/core';

import { ISelectOption } from '@nutela/models/core-data';

@Injectable({
  providedIn: 'root'
})
export class WorkFlowStepsService {
  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'step', label: 'Step' },
    { value: 'role', label: 'Role' },
    { value: 'sys_rule', label: 'System Rule' }
  ];

  constructor() {}
}
