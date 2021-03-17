import { Injectable } from '@angular/core';
import { ISelectOption } from '@nutela/models/core-data';

@Injectable({
  providedIn: 'root'
})
export class EventDetailService {
  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'subject', label: 'Subject' },
    { value: 'code', label: 'Code' },
    { value: 'start', label: 'Start Date' },
    { value: 'end_date', label: 'End Date' },
    { value: 'max_class_size', label: 'Max class size' },
    { value: 'facilitator', label: 'Facilitator' },
    { value: 'status', label: 'Status' },
  ];

  constructor() {}
}
