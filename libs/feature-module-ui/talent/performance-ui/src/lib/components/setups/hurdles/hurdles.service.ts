import { Injectable } from '@angular/core';

import { ISelectOption } from '@nutela/models/core-data';

@Injectable({
  providedIn: 'root'
})
export class HurdlesService {
  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'code', label: 'Code' },
    { value: 'description', label: 'Description' },
    { value: 'range_lower', label: 'Lower Range' },
    { value: 'range_higher', label: 'Higher Range' }

  ];

  constructor() {}
}
