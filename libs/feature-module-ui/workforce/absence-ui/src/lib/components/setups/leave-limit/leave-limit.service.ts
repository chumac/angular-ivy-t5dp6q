import { Injectable } from "@angular/core";
import { ISelectOption } from "@nutela/models/core-data";

@Injectable()
export class LimitService {

    constructor( ) {}

  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'gradeInfo', label: 'Grade' },
    { value: 'leaveInfo', label: 'Type' }
  ];
}
