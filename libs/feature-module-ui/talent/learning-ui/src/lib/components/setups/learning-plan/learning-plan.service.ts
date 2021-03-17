import { Injectable } from '@angular/core';
import { ISelectOption } from '@nutela/models/core-data';

@Injectable({
  providedIn: 'root'
})
export class LearningPlanService {
  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'course', label: 'Course' },
    { value: 'start_date', label: 'Start date' },
    { value: 'end_date', label: 'End Date' },
    { value: 'type', label: 'Type' },
    { value: 'status', label: 'Status' },
    { value: 'subject', label: 'Subject' },
  ];

  constructor() {}
}
