import { Injectable } from '@angular/core';

import { ISelectOption } from '@nutela/models/core-data';

@Injectable({
  providedIn: 'root'
})
export class FeedbackQuestionsService {
  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'question_text', label: 'Question' },
  ];

  constructor() {}
}
