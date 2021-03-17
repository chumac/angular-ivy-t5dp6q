import { initialPlanState, IPlanState } from './plan.state';
import { PlanActions, PlanActionTypes } from './plan.actions';

export function planReducer(
  state = initialPlanState,
  action: PlanActions
): IPlanState {
  switch (action.type) {
    case PlanActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case PlanActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case PlanActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case PlanActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case PlanActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case PlanActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case PlanActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, planData: action.payload };
    case PlanActionTypes.LOAD_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    case PlanActionTypes.REMOVE_DATA:
      return { ...state, planData: state.planData.filter(item => item.id !== action.payload.recordId)};
    case PlanActionTypes.CLEAR_DOCUMENT:
      return { ...state, document: null };
    case PlanActionTypes.LOAD_CURRENT_PLAN_SUCCESS:
      return { ...state, currentPlan: action.payload };
    default: {
      return state;
    }
  }
}

