import { initialPlanOptionState, IPlanOptionState } from './plan-option.state';
import { PlanOptionActions, PlanOptionActionTypes } from './plan-option.actions';

export function planOptionReducer(
  state = initialPlanOptionState,
  action: PlanOptionActions
): IPlanOptionState {
  switch (action.type) {
    case PlanOptionActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case PlanOptionActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case PlanOptionActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case PlanOptionActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case PlanOptionActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case PlanOptionActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case PlanOptionActionTypes.LOAD_DATA:
      return { ...state, planOptionData: [] };
    case PlanOptionActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, planOptionData: action.payload };
    case PlanOptionActionTypes.LOAD_PLAN_LIST_SUCCESS:
      return { ...state, planList: action.payload };
    case PlanOptionActionTypes.LOAD_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    case PlanOptionActionTypes.REMOVE_DATA:
      return { ...state, planOptionData: state.planOptionData.filter(item => item.id !== action.payload.recordId) };
    case PlanOptionActionTypes.CLEAR_DOCUMENT:
      return { ...state, document: null };
    default: {
      return state;
    }
  }
}

