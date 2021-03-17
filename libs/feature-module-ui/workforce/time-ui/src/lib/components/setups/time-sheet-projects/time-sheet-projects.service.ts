import { Injectable } from '@angular/core';
import { ISelectOption } from '@nutela/models/core-data';

@Injectable()
export class TimeSheetProjectsService {
  constructor() { }
  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'code', label: 'Code' },
    { value: 'sub_code', label: 'Sub-Code' },
    { value: 'description', label: 'Description' }
  ];
}
