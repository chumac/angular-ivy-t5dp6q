import { initialEcosystem360State, IEcosystem360State } from './ecosystem360.state';
import { Ecosystem360Actions, Ecosystem360ActionTypes } from './ecosystem360.actions';

export function ecosystem360Reducer(
  state = initialEcosystem360State,
  action: Ecosystem360Actions
): IEcosystem360State {
  switch (action.type) {
    case Ecosystem360ActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case Ecosystem360ActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case Ecosystem360ActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case Ecosystem360ActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case Ecosystem360ActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case Ecosystem360ActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case Ecosystem360ActionTypes.PROCESSING_GRID:
      return { ...state, isProcessingGrid: true };
    case Ecosystem360ActionTypes.NOT_PROCESSING_GRID:
      return { ...state, isProcessingGrid: false };
    case Ecosystem360ActionTypes.PROCESSING_UPLOAD:
      return { ...state, isProcessingUpload: true };
    case Ecosystem360ActionTypes.NOT_PROCESSING_UPLOAD:
      return { ...state, isProcessingUpload: false };
    case Ecosystem360ActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, ecosystem360Data: action.payload };
    case Ecosystem360ActionTypes.LOAD_PLAN_LIST_SUCCESS:
      return { ...state, planList: action.payload };
    case Ecosystem360ActionTypes.LOAD_EMPLOYEE_LIST_SUCCESS:
      return { ...state, employeeList: action.payload };
    case Ecosystem360ActionTypes.LOAD_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    case Ecosystem360ActionTypes.REMOVE_DATA:
      return { ...state, ecosystem360Data: state.ecosystem360Data.filter(item => item.id !== action.payload.recordId) };
    case Ecosystem360ActionTypes.CLEAR_DOCUMENT:
      return { ...state, document: null };
    default: {
      return state;
    }
  }
}

