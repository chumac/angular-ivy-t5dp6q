import { Injectable } from '@angular/core';

import { ISelectOption } from '@nutela/models/core-data';

@Injectable({
  providedIn: 'root'
})
export class ProvisioningService {

  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'employee_number', label: 'Staff Number' },
    { value: 'employee_surname', label: 'Surname' },
    { value: 'employee_firstname', label: 'Firstname'  },
    { value: 'username', label: 'Username'  },
    { value: 'employment_date', label: 'Employment Date'  },
  ];


  constructor() { }
}
