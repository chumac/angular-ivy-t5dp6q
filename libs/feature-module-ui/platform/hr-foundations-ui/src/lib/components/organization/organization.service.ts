import { Injectable } from "@angular/core";
import { ISelectOption } from "@nutela/models/core-data";

@Injectable()
export class OrganizationService {

  constructor() { }



  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'description', label: 'Description' },
  ];
}
