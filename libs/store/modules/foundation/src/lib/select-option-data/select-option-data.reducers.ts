import { selectOptionDataAdapter } from './select-option-data.adapter';
import {
  initialSelectOptionDataState,
  ISelectOptionDataState
} from './select-option-data.state';
import {
  SelectOptionDataActions,
  SelectOptionDataActionTypes
} from './select-option-data.actions';

export function SelectOptionDataReducer(
  state = initialSelectOptionDataState,
  action: SelectOptionDataActions
): ISelectOptionDataState {
  switch (action.type) {
    case SelectOptionDataActionTypes.LOAD:
      return selectOptionDataAdapter.addOne(action.payload.selectOptionData, state);
    case SelectOptionDataActionTypes.LOAD_INSTITUTIONS:
      return { ...state, institutions: action.payload.institutions };

    case SelectOptionDataActionTypes.LOAD_PROFESSIONAL_QUALIFICATIONS:
      return { ...state, professionalQualifications: action.payload.professionalQualifications };
    case SelectOptionDataActionTypes.LOAD_PROFESSIONAL_INSTITUTIONS:
      return { ...state, professionalInstitutions: action.payload.professionalInstitutions };

    case SelectOptionDataActionTypes.LOAD_FACULTIES:
      return { ...state, faculties: action.payload.faculties };
    case SelectOptionDataActionTypes.LOAD_DEPARTMENTS:
      return { ...state, departments: action.payload.departments };
    case SelectOptionDataActionTypes.LOAD_ORGANISATIONS:
      return { ...state, organisations: action.payload.organisations };
    case SelectOptionDataActionTypes.LOAD_COUNTRIES:
      return { ...state, countries: action.payload.countries };

    case SelectOptionDataActionTypes.LOAD_COURSES:
      return { ...state, courses: action.payload.courses };
    case SelectOptionDataActionTypes.LOAD_LEAVE_TYPES:
      return { ...state, leaveTypes: action.payload.leaveTypes };
    case SelectOptionDataActionTypes.LOAD_HOURLY_LEAVE_TYPES:
      return { ...state, hourlyLeaveTypes: action.payload.leaveTypes };
    case SelectOptionDataActionTypes.LOAD_DAILY_LEAVE_TYPES:
      return { ...state, dailyLeaveTypes: action.payload.dailyLeaveTypes };
    case SelectOptionDataActionTypes.LOAD_ACTIVE_PERSONNEL:
      return { ...state, activePersonnel: action.payload.activePersonnel };
    case SelectOptionDataActionTypes.LOAD_HR_ACTIVE_PERSONNEL:
      return { ...state, activePersonnelHR: action.payload.activePersonnelHR };
    case SelectOptionDataActionTypes.LOAD_PERFORMANCE_PLANS:
      return { ...state, performancePlans: action.payload.plans };
    case SelectOptionDataActionTypes.LOAD_CURRENT_PERFORMANCE_PLANS:
      return { ...state, currentPerformancePlans: action.payload.plans };
    case SelectOptionDataActionTypes.LOAD_PROJECTS:
      return { ...state, projects: action.payload.projects };
    case SelectOptionDataActionTypes.LOAD_COST_CENTERS:
      return { ...state, costCenters: action.payload.costCenters };
    // case SelectOptionDataActionTypes.LOAD_WORK_HOUR_TYPES:
    //   return { ...state, workHourTypes: action.payload.workHourTypes };
    default: {
      return state;
    }
  }
}
