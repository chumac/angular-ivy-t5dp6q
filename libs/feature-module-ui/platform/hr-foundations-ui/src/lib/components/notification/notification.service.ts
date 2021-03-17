import { Injectable } from "@angular/core";
import { ISelectOption } from "@nutela/models/core-data";

@Injectable()
export class NotificationService {
  disabled:boolean= true;
  constructor() { }

  description = "";
  id: number;
  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'group_type', label: 'Notification To' },
    { value: 'group_value', label: 'Specific To' },
    { value: 'process_id', label: 'Process' }
  ];

  public filterListSystem: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'description', label: 'Description' },
  ];
}
