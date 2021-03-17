import { Injectable } from '@angular/core';

import { ISelectOption } from '@nutela/models/core-data';

@Injectable({
  providedIn: 'root'
})
export class ExemptsService {
  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'emp_fullname', label: 'Employee' },
    { value: 'PlanningInfo', label: 'Plan' },
    { value: 'is_specific_plan_exempt', label: 'Is Specific' }
  ];

  constructor() {}
}
