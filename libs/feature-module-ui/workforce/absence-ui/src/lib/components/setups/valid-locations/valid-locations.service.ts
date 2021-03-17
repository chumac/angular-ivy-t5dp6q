import { Injectable } from '@angular/core';

import { ISelectOption } from '@nutela/models/core-data';

@Injectable({
  providedIn: 'root'
})
export class ValidLocationsService {
  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'location_address_pattern', label: 'Location address' },
  ];

  constructor() {}
}
