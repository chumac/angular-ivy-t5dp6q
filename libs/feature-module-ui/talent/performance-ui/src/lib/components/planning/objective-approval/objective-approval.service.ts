import { Injectable } from '@angular/core';

import { ISelectOption } from '@nutela/models/core-data';

@Injectable({
  providedIn: 'root'
})
export class ObjectiveApprovalService {
  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'visibility', label: 'Visibility' },
    { value: 'description', label: 'Description' },
    { value: 'metric', label: 'Metric' },
    { value: 'weight', label: 'Weight' },
    { value: 'target', label: 'Target' },
    { value: 'due_date', label: 'Due Date' }
  ];

  constructor() {}
}
