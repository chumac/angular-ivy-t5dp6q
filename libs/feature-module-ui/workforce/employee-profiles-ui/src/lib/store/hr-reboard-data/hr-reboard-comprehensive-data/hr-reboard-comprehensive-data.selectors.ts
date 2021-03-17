import { createSelector } from '@ngrx/store';

import { getEmployeesProfileState, IEmployeesProfileState } from '../../root/employees-profile.state';
import { IComprehensiveData } from '@nutela/models/workforce/employee-profiles';
import { IName } from '@nutela/models/core-data';

export const getHrReboardComprehensiveData = createSelector(
  getEmployeesProfileState,
  (state: IEmployeesProfileState) => state.comprehensiveData
);

export const getHrReboardEmployeeName = createSelector(
  getHrReboardComprehensiveData,
  (data: IComprehensiveData) => {
    let name: IName = {
      employeeId:null,
    };

    if (data) {
      let fullName = '';
      let displayName = '';
      let titleFullName = '';
      let titleDisplayName = '';

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
  }
)
