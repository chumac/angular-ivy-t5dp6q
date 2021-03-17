import { initialSingleEmployeeLoadObjectivesState, ISingleEmployeeLoadObjectivesState } from './single-employee-load-objectives.state';
import {
  LoadSingleEmployeeObjectivesActionTypes,
  LoadSingleEmployeeObjectivesActions
} from './single-employee-load-objectives.actions';

export function loadSingleEmployeeObjectivesReducer(
  state = initialSingleEmployeeLoadObjectivesState,
  action: LoadSingleEmployeeObjectivesActions
): ISingleEmployeeLoadObjectivesState {
  switch (action.type) {

    case LoadSingleEmployeeObjectivesActionTypes.LOAD_PLAN_LIST_SUCCESS:
      return { ...state, planlist: action.payload };

    case LoadSingleEmployeeObjectivesActionTypes.LOAD_EMPLOYEE_LIST_SUCCESS:
      return { ...state, employeeList: action.payload };

    case LoadSingleEmployeeObjectivesActionTypes.LOAD_SINGLE_EMPLOYEE_OBJECTIVE_DATA_SUCCESS:
      return { ...state, singleEmployeeObjectivesData: action.payload, isProcessingDataGrid: false };

    case LoadSingleEmployeeObjectivesActionTypes.SINGLE_EMPLOYEE_OBJECTIVE_EXISTS_SUCCESS:
      return { ...state, singleEmployeeObjectiveExists: action.payload, selectBtn: false };


    case LoadSingleEmployeeObjectivesActionTypes.SHOW_SINGLE_EMPLOYEE_EDITOR:
      return { ...state, showSingleEmployeeEditor: true };
    case LoadSingleEmployeeObjectivesActionTypes.HIDE_SINGLE_EMPLOYEE_EDITOR:
      return { ...state, showSingleEmployeeEditor: false };

    case LoadSingleEmployeeObjectivesActionTypes.SHOW_SINGLE_EMPLOYEE_VIEWER:
      return { ...state, showSingleEmployeeViewer: true };
    case LoadSingleEmployeeObjectivesActionTypes.HIDE_SINGLE_EMPLOYEE_VIEWER:
      return { ...state, showSingleEmployeeViewer: false };

    case LoadSingleEmployeeObjectivesActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case LoadSingleEmployeeObjectivesActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };

    case LoadSingleEmployeeObjectivesActionTypes.PROCESSING_DATA_GRID:
      return { ...state, isProcessingDataGrid: true };
    case LoadSingleEmployeeObjectivesActionTypes.NOT_PROCESSING_DATA_GRID:
      return { ...state, isProcessingDataGrid: false };

    case LoadSingleEmployeeObjectivesActionTypes.VALIDATING:
      return { ...state, isValidating: true };
    case LoadSingleEmployeeObjectivesActionTypes.NOT_VALIDATING:
      return { ...state, isValidating: false };

    case LoadSingleEmployeeObjectivesActionTypes.IMPORTING:
      return { ...state, isImporting: true };
    case LoadSingleEmployeeObjectivesActionTypes.NOT_IMPORTING:
      return { ...state, isImporting: false };


    case LoadSingleEmployeeObjectivesActionTypes.TRIGGER_OBJECTIVE_EXIST_BTN_ACTION:
      return { ...state, validateBtn: true, resetBtn: true };

    case LoadSingleEmployeeObjectivesActionTypes.TRIGGER_OBJECTIVE_NON_EXIST_BTN_ACTION:
      return { ...state, selectBtn: true };

    case LoadSingleEmployeeObjectivesActionTypes.TRIGGER_OBJECTIVE_VALID_BTN_ACTION:
      return { ...state, importBtn: true };

    case LoadSingleEmployeeObjectivesActionTypes.TRIGGER_OBJECTIVE_RESET_BTN_ACTION:
      return { ...state, validateBtn: false, resetBtn: false, importBtn: false };

    case LoadSingleEmployeeObjectivesActionTypes.TRIGGER_OBJECTIVE_IMPORT_BTN_ACTION:
      return { ...state, validateBtn: false, resetBtn: false, importBtn: false };


    case LoadSingleEmployeeObjectivesActionTypes.RESET_COMPONENT:
      return {
        ...state,
        showSingleEmployeeEditor: false,
        showSingleEmployeeViewer: false,
        singleEmployeeObjectivesData: [],
        planlist: [],
        singleEmployeeObjectiveExists: false,
        isProcessing: false,
        isProcessingDataGrid: false,

        isValidating: false,
        isImporting: false,
        validateBtn: false,
        importBtn: false,
        resetBtn: false,
        hasIssues: false,
        selectBtn: false
      };

    default: {
      return state;
    }
  }
}
