import { Injectable } from '@angular/core';

import { ISelectOption } from '@nutela/models/core-data';

@Injectable({
  providedIn: 'root'
})
export class RecommendationsService {
  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'description', label: 'Description' },
  ];

  constructor() {}
}
