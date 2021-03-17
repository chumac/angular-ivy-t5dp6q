import { Injectable } from '@angular/core';

import { ISelectOption } from '@nutela/models/core-data';

@Injectable({
  providedIn: 'root'
})
export class LineManagersService {
  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'role', label: 'Role' },
    { value: 'score_percent', label: 'Score Percentage' },
  ];

  constructor() {}
}