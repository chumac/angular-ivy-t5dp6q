import { initialLoadObjectivesState, ILoadObjectivesState } from './load-objectives.state';
import {
  LoadObjectivesActionTypes,
  LoadObjectivesActions
} from './load-objectives.actions';

export function loadObjectivesReducer(
  state = initialLoadObjectivesState,
  action: LoadObjectivesActions
): ILoadObjectivesState {
  switch (action.type) {
    case LoadObjectivesActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case LoadObjectivesActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };

    case LoadObjectivesActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case LoadObjectivesActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };

    case LoadObjectivesActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case LoadObjectivesActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };

    case LoadObjectivesActionTypes.PROCESSING_DATA_GRID:
      return { ...state, isProcessingDataGrid: true };
    case LoadObjectivesActionTypes.NOT_PROCESSING_DATA_GRID:
      return { ...state, isProcessingDataGrid: false };
    case LoadObjectivesActionTypes.LOAD_PLAN_LIST_SUCCESS:
      return { ...state, planlist: action.payload };
    case LoadObjectivesActionTypes.LOAD_OBJECTIVE_DATA_SUCCESS:
      return {
        ...state, objectiveData: action.payload,
        isProcessingDataGrid: false,
        isProcessing: false,
      };
    case LoadObjectivesActionTypes.OBJECTIVE_EXISTS_SUCCESS:
      return {
        ...state, objectiveExists: action.payload,
        isProcessingDataGrid: false,
        validateBtn: action.payload,
        resetBtn: action.payload,
      };
    case LoadObjectivesActionTypes.OBJECTIVE_EXISTS_FAILURE:
      return { ...state, isProcessingDataGrid: false, objectiveExists: false };

    case LoadObjectivesActionTypes.HAS_ISSUES:
      return { ...state, hasIssues: action.payload, importBtn: !action.payload };
    case LoadObjectivesActionTypes.RESET:
      return { ...state, validateBtn: true };
    case LoadObjectivesActionTypes.VALIDATING:
      return { ...state, isValidating: true };
    case LoadObjectivesActionTypes.NOT_VALIDATING:
      return { ...state, isValidating: false };

    case LoadObjectivesActionTypes.IMPORTING:
      return { ...state, isImporting: true };
    case LoadObjectivesActionTypes.NOT_IMPORTING:
      return { ...state, isImporting: false };
    case LoadObjectivesActionTypes.UPLOAD_EVENT:
      return { ...state, validateBtn: true, resetBtn: true, importBtn: false };

    case LoadObjectivesActionTypes.VALIDATE_EVENT:
      return { ...state, importBtn: true };

    case LoadObjectivesActionTypes.IMPORT_EVENT:
      return { ...state, importBtn: false, validateBtn: false, resetBtn: false  };

    case LoadObjectivesActionTypes.RESET_EVENT:
      return { ...state, importBtn: false, validateBtn: false, resetBtn: false };
    case LoadObjectivesActionTypes.RESET_COMPONENT:
      return {
        ...state,
        showEditor: false,
        showViewer: false,
        isProcessing: false,
        isProcessingDataGrid: false,
        objectiveExists: true,
        objectiveData: [],
        planlist: [],
        isValidating: false,
        isImporting: false,
        validateBtn: false,
        importBtn: false,
        resetBtn: false
      };

    default: {
      return state;
    }
  }
}
