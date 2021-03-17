import { Action } from '@ngrx/store';
import { ILookupData, IOrganization } from '@nutela/models/common';
import { IInstitution, ICourse } from '@nutela/models/talent/learning';
import { ILeaveType } from '@nutela/models/workforce/leave';
import { IPersonal, IBasicOrganisation } from '@nutela/models/workforce/employee-profiles';
import { IPlan } from '@nutela/models/talent/performance';
import { IBasicData } from '@nutela/models/core-data';
import { INationality } from '@nutela/models/platform/lookup';

export enum LookupDataActionTypes {
  LOAD = '[LOOKUP DATA] Load',
  LOAD_SUCCESS = '[LOOKUP DATA] Load Success',
  LOAD_FAILURE = '[LOOKUP DATA] Load Failure',

  LOAD_INSTITUTIONS = '[LOOKUP DATA] Load Institutions',
  LOAD_INSTITUTIONS_SUCCESS = '[LOOKUP DATA] Load Institutions Success',
  LOAD_INSTITUTIONS_FAILURE = '[LOOKUP DATA] Load Institutions Failure',

  LOAD_PROFESSIONAL_QUALIFICATIONS = '[LOOKUP DATA] Load Professional Qualifications',
  LOAD_PROFESSIONAL_QUALIFICATIONS_SUCCESS = '[LOOKUP DATA] Load Professional Qualifications Success',
  LOAD_PROFESSIONAL_QUALIFICATIONS_FAILURE = '[LOOKUP DATA] Load Professional Qualifications Failure',

  LOAD_PROFESSIONAL_INSTITUTIONS = '[LOOKUP DATA] Load Professional Institutions',
  LOAD_PROFESSIONAL_INSTITUTIONS_SUCCESS = '[LOOKUP DATA] Load Professional Institutions Success',
  LOAD_PROFESSIONAL_INSTITUTIONS_FAILURE = '[LOOKUP DATA] Load Professional Institutions Failure',

  LOAD_FACULTIES = '[LOOKUP DATA] Load Faculties',
  LOAD_FACULTIES_SUCCESS = '[LOOKUP DATA] Load Faculties Success',
  LOAD_FACULTIES_FAILURE = '[LOOKUP DATA] Load Faculties Failure',

  LOAD_DEPARTMENTS = '[LOOKUP DATA] Load Departments',
  LOAD_DEPARTMENTS_SUCCESS = '[LOOKUP DATA] Load Departments Success',
  LOAD_DEPARTMENTS_FAILURE = '[LOOKUP DATA] Load Departments Failure',

  LOAD_ORGANISATIONS = '[LOOKUP DATA] Load Organisations',
  LOAD_ORGANISATIONS_SUCCESS = '[LOOKUP DATA] Load Organisations Success',
  LOAD_ORGANISATIONS_FAILURE = '[LOOKUP DATA] Load Organisations Failure',

  LOAD_COUNTRIES = '[LOOKUP DATA] Load Countries',
  LOAD_COUNTRIES_SUCCESS = '[LOOKUP DATA] Load Countries Success',
  LOAD_COUNTRIES_FAILURE = '[LOOKUP DATA] Load Countries Failure',

  LOAD_COURSES = '[LOOKUP DATA] Load Courses',
  LOAD_COURSES_SUCCESS = '[LOOKUP DATA] Load Courses Success',
  LOAD_COURSES_FAILURE = '[LOOKUP DATA] Load Courses Failure',

  LOAD_LEAVE_TYPES = '[LOOKUP DATA] Load Leave Types',
  LOAD_LEAVE_TYPES_SUCCESS = '[LOOKUP DATA] Load Leave Types Success',
  LOAD_LEAVE_TYPES_FAILURE = '[LOOKUP DATA] Load Leave Types Failure',


  LOAD_HOURLY_LEAVE_TYPES = '[LOOKUP DATA] Load Hourly Leave Types',
  LOAD_HOURLY_LEAVE_TYPES_SUCCESS = '[LOOKUP DATA] Load Hourly Leave Types Success',
  LOAD_HOURLY_LEAVE_TYPES_FAILURE = '[LOOKUP DATA] Load Hourly Leave Types Failure',

