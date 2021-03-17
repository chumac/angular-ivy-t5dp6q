import { ISelectOption } from "@nutela/models/core-data";
import { Injectable } from "@angular/core";

@Injectable()
export class WorkFlowDetailsService{
 public description:string = "";
  constructor( ) {}

public filterList: ISelectOption[] = [
  { value: '', label: 'All Columns' },
  { value: 'sendto_type', label: 'Send To' },
  { value: 'can_escalate', label: 'Escalates' },
  { value: 'escalate_hour', label: 'Escalates in Hours' }
];

}
