import { ISelectOption } from "@nutela/models/core-data";
import { Injectable } from "@angular/core";
import { FilteringLogic, IgxGridComponent, IgxStringFilteringOperand } from "igniteui-angular";

@Injectable()
export class ReportService{

  constructor( ) {}

public filterListStandard: ISelectOption[] = [
  { value: '', label: 'All Columns' },
  { value: 'report_title', label: 'Report Title' },
  { value: 'description', label: 'Description' },
  { value: 'details', label: 'Details' }
];

public filterListPermission: ISelectOption[] = [
  { value: '', label: 'All Columns' },
  { value: 'description', label: 'Description' },
  { value: 'rolename', label: 'Role Name'},
  { value: 'user_rolename', label: 'User Role Name'}
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
