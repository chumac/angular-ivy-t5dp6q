import { Injectable } from '@angular/core';

import { ISelectOption } from '@nutela/models/core-data';

@Injectable({
  providedIn: 'root'
})
export class ControlsService {
  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'asset_type', label: 'Asset Type' },
    { value: 'description', label: 'Description' },
    { value: 'widget', label: 'Widget' },
    { value: 'rank', label: 'Rank' }
  ];

  constructor() {}
}
