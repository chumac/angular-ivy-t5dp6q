
import { IRoutingProgressBarState, initialRoutingProgressBarState } from "./routing-progress-bar.state";
import { RoutingProgressBarActions, RoutingProgressBarActionTypes } from "./routing-progress-bar.actions";

export function routingProgressBarReducer(state: IRoutingProgressBarState = initialRoutingProgressBarState, action: RoutingProgressBarActions) {
  switch(action.type) {
    case RoutingProgressBarActionTypes.SHOW:
      return { ...state, show: true };
    case RoutingProgressBarActionTypes.HIDE:
      return { ...state, show: false };
    default:
      return state;
  }
}
