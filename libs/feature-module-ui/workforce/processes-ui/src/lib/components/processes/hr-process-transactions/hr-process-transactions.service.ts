import { Injectable } from '@angular/core';

import { ISelectOption } from '@nutela/models/core-data';

@Injectable({
  providedIn: 'root'
})
export class HrProcessTransactionsService {
  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'employee_name', label: 'Employee' },
    { value: 'process_id_text', label: 'Process' },
    { value: 'is_complete', label: 'Complete' },
    { value: 'status_text', label: 'Status' },
    { value: 'transaction_date', label: 'Date' },
  ];

  constructor() {}
}
