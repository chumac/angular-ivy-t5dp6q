import { ISelectOption } from "@nutela/models/core-data";
import { Injectable } from "@angular/core";

@Injectable()
export class WorkFlowMapAltService{

  constructor( ) {}

public filterList: ISelectOption[] = [
  { value: '', label: 'All Columns' },
  { value: 'SysEntitesInfo', label: 'System Entities'},
  { value: 'description', label: 'Workflow'}
];

public filterSingle: ISelectOption[] = [
  { value: '', label: 'All Columns' },
  { value: 'SysEntitesInfo', label: 'System Entities'},
  { value: 'description', label: 'Workflow'}
];

}
