import { initialValidLocationState, IValidLocationState } from './valid-location.state';
import { ValidLocationActions, ValidLocationActionTypes } from './valid-location.actions';

export function validLocationReducer(
  state = initialValidLocationState,
  action: ValidLocationActions
): IValidLocationState {
  switch (action.type) {
    case ValidLocationActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case ValidLocationActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case ValidLocationActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case ValidLocationActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case ValidLocationActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case ValidLocationActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case ValidLocationActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, validLocationData: action.payload };
    case ValidLocationActionTypes.REMOVE_DATA:
      return { ...state, validLocationData: state.validLocationData.filter(item => item.id !== action.payload.recordId) };
    default: {
      return state;
    }
  }
}

