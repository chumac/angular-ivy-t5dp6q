import { Injectable } from '@angular/core';

import { ISelectOption } from '@nutela/models/core-data';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'report_title', label: 'Title' },
    { value: 'description', label: 'Description' }
  ];

  constructor() {}
}
