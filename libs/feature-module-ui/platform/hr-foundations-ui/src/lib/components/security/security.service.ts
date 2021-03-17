import { ISelectOption } from "@nutela/models/core-data";
import { Injectable } from "@angular/core";

@Injectable()
export class SecurityService{

  constructor( ) {}

public filterList: ISelectOption[] = [
  { value: '', label: 'All Columns' },
  { value: 'action_taken', label: 'Action Requested' },
  { value: 'action_taken_by', label: 'Requested By'}
];



}
