import { Injectable } from '@angular/core';

import { ISelectOption } from '@nutela/models/core-data';

@Injectable({
  providedIn: 'root'
})
export class FormTemplateDetailsService {
  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'ReviewFormInfo', label: 'Review Form' },
    { value: 'asset_type', label: 'Asset type' },
    { value: 'weight', label: 'Weight' },
    { value: 'page_rank', label: 'Page Rank' }
  ];

  constructor() {}
}
