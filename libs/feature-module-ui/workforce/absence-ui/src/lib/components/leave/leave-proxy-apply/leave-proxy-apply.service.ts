import { Injectable } from '@angular/core';

import { ISelectOption } from '@nutela/models/core-data';

@Injectable()
export class LeaveProxyApplyService {
  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'leave_type', label: 'Type' },
    { value: 'start_date', label: 'Start Date' },
    { value: 'end_date', label: 'End Date' },
    { value: 'resumption_date', label: 'Resumption Date' },
    { value: 'number_of_days', label: 'No. of Days' },
];

  constructor() {}
}