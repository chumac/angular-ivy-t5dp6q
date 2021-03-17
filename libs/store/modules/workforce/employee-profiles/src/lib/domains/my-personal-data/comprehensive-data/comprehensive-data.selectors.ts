import { createSelector, createFeatureSelector } from '@ngrx/store';
import { of } from 'rxjs';

import { IComprehensiveDataState } from './comprehensive-data.state';
import { IComprehensiveData } from '@nutela/models/workforce/employee-profiles';
import { IName } from '@nutela/models/core-data';

export const getComprehensiveDataState = createFeatureSelector<IComprehensiveDataState>('comprehensiveData');

export const getComprehensiveData = createSelector(
  getComprehensiveDataState,
  (state: IComprehensiveDataState) => <IComprehensiveData>state
);

export const getEmployeeName = createSelector(getComprehensiveData, (data: IComprehensiveData) => {
  let name: IName = {employeeId: 0};

  if (data) {
    let fullName = '';
    let displayName = '';
    let titleFullName = '';
    let titleDisplayName = '';

    name.employeeId = data.employee_id;
    name.title = data.title;
    name.firstName = data.employee_firstname;
    name.surname = data.employee_surname;
    name.middleName = data.employee_midname;

    // Full name
    fullName = fullName + data.employee_firstname;
    if (data.employee_midname !== '') {
      fullName = fullName + ' ' + data.employee_midname;
    }
    fullName = fullName + ' ' + data.employee_surname;

    // Display name
    displayName = displayName + data.employee_firstname;
    displayName = displayName + ' ' + data.employee_surname;

    // Full name with title
    if (data.title !== '') {
      titleFullName = data.title + ' ' + fullName;
    } else {
      titleFullName =  fullName;
    }

    // Display name with title
    if (data.title !== '') {
      titleDisplayName = data.title + ' ' + displayName;
    } else {
      titleDisplayName =  displayName;
    }

    name.fullName = fullName;
    name.displayName = displayName;
    name.titleFullName = titleFullName;
    name.titleDisplayName = titleDisplayName;
  }

  return name;
});


export const getMyId = createSelector(
  getComprehensiveData,
  (data: IComprehensiveData) => data.employee_id
);


export const getEmployeePhoneNumber = createSelector(getComprehensiveData, (data: IComprehensiveData) => {
  if (data) {
    if (this.data.phone != null || this.data.phone === '') {
      return this.data.phone;
    }

    if (this.data.mobile_phone != null || this.data.mobile_phone === '') {
      return this.data.mobile_phone;
    }

    if (this.data.gsm != null || this.data.gsm === '') {
      return this.data.gsm;
    }
  }

  return '';
});

export const getMyReboardMode = createSelector(getComprehensiveData, (data: IComprehensiveData) => {
  // let reboardMode: number = 0;
  if (data) {
    if (data.reboard_mode !== null) {
     return data.reboard_mode
    }
  }
})
