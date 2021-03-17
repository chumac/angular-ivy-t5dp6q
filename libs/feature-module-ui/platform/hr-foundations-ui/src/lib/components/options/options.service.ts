import { ISelectOption } from "@nutela/models/core-data";
import { Injectable } from "@angular/core";

@Injectable()
export class OptionsService{
description:string;
helptext: string;

  constructor( ) {}

public filterListGlobal: ISelectOption[] = [
  { value: '', label: 'All Columns' },
  { value: 'description', label: 'Description' },
];

public filterListCustom: ISelectOption[] = [
  { value: '', label: 'All Columns' },
  { value: 'description', label: 'Description' },
  { value: 'option_value', label: 'Current Value' }
];

}
