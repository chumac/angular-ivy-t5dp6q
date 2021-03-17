import { Injectable } from '@angular/core';

import { ISelectOption } from '@nutela/models/core-data';

@Injectable()

export class FeedbackService {
  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'code', label: 'Code' },
    { value: 'description', label: 'Description' },
  ];

  constructor() {}
}
