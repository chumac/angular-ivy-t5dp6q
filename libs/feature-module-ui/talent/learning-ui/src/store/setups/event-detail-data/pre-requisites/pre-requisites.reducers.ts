import { initialPreRequisitesState, IPreRequisitesState } from './pre-requisites.state';
import { PreRequisitesActions, PreRequisitesActionTypes } from './pre-requisites.actions';

export function PreRequisitesReducer(
  state = initialPreRequisitesState,
  action: PreRequisitesActions
): IPreRequisitesState {
  switch (action.type) {
    case PreRequisitesActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case PreRequisitesActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case PreRequisitesActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case PreRequisitesActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case PreRequisitesActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case PreRequisitesActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case PreRequisitesActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, PreRequisitesData: action.payload };
    case PreRequisitesActionTypes.LOAD_DATA_TYPE_SUCCESS:
      return { ...state, PreRequisitesTypeData: action.payload };
    case PreRequisitesActionTypes.REMOVE_DATA:
      return { ...state, PreRequisitesData: state.PreRequisitesData.filter(item => item.id !== action.payload.recordId) };
    default: {
      return state;
    }
  }
}

