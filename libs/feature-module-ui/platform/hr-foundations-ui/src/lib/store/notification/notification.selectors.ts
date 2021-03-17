import { createSelector, createFeatureSelector } from '@ngrx/store';

import { INotificationState } from './notification.state';
import { IHRFoundationState } from '../root';

const getState = createFeatureSelector<IHRFoundationState>('hr-foundations');
const getNotificationState = createSelector(getState, (state: IHRFoundationState) => state.notification);


export const isProcessingNotification = createSelector(
  getNotificationState,
  (state: INotificationState) => state.isProcessing
);


export const isLoadingNotification = createSelector(
  getNotificationState,
  (state: INotificationState) => state.isLoading
);

export const getNotificationData = createSelector(
  getNotificationState,
  (state: INotificationState) => state.notificationData
);

export const showEditorNotification = createSelector(
  getNotificationState,
  (state: INotificationState) => state.showEditor
);

export const getPositionData = createSelector(
  getNotificationState,
  (state: INotificationState) => state.position
);

export const getNotificationTo = createSelector(
  getNotificationState,
  (state: INotificationState) => state.notificationTo
);

export const getProcess = createSelector(
  getNotificationState,
  (state: INotificationState) => state.process
);

export const getRolesNotification = createSelector(
  getNotificationState,
  (state: INotificationState) => state.roles
);
