import { ISelectOption } from "@nutela/models/core-data";
import { Injectable } from "@angular/core";

@Injectable()
export class WorkFlowMapService{

  constructor( ) {}

public filterList: ISelectOption[] = [
  { value: '', label: 'All Columns' },
  { value: 'SysEntities', label: 'System Entities'},
  { value: 'WorkflowDefintion', label: 'Workflow'}
];

}
