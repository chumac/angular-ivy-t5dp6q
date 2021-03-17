import { Injectable } from '@angular/core';

import { ISelectOption } from '@nutela/models/core-data';

@Injectable({
  providedIn: 'root'
})
export class TimeAttendancesService {
  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'transaction_date', label: 'Date' },
    { value: 'clock_in_time', label: 'In' },
    { value: 'standard_time', label: 'Time' },
    { value: 'day_type', label: 'Type' },
    { value: 'day_name', label: 'Day' },
    { value: 'employee_status_text', label: 'Status' },
    { value: 'absence_classification', label: 'Absence Type' },
  ];

  public months: ISelectOption[] = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' }
  ];

  public years = this.getYears();
  public currentYear = new Date().getFullYear();
  public currentMonth = new Date().getMonth() + 1;


  getYears() {
    const yearsArr: ISelectOption[] = [];
    const currentYear = new Date().getFullYear();
    const halfRange = 15;
    const minYear = currentYear - halfRange;
    const maxYearCount = (halfRange * 2) + minYear;
    for (let index = minYear; index < maxYearCount; index++) {
      yearsArr.push({value: index, label: index.toString()});
    }

    return yearsArr;
  }

  constructor() {}
}
