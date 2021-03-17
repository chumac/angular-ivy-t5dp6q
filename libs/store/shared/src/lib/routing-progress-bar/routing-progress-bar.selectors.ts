
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IRoutingProgressBarState } from './routing-progress-bar.state';

export const getRoutingProgressBarState = createFeatureSelector<IRoutingProgressBarState>('routingProgressBar');

export const isRoutingProgressBarShowing = createSelector(getRoutingProgressBarState, (state: IRoutingProgressBarState) => state.show);