  LOAD_DAILY_LEAVE_TYPES = '[LOOKUP DATA] Load Daily Leave Types',
  LOAD_DAILY_LEAVE_TYPES_SUCCESS = '[LOOKUP DATA] Load Daily Leave Types Success',
  LOAD_DAILY_LEAVE_TYPES_FAILURE = '[LOOKUP DATA] Load Daily Leave Types Failure',

  LOAD_ACTIVE_PERSONNEL = '[LOOKUP DATA] Load Active Personnel',
  LOAD_ACTIVE_PERSONNEL_SUCCESS = '[LOOKUP DATA] Load Active Personnel Success',
  LOAD_ACTIVE_PERSONNEL_FAILURE = '[LOOKUP DATA] Load Active Personnel Failure',

  LOAD_HR_ACTIVE_PERSONNEL = '[LOOKUP DATA] Load Hr Active Personnel',
  LOAD_HR_ACTIVE_PERSONNEL_SUCCESS = '[LOOKUP DATA] Load Hr Active Personnel Success',
  LOAD_HR_ACTIVE_PERSONNEL_FAILURE = '[LOOKUP DATA] Load Hr Active Personnel Failure',

  LOAD_PERFORMANCE_PLANS = '[LOOKUP DATA] Load Performance Plans',
  LOAD_PERFORMANCE_PLANS_SUCCESS = '[LOOKUP DATA] Load Performance Plans Success',
  LOAD_PERFORMANCE_PLANS_FAILURE = '[LOOKUP DATA] Load Performance Plans Failure',

  LOAD_CURRENT_PERFORMANCE_PLANS = '[LOOKUP DATA] Load Current Performance Plan',
  LOAD_CURRENT_PERFORMANCE_PLANS_SUCCESS = '[LOOKUP DATA] Load Current Performance Plan Success',
  LOAD_CURRENT_PERFORMANCE_PLANS_FAILURE = '[LOOKUP DATA] Load Current Performance Plan Failure',

  LOAD_ORG_DATA = '[LOOKUP DATA] Load Organization Data',

  LOAD_PROJECTS = '[LOOKUP DATA] Load Projects',
  LOAD_PROJECTS_SUCCESS = '[LOOKUP DATA] Load Projects Success',
  LOAD_PROJECTS_FAILURE = '[LOOKUP DATA] Load Projects Failure',

  LOAD_COST_CENTERS = '[LOOKUP DATA] Load Cost Centers',
  LOAD_COST_CENTERS_SUCCESS = '[LOOKUP DATA] Load Cost Centers Success',
  LOAD_COST_CENTERS_FAILURE = '[LOOKUP DATA] Load Cost Centers Failure',

  LOAD_WORK_HOUR_TYPES = '[LOOKUP DATA] Load Work Hour Types',
  LOAD_WORK_HOUR_TYPES_SUCCESS = '[LOOKUP DATA] Load Work Hour Types Success',
  LOAD_WORK_HOUR_TYPES_FAILURE = '[LOOKUP DATA] Load Work Hour Types Failure'
}

export class LookupDataLoad implements Action {
  readonly type = LookupDataActionTypes.LOAD;
}

export class LookupDataLoadSuccess implements Action {
  readonly type = LookupDataActionTypes.LOAD_SUCCESS;

  constructor(public payload: { lookupData: ILookupData }) {}
}

export class LookupDataLoadFailure implements Action {
  readonly type = LookupDataActionTypes.LOAD_FAILURE;

  constructor(public error: any) {}
}



export class LoadInstitutions implements Action {
  readonly type = LookupDataActionTypes.LOAD_INSTITUTIONS;
}

export class LoadInstitutionsSuccess implements Action {
  readonly type = LookupDataActionTypes.LOAD_INSTITUTIONS_SUCCESS;

  constructor(public payload: { institutions: IInstitution[] }) {}
}

export class LoadInstitutionsFailure implements Action {
  readonly type = LookupDataActionTypes.LOAD_INSTITUTIONS_FAILURE;

