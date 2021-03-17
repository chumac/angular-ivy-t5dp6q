import { Injectable } from "@angular/core";
import { ISelectOption } from "@nutela/models/core-data";

@Injectable()
export class DaysService {

    constructor( ) {}

  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'description', label: 'Grade' },
    { value: 'ranking', label: 'Ranking' },
    { value: 'annual_leave_days', label:'Annual Leave Days'},
  ];
}
