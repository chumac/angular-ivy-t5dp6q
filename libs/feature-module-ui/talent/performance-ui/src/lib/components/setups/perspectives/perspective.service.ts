import { Injectable } from '@angular/core';

import { ISelectOption } from '@nutela/models/core-data';

@Injectable({
  providedIn: 'root'
})
export class PerspectivesService {
  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'code', label: 'Code' },
    { value: 'description', label: 'Description' },
    { value: 'measure', label: 'Measure' }
  ];

  constructor() {}
}
