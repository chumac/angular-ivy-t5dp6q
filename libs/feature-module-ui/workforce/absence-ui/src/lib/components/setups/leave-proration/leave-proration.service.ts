import { Injectable } from "@angular/core";
import { ISelectOption } from "@nutela/models/core-data";

@Injectable()
export class ProrationService {

    constructor( ) {}

  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'gradeInfo', label: 'Grade' },
    { value: 'resumption_month', label: 'Resumption Month' },
    { value: 'leave_entitlement', label: 'Leave Entitlement' }
  ];
}
