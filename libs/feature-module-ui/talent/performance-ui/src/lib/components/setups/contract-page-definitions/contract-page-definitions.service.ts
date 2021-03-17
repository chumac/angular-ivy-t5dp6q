import { Injectable } from '@angular/core';

import { ISelectOption } from '@nutela/models/core-data';

@Injectable({
  providedIn: 'root'
})
export class ContractPageDefinitionsService {
  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'title', label: 'Title' },
    { value: 'body', label: 'Body' },
    { value: 'must_agree_text', label: 'Must agree text' }
  ];

  constructor() {}
}
