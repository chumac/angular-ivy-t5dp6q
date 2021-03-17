import { Injectable } from '@angular/core';

import { ISelectOption } from '@nutela/models/core-data';
import { IPerspectiveRating } from '@nutela/models/talent/performance';

@Injectable({
  providedIn: 'root'
})
export class PersepectiveRatingsService {
  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'eligibility_rule', label: 'Eligibility rule' },
    { value: 'weight', label: 'Weight' },
    { value: 'perspective_description', label: 'Perspective' },

  ];

  constructor() {}
}
