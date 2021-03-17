import { Injectable } from '@angular/core';

import { ISelectOption } from '@nutela/models/core-data';

@Injectable({
  providedIn: 'root'
})
export class FormTemplatesService {
  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'eligibility_rule', label: 'Eligibility rule' },
    { value: 'description', label: 'Description' },
  ];

  constructor() {}
}
