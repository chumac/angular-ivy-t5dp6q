import { initialObjectiveApprovalState, IObjectiveApprovalState } from './objective-approval.state';
import {
  ObjectiveApprovalActionTypes,
  ObjectiveApprovalActions
} from './objective-approval.actions';

export function objectiveApprovalReducer(
  state = initialObjectiveApprovalState,
  action: ObjectiveApprovalActions
): IObjectiveApprovalState {
  switch (action.type) {

    case ObjectiveApprovalActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case ObjectiveApprovalActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };

    case ObjectiveApprovalActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case ObjectiveApprovalActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };

    case ObjectiveApprovalActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case ObjectiveApprovalActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };

    case ObjectiveApprovalActionTypes.LOAD_WEIGHT_BALANCE_SUCCESS:
      return { ...state, perspectiveWeightBalance: action.payload };

    case ObjectiveApprovalActionTypes.LOAD_PERSPECTIVE_LIST_SUCCESS:
      return { ...state, perspectiveList: action.payload };

    case ObjectiveApprovalActionTypes.PROCESSING_DATA_GRID:
      return { ...state, isProcessingDataGrid: true };
    case ObjectiveApprovalActionTypes.NOT_PROCESSING_DATA_GRID:
      return { ...state, isProcessingDataGrid: false };

    case ObjectiveApprovalActionTypes.LOAD_OBJECTIVE_MASTER_DATA_SUCCESS:
      return { ...state, objectiveMasterData: action.payload };

    case ObjectiveApprovalActionTypes.LOAD_HR_OBJECTIVE_MASTER_DATA_SUCCESS:
      return { ...state, objectiveMasterData: action.payload };

    case ObjectiveApprovalActionTypes.LOAD_WORKFLOW_DATA_SUCCESS:
      return { ...state, workflowInfo: action.payload };

    default: {
      return state;
    }
  }
}
