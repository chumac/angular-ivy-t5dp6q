import { ISelectOption } from "@nutela/models/core-data";
import { Injectable } from "@angular/core";
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';

@Injectable()
export class templateService{
  constructor( ) {}

public filterList: ISelectOption[] = [
  { value: '', label: 'All Columns' },
  { value: 'description', label: 'Description' },
];

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
