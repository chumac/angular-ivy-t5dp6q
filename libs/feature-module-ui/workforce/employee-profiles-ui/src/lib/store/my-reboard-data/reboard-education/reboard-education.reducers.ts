import { initialReboardEducationState, IReboardEducationState } from './reboard-education.state';
import { ReboardEducationActions, ReboardEducationActionTypes, LoadDataItemReboardEducationSuccess } from './reboard-education.actions';

export function reboardEducationReducer(
  state = initialReboardEducationState,
  action: ReboardEducationActions
): IReboardEducationState {
  switch (action.type) {
    case ReboardEducationActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case ReboardEducationActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case ReboardEducationActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case ReboardEducationActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case ReboardEducationActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case ReboardEducationActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case ReboardEducationActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, data: action.payload };
    case ReboardEducationActionTypes.LOAD_INSTITUTION_LIST_SUCCESS:
      return { ...state, institutionsList: action.payload };
    case ReboardEducationActionTypes.LOAD_COUNTRY_LIST_SUCCESS:
      return { ...state, countryList: action.payload };
    case ReboardEducationActionTypes.LOAD_DATA_ITEM_SUCCESS:
      const newState = updateState(state, <LoadDataItemReboardEducationSuccess>action);
      return newState;
    case ReboardEducationActionTypes.CLEAR_DATA_MAP:
      return { ...state, dataMap: {} };
    case ReboardEducationActionTypes.LOAD_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    case ReboardEducationActionTypes.CLEAR_DOCUMENT:
      return { ...state, document: null };
    default: {
      return state;
    }
  }
}


function updateState(
  state: IReboardEducationState,
  action: LoadDataItemReboardEducationSuccess
): IReboardEducationState {
  const data = action.payload;

  const newState = Object.assign({}, state);

  newState.dataMap[data.edu_id] = data;

  return newState;
}