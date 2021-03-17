import { initialPerformanceDashboardState, IPerformanceDashboardState } from './performance-dashboard.state';
import { PerformanceDashboardActions, PerformanceDashboardActionTypes } from './performance-dashboard.actions';

export function performanceDashboardReducer(
  state = initialPerformanceDashboardState,
  action: PerformanceDashboardActions
): IPerformanceDashboardState {
  switch (action.type) {
    case PerformanceDashboardActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case PerformanceDashboardActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case PerformanceDashboardActionTypes.LOAD_CURR_PLAN_SUCCESS:
      return { ...state, currentPlan: action.payload };
    case PerformanceDashboardActionTypes.LOAD_DASH_MASTERS_SUCCESS:
      return { ...state, masters: action.payload };
    case PerformanceDashboardActionTypes.LOAD_DASH_OBJECTIVES_SUCCESS:
      return { ...state, objectives: action.payload };
    case PerformanceDashboardActionTypes.LOAD_DASH_TEAM_MASTERS:
      return { ...state, teamMasters: null };
    case PerformanceDashboardActionTypes.LOAD_DASH_TEAM_OBJECTIVES:
      return { ...state, teamObjectives: [] };
    case PerformanceDashboardActionTypes.LOAD_DASH_TEAM_MASTERS_SUCCESS:
      return { ...state, teamMasters: action.payload };
    case PerformanceDashboardActionTypes.LOAD_DASH_TEAM_OBJECTIVES_SUCCESS:
      return { ...state, teamObjectives: action.payload };
    default: {
      return state;
    }
  }
}

