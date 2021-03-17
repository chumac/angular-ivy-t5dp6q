import { Action } from '@ngrx/store';

import { ISelectOptionData } from '@nutela/models/common';
import { ISelectOption } from '@nutela/models/core-data';
import { IBasicOrganisation } from '@nutela/models/workforce/employee-profiles';

export enum SelectOptionDataActionTypes {
  LOAD = '[SELECT OPTION DATA] Load',
  LOAD_INSTITUTIONS = '[SELECT OPTION DATA] Load Institutions',
  LOAD_PROFESSIONAL_QUALIFICATIONS = '[SELECT OPTION DATA] Load Professional Qualifications',
  LOAD_PROFESSIONAL_INSTITUTIONS = '[SELECT OPTION DATA] Load Professional Institutions',
  LOAD_FACULTIES = '[SELECT OPTION DATA] Load Faculties',
  LOAD_DEPARTMENTS = '[SELECT OPTION DATA] Load Departments',
  LOAD_ORGANISATIONS = '[SELECT OPTION DATA] Load Organisations',
  LOAD_COUNTRIES = '[SELECT OPTION DATA] Load Countries',
  LOAD_COURSES = '[SELECT OPTION DATA] Load Courses',
  LOAD_LEAVE_TYPES = '[SELECT OPTION DATA] Load Leave Types',
  LOAD_HOURLY_LEAVE_TYPES = '[SELECT OPTION DATA] Load Hourly Leave Types',
  LOAD_DAILY_LEAVE_TYPES = '[SELECT OPTION DATA] Load Daily Leave Types',
  LOAD_ACTIVE_PERSONNEL = '[SELECT OPTION DATA] Load Active Personnel',
  LOAD_HR_ACTIVE_PERSONNEL = '[SELECT OPTION DATA] Load Hr Active Personnel',
  LOAD_PERFORMANCE_PLANS = '[SELECT OPTION DATA] Load Performance Plans',
  LOAD_CURRENT_PERFORMANCE_PLANS = '[SELECT OPTION DATA] Load Current Performance Plan',
  LOAD_PROJECTS = '[SELECT OPTION DATA] Load Projects',
  LOAD_COST_CENTERS = '[SELECT OPTION DATA] Load Cost Centers',
  LOAD_WORK_HOUR_TYPES = '[SELECT OPTION DATA] Load Work Hour Types'
}

export class SelectOptionDataLoad implements Action {
  readonly type = SelectOptionDataActionTypes.LOAD;

  constructor(public payload: { selectOptionData: ISelectOptionData }) {
  }
}

export class SelectOptionDataLoadInstitutions implements Action {
  readonly type = SelectOptionDataActionTypes.LOAD_INSTITUTIONS;

  constructor(public payload: { institutions: ISelectOption[] }) {
  }
}

export class SelectOptionDataLoadProfessionalQualifications implements Action {
  readonly type = SelectOptionDataActionTypes.LOAD_PROFESSIONAL_QUALIFICATIONS;

  constructor(public payload: { professionalQualifications: ISelectOption[] }) {
  }
}

export class SelectOptionDataLoadProfessionalInstitutions implements Action {
  readonly type = SelectOptionDataActionTypes.LOAD_PROFESSIONAL_INSTITUTIONS;

  constructor(public payload: { professionalInstitutions: ISelectOption[] }) {
  }
}

export class SelectOptionDataLoadFaculties implements Action {
  readonly type = SelectOptionDataActionTypes.LOAD_FACULTIES;

  constructor(public payload: { faculties: ISelectOption[] }) {
  }
}

export class SelectOptionDataLoadDepartments implements Action {
  readonly type = SelectOptionDataActionTypes.LOAD_DEPARTMENTS;

  constructor(public payload: { departments: ISelectOption[] }) {
  }
}

export class SelectOptionDataLoadCountries implements Action {
  readonly type = SelectOptionDataActionTypes.LOAD_COUNTRIES;

  constructor(public payload: { countries: ISelectOption[] }) {
  }
}

