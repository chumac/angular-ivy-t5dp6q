import { Injectable } from '@angular/core';
import { ISelectOption } from '@nutela/models/core-data';

@Injectable({
  providedIn: 'root'
})
export class FeedbackFormsService {
  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'event_text', label: 'Event Title' },
    { value: 'pre_requisite_type_text', label: 'Type' },
    { value: 'course_text', label: 'Course' },
  ];

  constructor() {}
}
