import { initialLibraryLoadObjectivesState, ILibraryLoadObjectivesState } from './library-load-objectives.state';
import {
  LoadLibraryObjectivesActionTypes,
  LoadLibraryObjectivesActions
} from './library-load-objectives.actions';

export function loadLibraryObjectivesReducer(
  state = initialLibraryLoadObjectivesState,
  action: LoadLibraryObjectivesActions
): ILibraryLoadObjectivesState {
  switch (action.type) {

    case LoadLibraryObjectivesActionTypes.LOAD_PLAN_LIST_SUCCESS:
      return { ...state, planlist: action.payload };

    case LoadLibraryObjectivesActionTypes.LOAD_PERSPECTIVE_LIST_SUCCESS:
      return { ...state, perspectiveList: action.payload };

    case LoadLibraryObjectivesActionTypes.LOAD_ANALYSIS_LIST_SUCCESS:
      return { ...state, analysisList: action.payload };

    case LoadLibraryObjectivesActionTypes.LOAD_ANALYSIS_DETAIL_LIST_SUCCESS:
      return { ...state, analysisDetList: action.payload };

    case LoadLibraryObjectivesActionTypes.LOAD_POSITION_LIST_SUCCESS:
      return { ...state, positionList: action.payload };

    case LoadLibraryObjectivesActionTypes.LOAD_DESIGNATION_LIST_SUCCESS:
      return { ...state, designationList: action.payload };

    case LoadLibraryObjectivesActionTypes.LOAD_GRADE_LIST_SUCCESS:
      return { ...state, gradeList: action.payload };

    case LoadLibraryObjectivesActionTypes.LOAD_EMPLOYEE_LIST_SUCCESS:
      return { ...state, employeeList: action.payload };

    case LoadLibraryObjectivesActionTypes.LOAD_LIBRARY_OBJECTIVE_DATA_SUCCESS:
      return { ...state, libraryObjectivesData: action.payload, isProcessingDataGrid: false };

    case LoadLibraryObjectivesActionTypes.LIBRARY_OBJECTIVE_EXISTS_SUCCESS:
      return { ...state, libraryObjectiveExists: action.payload };

    case LoadLibraryObjectivesActionTypes.LIBRARY_OBJECTIVE_NOT_EXIST:
      return { ...state, libraryObjectiveExists: action.payload };


    case LoadLibraryObjectivesActionTypes.SHOW_LIBRARY_EDITOR:
      return { ...state, showLibraryEditor: true };
    case LoadLibraryObjectivesActionTypes.HIDE_LIBRARY_EDITOR:
      return { ...state, showLibraryEditor: false };

    case LoadLibraryObjectivesActionTypes.SHOW_LIBRARY_VIEWER:
      return { ...state, showLibraryViewer: true };
    case LoadLibraryObjectivesActionTypes.HIDE_LIBRARY_VIEWER:
      return { ...state, showLibraryViewer: false };

    case LoadLibraryObjectivesActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case LoadLibraryObjectivesActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };

    case LoadLibraryObjectivesActionTypes.PROCESSING_DATA_GRID:
      return { ...state, isProcessingDataGrid: true };
    case LoadLibraryObjectivesActionTypes.NOT_PROCESSING_DATA_GRID:
      return { ...state, isProcessingDataGrid: false };

    case LoadLibraryObjectivesActionTypes.VALIDATING:
      return { ...state, isValidating: true };
    case LoadLibraryObjectivesActionTypes.NOT_VALIDATING:
      return { ...state, isValidating: false };

    case LoadLibraryObjectivesActionTypes.IMPORTING:
      return { ...state, isImporting: true };
    case LoadLibraryObjectivesActionTypes.NOT_IMPORTING:
      return { ...state, isImporting: false };

    case LoadLibraryObjectivesActionTypes.TRIGGER_OBJECTIVE_EXIST_BTN_ACTION:
      return { ...state, validateBtn: true, resetBtn: true };

    case LoadLibraryObjectivesActionTypes.TRIGGER_OBJECTIVE_NON_EXIST_BTN_ACTION:
      return { ...state, selectBtn: true };

    case LoadLibraryObjectivesActionTypes.TRIGGER_OBJECTIVE_VALID_BTN_ACTION:
      return { ...state, importBtn: true };

    case LoadLibraryObjectivesActionTypes.TRIGGER_OBJECTIVE_RESET_BTN_ACTION:
      return { ...state, validateBtn: false, resetBtn: false, importBtn: false };

    case LoadLibraryObjectivesActionTypes.TRIGGER_OBJECTIVE_IMPORT_BTN_ACTION:
      return { ...state, validateBtn: false, resetBtn: false, importBtn: false };

    case LoadLibraryObjectivesActionTypes.RESET_COMPONENT:
      return {
        ...state,
        showLibraryEditor: false,
        showLibraryViewer: false,
        libraryObjectivesData: [],
        planlist: [],
        libraryObjectiveExists: false,
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
