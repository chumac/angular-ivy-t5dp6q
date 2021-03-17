import { Injectable } from '@angular/core';

import { ISelectOption } from '@nutela/models/core-data';

@Injectable({
  providedIn: 'root'
})
export class PerformanceDashboardsService {
  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'rating_value', label: 'Ratings value' },
    { value: 'description', label: 'Description' },
  ];

  constructor() {}
}
