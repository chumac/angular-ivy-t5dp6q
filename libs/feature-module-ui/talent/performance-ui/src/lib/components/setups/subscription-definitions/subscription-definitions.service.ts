import { Injectable } from '@angular/core';

import { ISelectOption } from '@nutela/models/core-data';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionDefinitionsService {
  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'subscription_type', label: 'Subscription Type' },
  ];

  constructor() {}
}
