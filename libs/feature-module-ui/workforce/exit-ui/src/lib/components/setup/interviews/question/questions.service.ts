import { Injectable } from '@angular/core';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';
import { ISelectOption } from '@nutela/models/core-data';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'title', label: 'Title' },
    { value: 'description', label: 'Description' },
    { value: 'gradeInfo', label: 'Grade' },
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
