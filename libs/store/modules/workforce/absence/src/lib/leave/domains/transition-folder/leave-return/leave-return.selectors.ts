import { createSelector, createFeatureSelector } from '@ngrx/store';

import { ILeaveReturnState } from './leave-return.state';
import { ISelfServiceState } from '@nutela/store/self-service';

const getSelfServiceState = createFeatureSelector<ISelfServiceState>('self-service');

export const getLeaveReturnState = createSelector(getSelfServiceState, (state: ISelfServiceState) => state.leaveReturn);

export const isProcessingLeaveReturn = createSelector(
  getLeaveReturnState,
  (state: ILeaveReturnState) => state.isProcessing
);

export const showEditorLeaveReturn = createSelector(
  getLeaveReturnState,
  (state: ILeaveReturnState) => state.showEditor
);

