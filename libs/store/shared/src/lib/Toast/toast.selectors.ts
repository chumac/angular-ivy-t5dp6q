
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IToastState } from './toast.state';

export const getToastState = createFeatureSelector<IToastState>('toast');

export const isToastShowing = createSelector(getToastState, (state: IToastState) => state.show);
