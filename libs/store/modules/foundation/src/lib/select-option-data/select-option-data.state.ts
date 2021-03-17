import { EntityState } from '@ngrx/entity';

import { selectOptionDataAdapter } from './select-option-data.adapter';
import { ISelectOptionData } from '@nutela/models/common';
import { ISelectOption } from '@nutela/models/core-data';
import { IBasicOrganisation } from '@nutela/models/workforce/employee-profiles';

export interface ISelectOptionDataState  extends EntityState<ISelectOptionData> {
  institutions: ISelectOption[];
  professionalQualifications: ISelectOption[];
  professionalInstitutions: ISelectOption[];
  courses: ISelectOption[];
  leaveTypes: ISelectOption[];
  hourlyLeaveTypes: ISelectOption[];
  dailyLeaveTypes: ISelectOption[];
  activePersonnel: ISelectOption[];
  activePersonnelHR: ISelectOption[];
  performancePlans: ISelectOption[];
  currentPerformancePlans: ISelectOption[];
  faculties: ISelectOption[];
  departments: ISelectOption[];
  organisations: IBasicOrganisation[];
  projects: ISelectOption[];
  costCenters: ISelectOption[];
  workHourTypes: ISelectOption[];
  countries: ISelectOption[];
}

export const initialSelectOptionDataState: ISelectOptionDataState = selectOptionDataAdapter.getInitialState({
  institutions: [],
  professionalQualifications: [],
  professionalInstitutions: [],
  courses: [],
  leaveTypes: [],
  hourlyLeaveTypes: [],
  dailyLeaveTypes: [],
  activePersonnel: [],
  activePersonnelHR: [],
  performancePlans: [],
  currentPerformancePlans: [],
  faculties: [],
  departments: [],
  organisations: [],
  projects: [],
  costCenters: [],
  workHourTypes: [],
  countries: [],
});
