import { Injectable } from '@angular/core';

import { ISelectOption } from '@nutela/models/core-data';

@Injectable({
  providedIn: 'root'
})
export class WorkflowDefinitionsService {
  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'code', label: 'Code' },
    { value: 'description', label: 'Description' },
    { value: 'eligibility_rule', label: 'Eligibility Rule' }
  ];

  constructor() {}
}
