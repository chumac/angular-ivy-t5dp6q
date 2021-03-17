import { EntityState } from '@ngrx/entity';

import { lookupDataAdapter } from './lookup-data.adapter';
import { ILookupData, IOrganization } from '@nutela/models/common';
import { IInstitution, ICourse } from '@nutela/models/talent/learning';
import { ILeaveType } from '@nutela/models/workforce/leave';
import { IPersonal, IBasicOrganisation } from '@nutela/models/workforce/employee-profiles';
import { IPlan } from '@nutela/models/talent/performance';
import { IBasicData, ICountry } from '@nutela/models/core-data';

export interface ILookupDataState extends EntityState<ILookupData> {
  orgData: IOrganization,
  institutions: IInstitution[];
  professionalQualifications: IInstitution[];
  professionalInstitutions: IInstitution[];
  courses: ICourse[];
  leaveTypes: ILeaveType[];
  dailyLeaveTypes: ILeaveType[];
  hourlyLeaveTypes: ILeaveType[];
  activePersonnel: IPersonal[];
  activePersonnelHR: IPersonal[];
  performancePlans: IPlan[];
  currentPerformancePlans: IPlan[];
  faculties: IBasicData[];
  departments: IBasicData[];
  organisations: IBasicOrganisation[];
  countries: ICountry[];
}

export const initialLookupDataState: ILookupDataState = lookupDataAdapter.getInitialState({
  orgData: null,
  institutions: [],
  professionalQualifications: [],
  professionalInstitutions: [],
  courses: [],
  leaveTypes: [],
  dailyLeaveTypes: [],
  hourlyLeaveTypes: [],
  activePersonnel: [],
  activePersonnelHR: [],
  performancePlans: [],
  currentPerformancePlans: [],
  faculties: [],
  departments: [],
  organisations: [],
  countries: []
});
