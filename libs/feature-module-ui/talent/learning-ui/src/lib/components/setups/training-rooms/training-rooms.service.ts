import { Injectable } from '@angular/core';
import { ISelectOption } from '@nutela/models/core-data';

@Injectable({
  providedIn: 'root'
})
export class TrainingRoomsService {
  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'code', label: 'Code' },
    { value: 'description', label: 'Description' },
    { value: 'capacity', label: 'Capacity' },
    { value: 'address', label: 'Location' },
  ];

  constructor() {}
}
