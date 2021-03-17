import { Injectable } from '@angular/core';

import { ISelectOption } from '@nutela/models/core-data';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'title', label: 'Title' },
    { value: 'description', label: 'Description' },
    { value: 'created_date', label: 'Date '}
  ];

  constructor() {}
}
