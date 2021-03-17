import { initialCustomProcessMapState, ICustomProcessMapState } from './custom-process-map.state';
import { CustomProcessMapActions, CustomProcessMapActionTypes } from './custom-process-map.actions';

export function customProcessMapReducer(
  state = initialCustomProcessMapState,
  action: CustomProcessMapActions
): ICustomProcessMapState {
  switch (action.type) {
    case CustomProcessMapActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case CustomProcessMapActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case CustomProcessMapActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case CustomProcessMapActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case CustomProcessMapActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case CustomProcessMapActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case CustomProcessMapActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, customProcessMapData: action.payload };
    case CustomProcessMapActionTypes.LOAD_ROLES_SUCCESS:
      return { ...state, roles: action.payload };
    case CustomProcessMapActionTypes.LOAD_PERMISSIONS_SUCCESS:
      return { ...state, empPermissions: action.payload };
    case CustomProcessMapActionTypes.LOAD_CUSTOM_FORM_LIST_SUCCESS:
      return { ...state, customFormList: action.payload };
    case CustomProcessMapActionTypes.REMOVE_DATA:
      return { ...state, customProcessMapData: state.customProcessMapData.filter(item => item.id !== action.payload.recordId) };
    default: {
      return state;
    }
  }
}

