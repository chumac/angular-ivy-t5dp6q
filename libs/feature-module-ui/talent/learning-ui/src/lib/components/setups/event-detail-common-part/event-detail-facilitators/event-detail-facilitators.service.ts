import { Injectable } from '@angular/core';

import { ISelectOption } from '@nutela/models/core-data';

@Injectable({
  providedIn: 'root'
})
export class FacilitatorsService {
  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'event_text', label: 'Event' },
    { value: 'email_address', label: 'Email Address' },
    { value: 'fac_firstname', label: 'Firstname' },
    { value: 'fac_surname', label: 'Surname' },

  ];

  constructor() {}
}
