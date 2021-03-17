import { ISelectOption } from "@nutela/models/core-data";
import { Injectable } from "@angular/core";

@Injectable()
export class WorkFlowDefinitionService{
  constructor( ) {}

public filterList: ISelectOption[] = [
  { value: '', label: 'All Columns' },
  { value: 'description', label: 'Description' }
];

}
