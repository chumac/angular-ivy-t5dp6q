import { Injectable } from '@angular/core';

import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';

import { ISelectOption } from '@nutela/models/core-data';

@Injectable({
  providedIn: 'root'
})
export class TeamDeploymentService {

  constructor() { }

  public tfilterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'current_location_details_text', label: 'Current Location' },
    { value: 'new_location_details_text', label: 'New Location' },
    { value: 'current_position_text', label: 'Current Position' },
    { value: 'new_position_text', label: 'New Position' },
  ];

  public dfilterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 's_local_detail_id_text', label: 'Source Location' },
    { value: 'd_local_detail_id_text', label: 'Destination Location' },
    { value: 'c_position_text', label: 'Current Position' },
    { value: 'n_position_text', label: 'New Position' },
  ];

}
