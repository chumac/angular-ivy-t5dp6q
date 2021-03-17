import { Action } from '@ngrx/store';

export enum RoutingProgressBarActionTypes {
  SHOW = '[Routing Progress Bar] Show',
  HIDE = '[Routing Progress Bar] Hide'
}

export class ShowRoutingProgressBar implements Action {
  readonly type = RoutingProgressBarActionTypes.SHOW;
}

export class HideRoutingProgressBar implements Action {
  readonly type = RoutingProgressBarActionTypes.HIDE;
}

export type RoutingProgressBarActions = ShowRoutingProgressBar | HideRoutingProgressBar;
