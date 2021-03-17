import { initialPositionSetupState, IPositionSetupState } from './position.state';
import { PositionSetupActions, PositionSetupActionTypes } from './position.actions';

export function positionSetupReducer(
  state = initialPositionSetupState,
  action: PositionSetupActions
): IPositionSetupState {
  switch (action.type) {
    case PositionSetupActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case PositionSetupActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case PositionSetupActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case PositionSetupActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case PositionSetupActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case PositionSetupActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case PositionSetupActionTypes.LOADING:
      return { ...state, isLoading: true };
    case PositionSetupActionTypes.NOT_LOADING:
      return { ...state, isLoading: false };
    case PositionSetupActionTypes.LOAD_APPROVED_DATA_SUCCESS:
      return { ...state, approvedData: action.payload.map(data => Object.assign({}, data, {
        reportTo:data.positionReportsToInfo?data.positionReportsToInfo.description:null}))};
    case PositionSetupActionTypes.LOAD_AWAITING_DATA_SUCCESS:
      return { ...state, awaitingData: action.payload.map(data => Object.assign({}, data, {
        reportTo:data.positionReportsToInfo?data.positionReportsToInfo.description:null}))};
    case PositionSetupActionTypes.LOAD_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    case PositionSetupActionTypes.LOAD_SPECIFIC_STRUCTURE_DATA_SUCCESS:
      return { ...state, specificStructure: action.payload };
    case PositionSetupActionTypes.LOAD_SPECIFIC_TYPE_DATA_SUCCESS:
      return { ...state, specificType: action.payload };
    case PositionSetupActionTypes.LOAD_COST_CENTER_SUCCESS:
      return { ...state, costCenter: action.payload };
    case PositionSetupActionTypes.LOAD_GET_STRUCTURE_DATA_SUCCESS:
      return { ...state, getStructure: action.payload };
    case PositionSetupActionTypes.LOAD_POSITION_LIST_SUCCESS:
      return { ...state, positionList: action.payload };
    case PositionSetupActionTypes.LOAD_GRADE_LIST_SUCCESS:
          return { ...state, gradeList: action.payload };
    case PositionSetupActionTypes.LOAD_POSITION_CATEGORY_SUCCESS:
          return { ...state, positionCategory: action.payload };
    case PositionSetupActionTypes.CLEAR_DOCUMENT:
      return { ...state, document: null };
    default: {
      return state;
    }
  }
}

