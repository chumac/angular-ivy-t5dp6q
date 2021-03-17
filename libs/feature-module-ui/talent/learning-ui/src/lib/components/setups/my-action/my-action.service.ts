import { Injectable } from '@angular/core';

import { ISelectOption } from '@nutela/models/core-data';

@Injectable({
  providedIn: 'root'
})
export class MyActionService {
  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'process_type_text', label: 'Type' },
    { value: 'employee_name', label: 'Employee Name' },
    { value: 'description', label: 'Description' },
    { value: 'created_date', label: 'Created Date' },
  ];

  constructor() {}
}
