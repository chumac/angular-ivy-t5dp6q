import { initialMultiEmployeeLoadObjectivesState, IMultiEmployeeLoadObjectivesState } from './multi-employee-load-objectives.state';
import {
  MultiEmployeeLoadObjectivesActionTypes,
  MultiEmployeeLoadObjectivesActions
} from './multi-employee-load-objectives.actions';

export function loadMultiEmployeeObjectivesReducer(
  state = initialMultiEmployeeLoadObjectivesState,
  action: MultiEmployeeLoadObjectivesActions
): IMultiEmployeeLoadObjectivesState {
  switch (action.type) {
    case MultiEmployeeLoadObjectivesActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case MultiEmployeeLoadObjectivesActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };

    case MultiEmployeeLoadObjectivesActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case MultiEmployeeLoadObjectivesActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };

    case MultiEmployeeLoadObjectivesActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case MultiEmployeeLoadObjectivesActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };

    case MultiEmployeeLoadObjectivesActionTypes.PROCESSING_DATA_GRID:
      return { ...state, isProcessingDataGrid: true };
    case MultiEmployeeLoadObjectivesActionTypes.NOT_PROCESSING_DATA_GRID:
      return { ...state, isProcessingDataGrid: false };
    case MultiEmployeeLoadObjectivesActionTypes.LOAD_PLAN_LIST_SUCCESS:
      return { ...state, planlist: action.payload };
    case MultiEmployeeLoadObjectivesActionTypes.MULTI_EMPLOYEE_LOAD_OBJECTIVE_DATA_SUCCESS:
      return {
        ...state, objectiveData: action.payload,
        isProcessingDataGrid: false,
        isProcessing: false,
      };
    case MultiEmployeeLoadObjectivesActionTypes.OBJECTIVE_EXISTS_SUCCESS:
      return {
        ...state, objectiveExists: action.payload,
        isProcessingDataGrid: false,
        validateBtn: action.payload,
        resetBtn: action.payload,
      };
    case MultiEmployeeLoadObjectivesActionTypes.OBJECTIVE_EXISTS_FAILURE:
      return { ...state, isProcessingDataGrid: false, objectiveExists: false };

    case MultiEmployeeLoadObjectivesActionTypes.HAS_ISSUES:
      return { ...state, hasIssues: action.payload, importBtn: !action.payload };
    case MultiEmployeeLoadObjectivesActionTypes.RESET:
      return { ...state, validateBtn: true };
    case MultiEmployeeLoadObjectivesActionTypes.VALIDATING:
      return { ...state, isValidating: true };
    case MultiEmployeeLoadObjectivesActionTypes.NOT_VALIDATING:
      return { ...state, isValidating: false };

    case MultiEmployeeLoadObjectivesActionTypes.IMPORTING:
      return { ...state, isImporting: true };
    case MultiEmployeeLoadObjectivesActionTypes.NOT_IMPORTING:
      return { ...state, isImporting: false };
    case MultiEmployeeLoadObjectivesActionTypes.UPLOAD_EVENT:
      return { ...state, validateBtn: true, resetBtn: true, importBtn: false };

    case MultiEmployeeLoadObjectivesActionTypes.VALIDATE_EVENT:
      return { ...state, importBtn: true };

    case MultiEmployeeLoadObjectivesActionTypes.IMPORT_EVENT:
      return { ...state, importBtn: false, validateBtn: false, resetBtn: false  };

    case MultiEmployeeLoadObjectivesActionTypes.RESET_EVENT:
      return { ...state, importBtn: false, validateBtn: false, resetBtn: false };
    case MultiEmployeeLoadObjectivesActionTypes.RESET_COMPONENT:
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
