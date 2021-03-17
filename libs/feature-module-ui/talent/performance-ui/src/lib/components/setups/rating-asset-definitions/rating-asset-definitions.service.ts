import { Injectable } from '@angular/core';

import { ISelectOption } from '@nutela/models/core-data';

@Injectable({
  providedIn: 'root'
})
export class RatingAssetDefinitionsService {
  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'title', label: 'Title' },
    { value: 'description', label: 'Description' },
    { value: 'role_360', label: 'Role 360' }
  ];

  constructor() {} 
}
