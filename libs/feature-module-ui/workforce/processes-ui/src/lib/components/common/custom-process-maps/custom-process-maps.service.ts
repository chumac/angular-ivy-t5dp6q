import { Injectable } from '@angular/core';

import { ISelectOption } from '@nutela/models/core-data';

@Injectable({
  providedIn: 'root'
})
export class CustomProcessMapsService {
  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'section_title', label: 'Section Title' },
    { value: 'rank', label: 'Rank' },
    { value: 'description', label: 'Description' },
  ];

  constructor() {}
}
