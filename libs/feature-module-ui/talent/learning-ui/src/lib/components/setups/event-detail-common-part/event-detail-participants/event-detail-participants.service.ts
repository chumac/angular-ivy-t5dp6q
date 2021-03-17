import { Injectable } from '@angular/core';

import { ISelectOption } from '@nutela/models/core-data';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';

@Injectable({
  providedIn: 'root'
})
export class EventParticipantsService {

  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'event_text', label: 'Event Text'  },
    { value: 'employee_name', label: 'Employee Name'  },
    { value: 'schedule_text', label: 'Schedule Text'  },
    { value: 'source_text', label: 'Source Text' },
    { value: 'recommendation_un', label: 'Recommendation Un' },
    { value: 'recommendation_source_text', label: 'Recommendation Source Text' },
  ];

  constructor() { }


  search(grid: IgxGridComponent, term: string, filterBy: string): any {
    if (grid) {
      if (filterBy) {
        grid.clearFilter();
        grid.filteringLogic = FilteringLogic.Or;
        grid.filter(
          filterBy,
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      } else {
        grid.clearFilter();
        grid.filteringLogic = FilteringLogic.Or;
        grid.filterGlobal(
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      }
    }
  }
}