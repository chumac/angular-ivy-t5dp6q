import { Injectable } from '@angular/core';

import { ISelectOption } from '@nutela/models/core-data';

@Injectable({
  providedIn: 'root'
})
export class LeavePlanService {
  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'leave_type', label: 'Type' },
    { value: 'leave_reason', label: 'Reason' },

  ];

  constructor() {}
}
