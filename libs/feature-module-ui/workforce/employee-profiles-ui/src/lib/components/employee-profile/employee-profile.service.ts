import { Injectable } from '@angular/core';

import { ISelectOption } from '@nutela/models/core-data';

@Injectable({
  providedIn: 'root'
})
export class EmployeeProfileService {

  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'employee_number', label: 'Staff Number'  },
    { value: 'title', label: 'Title' },
    { value: 'employee_surname', label: 'Surname' },
    { value: 'employee_midname', label: 'Middle name' },
    { value: 'employee_firstname', label: 'First name'  },
  ];


  constructor() { }
}
