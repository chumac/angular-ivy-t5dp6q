import { initialManageObjectivesState, IManageObjectivesState } from './manage-objectives.state';
import {
  ManageObjectivesActionTypes,
  ManageObjectivesActions
} from './manage-objectives.actions';

export function manageObjectivesReducer(
  state = initialManageObjectivesState,
  action: ManageObjectivesActions
): IManageObjectivesState {
  switch (action.type) {
    case ManageObjectivesActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case ManageObjectivesActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };

    case ManageObjectivesActionTypes.SHOW_RECALL:
      return { ...state, showRecall: true };
    case ManageObjectivesActionTypes.HIDE_RECALL:
      return { ...state, showRecall: false };

    case ManageObjectivesActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case ManageObjectivesActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };

    case ManageObjectivesActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case ManageObjectivesActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };

    case ManageObjectivesActionTypes.PROCESSING_DATA_GRID:
      return { ...state, isProcessingDataGrid: true };
    case ManageObjectivesActionTypes.NOT_PROCESSING_DATA_GRID:
      return { ...state, isProcessingDataGrid: false };


    case ManageObjectivesActionTypes.LOAD_PLAN_LIST_SUCCESS:
      return { ...state, planlist: action.payload };

    case ManageObjectivesActionTypes.LOAD_PERSPECTIVE_LIST_SUCCESS:
      return { ...state, perspectiveList: action.payload };


    case ManageObjectivesActionTypes.LOAD_OBJECTIVE_MASTER_DATA_SUCCESS:
      return { ...state, objectiveMasterData: action.payload };

    case ManageObjectivesActionTypes.LOAD_PRESCORED_OBJECTIVE_MASTER_DATA_SUCCESS:
      return { ...state, preScoredobjectivesMasterData: action.payload };

    case ManageObjectivesActionTypes.LOAD_WEIGHT_BALANCE_SUCCESS:
      return { ...state, perspectiveWeightBalance: action.payload };

    case ManageObjectivesActionTypes.LM_LOAD_WEIGHT_BALANCE_SUCCESS:
      return { ...state, lmPerspectiveWeightBalance: action.payload };

    case ManageObjectivesActionTypes.LOAD_OBJECTIVE_OBJECTIVE_INFO_SUCCESS:
      return { ...state, objectiveInfo: action.payload };

    case ManageObjectivesActionTypes.TRIGGER_UNSUBMITTED_BTN_ACTION:
      return {
        ...state,
        submitBtn: true,
        addBtn: true,
        editBtn: true,
        deleteBtn: true,
        viewBtn: true,
        recallBtn: false,
        progressBtn: false,
      };

    case ManageObjectivesActionTypes.TRIGGER_AWAITING_APPROVAL_BTN_ACTION:
      return {
        ...state,
        submitBtn: false,
        addBtn: false,
        editBtn: false,
        deleteBtn: false,
        viewBtn: true,
        recallBtn: false,
        progressBtn: false,
      };

    case ManageObjectivesActionTypes.TRIGGER_APPROVED_BTN_ACTION:
      return {
        ...state,
        submitBtn: false,
        addBtn: false,
        editBtn: false,
        deleteBtn: false,
        viewBtn: true,
        recallBtn: true,
        progressBtn: true,
      };

    case ManageObjectivesActionTypes.RESET_COMPONENT:
      return {
        ...state,
        showEditor: false,
        showViewer: false,
        showRecall: false,
        isProcessing: false,
        isProcessingDataGrid: false,
        // planlist: [],
        perspectiveList: [],
        perspectiveWeightBalance: null,
        objectiveMasterData: [],
        preScoredobjectivesMasterData: [],
        objectiveInfo: null,     
        addBtn: false,
        recallBtn: false,
        submitBtn: false,
        resetBtn: false,
        // editBtn: false,
        // viewBtn: false,
        // deleteBtn: false,
        // progressBtn: false,
      };

    default: {
      return state;
    }
  }
}
