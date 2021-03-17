import { Injectable } from '@angular/core';

import { ISelectOption } from '@nutela/models/core-data';

@Injectable({
  providedIn: 'root'
})
export class HrCustomDataFormsService {
  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'code', label: 'Code' },
    { value: 'title', label: 'Title' },
    { value: 'description', label: 'Description' },
    { value: 'status_text', label: 'Status' },
    { value: 'approval_text', label: 'Approval' },
  ];

  constructor() {}
}