  constructor(public error: any) {}
}

export class LoadProfessionalQualifications implements Action {
  readonly type = LookupDataActionTypes.LOAD_PROFESSIONAL_QUALIFICATIONS;
}

export class LoadProfessionalQualificationsSuccess implements Action {
  readonly type = LookupDataActionTypes.LOAD_PROFESSIONAL_QUALIFICATIONS_SUCCESS;

  constructor(public payload: { professionalQualifications: IInstitution[] }) {}
}

export class LoadProfessionalQualificationsFailure implements Action {
  readonly type = LookupDataActionTypes.LOAD_PROFESSIONAL_QUALIFICATIONS_FAILURE;

  constructor(public error: any) {}
}



export class LoadProfessionalInstitutions implements Action {
  readonly type = LookupDataActionTypes.LOAD_PROFESSIONAL_INSTITUTIONS;
}

export class LoadProfessionalInstitutionsSuccess implements Action {
  readonly type = LookupDataActionTypes.LOAD_PROFESSIONAL_INSTITUTIONS_SUCCESS;

  constructor(public payload: { professionalInstitution: IInstitution[] }) {}
}

export class LoadProfessionalInstitutionsFailure implements Action {
  readonly type = LookupDataActionTypes.LOAD_PROFESSIONAL_INSTITUTIONS_FAILURE;

  constructor(public error: any) {}
}



export class LoadFaculties implements Action {
  readonly type = LookupDataActionTypes.LOAD_FACULTIES;
}

export class LoadFacultiesSuccess implements Action {
  readonly type = LookupDataActionTypes.LOAD_FACULTIES_SUCCESS;

  constructor(public payload: { faculties: IBasicData[] }) {}
}

export class LoadFacultiesFailure implements Action {
  readonly type = LookupDataActionTypes.LOAD_FACULTIES_FAILURE;

  constructor(public error: any) {}
}

export class LoadDepartments implements Action {
  readonly type = LookupDataActionTypes.LOAD_DEPARTMENTS;
}

export class LoadDepartmentsSuccess implements Action {
  readonly type = LookupDataActionTypes.LOAD_DEPARTMENTS_SUCCESS;

  constructor(public payload: { departments: IBasicData[] }) {}
}

export class LoadDepartmentsFailure implements Action {
  readonly type = LookupDataActionTypes.LOAD_DEPARTMENTS_FAILURE;

  constructor(public error: any) {}
}

export class LoadOrganisations implements Action {
  readonly type = LookupDataActionTypes.LOAD_ORGANISATIONS;
}

export class LoadOrganisationsSuccess implements Action {
  readonly type = LookupDataActionTypes.LOAD_ORGANISATIONS_SUCCESS;

  constructor(public payload: { organisations: IBasicOrganisation[] }) {}
}

export class LoadOrganisationsFailure implements Action {
  readonly type = LookupDataActionTypes.LOAD_ORGANISATIONS_FAILURE;

  constructor(public error: any) {}
}

export class LoadCountries implements Action {
  readonly type = LookupDataActionTypes.LOAD_COUNTRIES;
}

export class LoadCountriesSuccess implements Action {
  readonly type = LookupDataActionTypes.LOAD_COUNTRIES_SUCCESS;

  constructor(public payload: { countries: INationality[] }) {}
}

export class LoadCountriesFailure implements Action {
  readonly type = LookupDataActionTypes.LOAD_COUNTRIES_FAILURE;

  constructor(public error: any) {}
}

export class LoadCourses implements Action {
  readonly type = LookupDataActionTypes.LOAD_COURSES;
}

export class LoadCoursesSuccess implements Action {
  readonly type = LookupDataActionTypes.LOAD_COURSES_SUCCESS;

  constructor(public payload: { courses: ICourse[] }) {}
}

export class LoadCoursesFailure implements Action {
  readonly type = LookupDataActionTypes.LOAD_COURSES_FAILURE;

  constructor(public error: any) {}
}


export class LoadLeaveTypes implements Action {
  readonly type = LookupDataActionTypes.LOAD_LEAVE_TYPES;
}

