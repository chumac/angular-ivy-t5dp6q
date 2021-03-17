import { Injectable } from '@angular/core';

import { ISelectOption } from '@nutela/models/core-data';

@Injectable({
  providedIn: 'root'
})
export class RatingAssetDetailsService {
  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'title', label: 'Title' },
    { value: 'detail', label: 'Detail' },
    { value: 'info', label: 'Information' }
  ];

  constructor() {}
}
