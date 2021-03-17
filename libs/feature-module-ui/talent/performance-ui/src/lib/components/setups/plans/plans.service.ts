import { Injectable } from '@angular/core';

import { ISelectOption } from '@nutela/models/core-data';

@Injectable({
  providedIn: 'root'
})
export class PlansService {
  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'code', label: 'Code' },
    { value: 'description', label: 'Description' },
    { value: 'business_rule', label: 'Business Rule' },
    { value: 'period_start_date', label: 'Period Start Date' },
    { value: 'period_end_date', label: 'Period End date' }

  ];

  constructor() {}
}
