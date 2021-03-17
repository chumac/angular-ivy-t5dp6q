import { initialCustomProcessLookupState, ICustomProcessLookupState } from './custom-process-lookup.state';
import { CustomProcessLookupActions, CustomProcessLookupActionTypes } from './custom-process-lookup.actions';
import { ISelectOption } from 'dist/libs/models/core-data';
import { IPersonal } from '@nutela/models/workforce/employee-profiles';

export function customProcessLookupReducer(
  state = initialCustomProcessLookupState,
  action: CustomProcessLookupActions
): ICustomProcessLookupState {
  switch (action.type) {
    case CustomProcessLookupActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case CustomProcessLookupActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case CustomProcessLookupActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case CustomProcessLookupActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case CustomProcessLookupActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case CustomProcessLookupActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case CustomProcessLookupActionTypes.INITIATING:
      return { ...state, isInitiating: true };
    case CustomProcessLookupActionTypes.NOT_INITIATING:
      return { ...state, isInitiating: false };
    case CustomProcessLookupActionTypes.LOAD_DATA:
        return { ...state, customProcessLookupData: [] };
    case CustomProcessLookupActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, customProcessLookupData: action.payload };
    case CustomProcessLookupActionTypes.LOAD_TEAM_MEMBERS_SUCCESS:
      return { ...state, teamMembers: action.payload.map((data: IPersonal):ISelectOption => {
        return Object.assign({}, {}, {
          label: `${data.emp_fullname}`,
          value: `${data.employee_id}`
        });
      })};
    case CustomProcessLookupActionTypes.LOAD_META_DATA_SUCCESS:
      return { ...state, userMetaData: action.payload };
    case CustomProcessLookupActionTypes.INITIATE_PROCESS:
      return { ...state, currentMasterId: null };
    case CustomProcessLookupActionTypes.INITIATE_PROCESS_SUCCESS:
      return { ...state, currentMasterId: action.payload.masterId };
    case CustomProcessLookupActionTypes.REMOVE_DATA:
      return { ...state, customProcessLookupData: state.customProcessLookupData.filter(item => item.id !== action.payload.recordId) };
    default: {
      return state;
    }
  }
}

