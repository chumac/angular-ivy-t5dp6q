import { Injectable } from "@angular/core";
import { ISelectOption } from "@nutela/models/core-data";

@Injectable()
export class DefinitionService {

    constructor( ) {}

  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'description', label: 'Description' }
  ];

  public calendar: {value:number, label:string}[]= [
    {value: 0, label: "Financial"},
    {value: 1, label: "Standard"},
  ];

  public Use_days: {value:number, label:string}[]= [
    {value: 0, label: "Calendar days"},
    {value: 1, label: "Working days"},
  ];
}
