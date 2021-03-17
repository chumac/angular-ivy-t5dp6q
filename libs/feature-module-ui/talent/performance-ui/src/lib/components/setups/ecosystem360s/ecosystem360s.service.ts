import { Injectable } from '@angular/core';

import { ISelectOption } from '@nutela/models/core-data';

@Injectable({
  providedIn: 'root'
})
export class Ecosystem360sService {
  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'role', label: 'Reviewer Role' },
    // { value: 'description', label: 'Description' },
    // { value: 'dictionary', label: 'Dictionary' }
  ];

  constructor() {}
}