export class SelectOptionDataLoadOrganisations implements Action {
  readonly type = SelectOptionDataActionTypes.LOAD_ORGANISATIONS;

  constructor(public payload: { organisations: IBasicOrganisation[] }) {
  }
}

export class SelectOptionDataLoadCourses implements Action {
  readonly type = SelectOptionDataActionTypes.LOAD_COURSES;

  constructor(public payload: { courses: ISelectOption[] }) {
  }
}

export class SelectOptionDataLoadLeaveTypes implements Action {
  readonly type = SelectOptionDataActionTypes.LOAD_LEAVE_TYPES;

  constructor(public payload: { leaveTypes: ISelectOption[] }) {
  }
}

export class SelectOptionDataLoadHourlyLeaveTypes implements Action {
  readonly type = SelectOptionDataActionTypes.LOAD_HOURLY_LEAVE_TYPES;

  constructor(public payload: { leaveTypes: ISelectOption[] }) {
  }
}

export class SelectOptionDataLoadDailyLeaveTypes implements Action {
  readonly type = SelectOptionDataActionTypes.LOAD_DAILY_LEAVE_TYPES;

  constructor(public payload: { dailyLeaveTypes: ISelectOption[] }) {
  }
}

export class SelectOptionDataLoadActivePersonnel implements Action {
  readonly type = SelectOptionDataActionTypes.LOAD_ACTIVE_PERSONNEL;

  constructor(public payload: { activePersonnel: ISelectOption[] }) {
  }
}

export class SelectOptionDataLoadActivePersonnelHR implements Action {
  readonly type = SelectOptionDataActionTypes.LOAD_HR_ACTIVE_PERSONNEL;

  constructor(public payload: { activePersonnelHR: ISelectOption[] }) {
  }
}

export class SelectOptionDataLoadPerformancePlans implements Action {
  readonly type = SelectOptionDataActionTypes.LOAD_PERFORMANCE_PLANS;

  constructor(public payload: { plans: ISelectOption[] }) {
  }
}

export class SelectOptionDataLoadCurrentPerformancePlans implements Action {
  readonly type = SelectOptionDataActionTypes.LOAD_CURRENT_PERFORMANCE_PLANS;

  constructor(public payload: { plans: ISelectOption[] }) {
  }
}



export class SelectOptionDataLoadProjects implements Action {
  readonly type = SelectOptionDataActionTypes.LOAD_PROJECTS;

  constructor(public payload: { projects: ISelectOption[] }) {
  }
}

export class SelectOptionDataLoadCostCenters implements Action {
  readonly type = SelectOptionDataActionTypes.LOAD_COST_CENTERS;

  constructor(public payload: { costCenters: ISelectOption[] }) {
  }
}

export class SelectOptionDataLoadWorkHourTypes implements Action {
  readonly type = SelectOptionDataActionTypes.LOAD_WORK_HOUR_TYPES;

  constructor(public payload: { workHourTypes: ISelectOption[] }) {
  }
}

export type SelectOptionDataActions =
| SelectOptionDataLoad
| SelectOptionDataLoadInstitutions
| SelectOptionDataLoadProfessionalQualifications
| SelectOptionDataLoadProfessionalInstitutions
| SelectOptionDataLoadCourses
| SelectOptionDataLoadLeaveTypes
| SelectOptionDataLoadHourlyLeaveTypes
| SelectOptionDataLoadDailyLeaveTypes
| SelectOptionDataLoadActivePersonnel
| SelectOptionDataLoadActivePersonnelHR
| SelectOptionDataLoadPerformancePlans
| SelectOptionDataLoadCurrentPerformancePlans
| SelectOptionDataLoadFaculties
| SelectOptionDataLoadDepartments
| SelectOptionDataLoadCountries
| SelectOptionDataLoadOrganisations
| SelectOptionDataLoadProjects
| SelectOptionDataLoadCostCenters
| SelectOptionDataLoadWorkHourTypes;
