
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { INotificationState } from './notification.state';

export const getNotificationState = createFeatureSelector<INotificationState>('notification');

export const getApprovalQueueNotification = createSelector(getNotificationState, (state: INotificationState) => state.queueData);

export const getNumberOfResponses = createSelector(getNotificationState, (state: INotificationState) => state.numberOfResponses);

export const getNumberOfHRResponses = createSelector(getNotificationState, (state: INotificationState) => state.numberOfHRResponses);

export const getExitInitiationStatus = createSelector(getNotificationState, (state: INotificationState) => state.initiatedProcess);