export class LoadLeaveTypesSuccess implements Action {
  readonly type = LookupDataActionTypes.LOAD_LEAVE_TYPES_SUCCESS;

  constructor(public payload: { leaveTypes: ILeaveType[] }) {}
}

export class LoadLeaveTypesFailure implements Action {
  readonly type = LookupDataActionTypes.LOAD_LEAVE_TYPES_FAILURE;

  constructor(public error: any) {}
}



export class LoadHourlyLeaveTypes implements Action {
  readonly type = LookupDataActionTypes.LOAD_HOURLY_LEAVE_TYPES;
}

export class LoadHourlyLeaveTypesSuccess implements Action {
  readonly type = LookupDataActionTypes.LOAD_HOURLY_LEAVE_TYPES_SUCCESS;

  constructor(public payload: { leaveTypes: ILeaveType[] }) {}
}

export class LoadHourlyLeaveTypesFailure implements Action {
  readonly type = LookupDataActionTypes.LOAD_HOURLY_LEAVE_TYPES_FAILURE;

  constructor(public error: any) {}
}


export class LoadDailyLeaveTypes implements Action {
  readonly type = LookupDataActionTypes.LOAD_DAILY_LEAVE_TYPES;
}

export class LoadDailyLeaveTypesSuccess implements Action {
  readonly type = LookupDataActionTypes.LOAD_DAILY_LEAVE_TYPES_SUCCESS;

  constructor(public payload: { dailyLeaveTypes: ILeaveType[] }) {}
}

export class LoadDailyLeaveTypesFailure implements Action {
  readonly type = LookupDataActionTypes.LOAD_DAILY_LEAVE_TYPES_FAILURE;

  constructor(public error: any) {}
}



export class LoadActivePersonnel implements Action {
  readonly type = LookupDataActionTypes.LOAD_ACTIVE_PERSONNEL;
}

export class LoadActivePersonnelSuccess implements Action {
  readonly type = LookupDataActionTypes.LOAD_ACTIVE_PERSONNEL_SUCCESS;

  constructor(public payload: { activePersonnel: IPersonal[] }) {}
}

export class LoadActivePersonnelFailure implements Action {
  readonly type = LookupDataActionTypes.LOAD_ACTIVE_PERSONNEL_FAILURE;

  constructor(public error: any) {}
}

export class LoadActivePersonnelHR implements Action {
  readonly type = LookupDataActionTypes.LOAD_HR_ACTIVE_PERSONNEL;
}

export class LoadActivePersonnelHRSuccess implements Action {
  readonly type = LookupDataActionTypes.LOAD_HR_ACTIVE_PERSONNEL_SUCCESS;

  constructor(public payload: { activePersonnelHR: IPersonal[] }) {}
}

export class LoadActivePersonnelHRFailure implements Action {
  readonly type = LookupDataActionTypes.LOAD_HR_ACTIVE_PERSONNEL_FAILURE;

  constructor(public error: any) {}
}


export class LoadPerformancePlans implements Action {
  readonly type = LookupDataActionTypes.LOAD_PERFORMANCE_PLANS;
}

export class LoadPerformancePlansSuccess implements Action {
  readonly type = LookupDataActionTypes.LOAD_PERFORMANCE_PLANS_SUCCESS;

  constructor(public payload: { plans: IPlan[] }) {}
}

export class LoadPerformancePlansFailure implements Action {
  readonly type = LookupDataActionTypes.LOAD_PERFORMANCE_PLANS_FAILURE;

  constructor(public error: any) {}
}

export class LoadCurrentPerformancePlans implements Action {
  readonly type = LookupDataActionTypes.LOAD_CURRENT_PERFORMANCE_PLANS;
}

export class LoadCurrentPerformancePlansSuccess implements Action {
  readonly type = LookupDataActionTypes.LOAD_CURRENT_PERFORMANCE_PLANS_SUCCESS;

  constructor(public payload: { plans: IPlan[] }) {}
}

export class LoadCurrentPerformancePlansFailure implements Action {
  readonly type = LookupDataActionTypes.LOAD_CURRENT_PERFORMANCE_PLANS_FAILURE;

