import { Injectable } from '@angular/core';

import { ISelectOption } from '@nutela/models/core-data';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';

@Injectable({
  providedIn: 'root'
})
export class EventDetailListingService {

  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'event_text', label: 'Event Text'  },
    { value: 'title', label: 'Title'  },
    { value: 'start_date', label: 'Start date'  },
    { value: 'end_date', label: 'End Date' },
    { value: 'hall_text', label: 'Hall Text' },
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