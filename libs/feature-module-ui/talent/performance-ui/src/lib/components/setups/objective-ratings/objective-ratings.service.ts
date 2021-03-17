import { Injectable } from '@angular/core';

import { ISelectOption } from '@nutela/models/core-data';

@Injectable({
  providedIn: 'root'
})
export class ObjectiveRatingsService {
  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'rating_value', label: 'Value' },
    { value: 'description', label: 'Rating' },
    { value: 'dictionary', label: 'Narration' }
  ];

  constructor() {}
}
