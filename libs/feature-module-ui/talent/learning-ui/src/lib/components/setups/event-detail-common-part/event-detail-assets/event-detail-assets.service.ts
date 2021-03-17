import { Injectable } from '@angular/core';
import { ISelectOption } from '@nutela/models/core-data';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {
  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'event_text', label: 'Event' },
    { value: 'asset_availability_text', label: 'Assets Availability' },
    { value: 'asset_type_text', label: 'Assets Type' },
    { value: 'asset_filename', label: 'Filename' },
  ];

  constructor() {}
}
