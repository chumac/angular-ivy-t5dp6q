import { lookupDataAdapter } from './lookup-data.adapter';
import { initialLookupDataState, ILookupDataState } from './lookup-data.state';
import {
  LookupDataActions,
  LookupDataActionTypes
} from './lookup-data.actions';

export function lookupDataReducer(
  state = initialLookupDataState,
  action: LookupDataActions
): ILookupDataState {
  switch (action.type) {
    case LookupDataActionTypes.LOAD_SUCCESS:
      return lookupDataAdapter.addOne(action.payload.lookupData, state);
    case LookupDataActionTypes.LOAD_FAILURE:
      return state;
    case LookupDataActionTypes.LOAD_INSTITUTIONS_SUCCESS:
      return { ...state, institutions: action.payload.institutions };
    case LookupDataActionTypes.LOAD_INSTITUTIONS_FAILURE:
      return state;

    case LookupDataActionTypes.LOAD_PROFESSIONAL_QUALIFICATIONS_SUCCESS:
      return { ...state, professionalQualifications: action.payload.professionalQualifications };
    case LookupDataActionTypes.LOAD_PROFESSIONAL_QUALIFICATIONS_FAILURE:
      return state;

    case LookupDataActionTypes.LOAD_PROFESSIONAL_INSTITUTIONS_SUCCESS:
      return { ...state, professionalQualifications: action.payload.professionalInstitution };
    case LookupDataActionTypes.LOAD_PROFESSIONAL_INSTITUTIONS_FAILURE:
      return state;

    case LookupDataActionTypes.LOAD_FACULTIES_SUCCESS:
      return { ...state, faculties: action.payload.faculties };
    case LookupDataActionTypes.LOAD_FACULTIES_FAILURE:
      return state;
    case LookupDataActionTypes.LOAD_DEPARTMENTS_SUCCESS:
      return { ...state, departments: action.payload.departments };
    case LookupDataActionTypes.LOAD_DEPARTMENTS_FAILURE:
      return state;
    case LookupDataActionTypes.LOAD_ORGANISATIONS_SUCCESS:
      return { ...state, organisations: action.payload.organisations };
    case LookupDataActionTypes.LOAD_ORGANISATIONS_FAILURE:
      return state;
    case LookupDataActionTypes.LOAD_COUNTRIES_SUCCESS:
      return { ...state, countries: action.payload.countries };
    case LookupDataActionTypes.LOAD_COUNTRIES_FAILURE:
      return state;

    case LookupDataActionTypes.LOAD_COURSES_SUCCESS:
      return { ...state, courses: action.payload.courses };
    case LookupDataActionTypes.LOAD_COURSES_FAILURE:
      return state;
    case LookupDataActionTypes.LOAD_LEAVE_TYPES_SUCCESS:
      return { ...state, leaveTypes: action.payload.leaveTypes };
    case LookupDataActionTypes.LOAD_LEAVE_TYPES_FAILURE:
      return state;

    case LookupDataActionTypes.LOAD_HOURLY_LEAVE_TYPES_SUCCESS:
      return { ...state, hourlyLeaveTypes: action.payload.leaveTypes };
    case LookupDataActionTypes.LOAD_HOURLY_LEAVE_TYPES_FAILURE:
      return state;

    case LookupDataActionTypes.LOAD_DAILY_LEAVE_TYPES_SUCCESS:
      return { ...state, dailyLeaveTypes: action.payload.dailyLeaveTypes };
    case LookupDataActionTypes.LOAD_DAILY_LEAVE_TYPES_FAILURE:
      return state;

    case LookupDataActionTypes.LOAD_ACTIVE_PERSONNEL_SUCCESS:
      return { ...state, activePersonnel: action.payload.activePersonnel };
    case LookupDataActionTypes.LOAD_LEAVE_TYPES_FAILURE:
      return state;

    case LookupDataActionTypes.LOAD_PERFORMANCE_PLANS_SUCCESS:
      return { ...state, performancePlans: action.payload.plans };
    case LookupDataActionTypes.LOAD_PERFORMANCE_PLANS_FAILURE:
      return state;

    case LookupDataActionTypes.LOAD_CURRENT_PERFORMANCE_PLANS_SUCCESS:
      return { ...state, currentPerformancePlans: action.payload.plans };
    case LookupDataActionTypes.LOAD_CURRENT_PERFORMANCE_PLANS_FAILURE:
      return state;

    case LookupDataActionTypes.LOAD_ORG_DATA:
      return { ...state, orgData: action.payload };
    default: {
      return state;
    }
  }
}