  constructor(public error: any) {}
}

export class LoadOrgData implements Action {
  readonly type = LookupDataActionTypes.LOAD_ORG_DATA;

  constructor(public payload: IOrganization) {}
}

export class LoadProjects implements Action {
  readonly type = LookupDataActionTypes.LOAD_PROJECTS;
}

export class LoadProjectsSuccess implements Action {
  readonly type = LookupDataActionTypes.LOAD_PROJECTS_SUCCESS;

  constructor(public payload: { projects: IBasicData[] }) {}
}

export class LoadProjectsFailure implements Action {
  readonly type = LookupDataActionTypes.LOAD_PROJECTS_FAILURE;

  constructor(public error: any) {}
}

export class LoadCostCenters implements Action {
  readonly type = LookupDataActionTypes.LOAD_COST_CENTERS;
}

export class LoadCostCentersSuccess implements Action {
  readonly type = LookupDataActionTypes.LOAD_COST_CENTERS_SUCCESS;

  constructor(public payload: { costCenters: IBasicData[] }) {}
}

export class LoadCostCentersFailure implements Action {
  readonly type = LookupDataActionTypes.LOAD_COST_CENTERS_FAILURE;

  constructor(public error: any) {}
}

export class LoadWorkHourTypes implements Action {
  readonly type = LookupDataActionTypes.LOAD_WORK_HOUR_TYPES;

  constructor(public payload: string) {}
}

export class LoadWorkHourTypesSuccess implements Action {
  readonly type = LookupDataActionTypes.LOAD_WORK_HOUR_TYPES_SUCCESS;

  constructor(public payload: { workHourTypes: IBasicData[] }) {}
}

export class LoadWorkHourTypesFailure implements Action {
  readonly type = LookupDataActionTypes.LOAD_WORK_HOUR_TYPES_FAILURE;

  constructor(public error: any) {}
}

export type LookupDataActions =
  | LookupDataLoad
  | LookupDataLoadSuccess
  | LookupDataLoadFailure
  | LoadInstitutions
  | LoadInstitutionsSuccess
  | LoadInstitutionsFailure
  | LoadProfessionalQualifications
  | LoadProfessionalQualificationsSuccess
  | LoadProfessionalQualificationsFailure
  | LoadProfessionalInstitutions
  | LoadProfessionalInstitutionsSuccess
  | LoadProfessionalInstitutionsFailure
  | LoadFaculties
  | LoadFacultiesSuccess
  | LoadFacultiesFailure
  | LoadDepartments
  | LoadDepartmentsSuccess
  | LoadDepartmentsFailure
  | LoadOrganisations
  | LoadOrganisationsSuccess
  | LoadOrganisationsFailure
  | LoadCountries
  | LoadCountriesSuccess
  | LoadCountriesFailure
  | LoadCourses
  | LoadCoursesSuccess
  | LoadCoursesFailure
  | LoadLeaveTypes
  | LoadLeaveTypesSuccess
  | LoadLeaveTypesFailure
  | LoadActivePersonnel
  | LoadActivePersonnelSuccess
  | LoadActivePersonnelFailure
  | LoadHourlyLeaveTypes
  | LoadHourlyLeaveTypesSuccess
  | LoadHourlyLeaveTypesFailure
  | LoadDailyLeaveTypes
  | LoadDailyLeaveTypesSuccess
  | LoadDailyLeaveTypesFailure
  | LoadPerformancePlans
  | LoadPerformancePlansSuccess
  | LoadPerformancePlansFailure
  | LoadCurrentPerformancePlans
  | LoadCurrentPerformancePlansSuccess
  | LoadCurrentPerformancePlansFailure
  | LoadOrgData
  | LoadProjects
  | LoadProjectsSuccess
  | LoadProjectsFailure
  | LoadCostCenters
  | LoadCostCentersSuccess
  | LoadCostCentersFailure
  | LoadWorkHourTypes
  | LoadWorkHourTypesSuccess
  | LoadWorkHourTypesFailure;
