import { createSelector, createFeatureSelector } from '@ngrx/store';

import { ILeaveStaggeredState } from './leave-staggered.state';

import { IAbsenceState } from '../root';

export const getState = createFeatureSelector<IAbsenceState>('absence');

export const getLeaveStaggeredState = createSelector(getState, (state: IAbsenceState) => state.leaveStaggered);

export const isProcessingLeaveStaggered = createSelector(
  getLeaveStaggeredState,
  (state: ILeaveStaggeredState) => state.isProcessing
);

export const isLoadingLeaveStaggered = createSelector(
  getLeaveStaggeredState,
  (state: ILeaveStaggeredState) => state.isLoading
);

export const showEditorLeaveStaggered = createSelector(
  getLeaveStaggeredState,
  (state: ILeaveStaggeredState) => state.showEditor
);

export const showViewerLeaveStaggered = createSelector(
  getLeaveStaggeredState,
  (state: ILeaveStaggeredState) => state.showViewer
);

export const showModalLeaveStaggered = createSelector(
  getLeaveStaggeredState,
  (state: ILeaveStaggeredState) => state.showModal
);

export const showDetailEditorLeaveStaggered = createSelector(
  getLeaveStaggeredState,
  (state: ILeaveStaggeredState) => state.showDetailEditor
);


export const getLeaveStaggeredApprovedData = createSelector(
  getLeaveStaggeredState,
  (state: ILeaveStaggeredState) => state.approvedData
  );

export const getLeaveStaggeredAwaitingApprovalData = createSelector(
  getLeaveStaggeredState,
  (state: ILeaveStaggeredState) => state.awaitingApprovalData
);

export const getEntitlementLeaveStaggered = createSelector(
  getLeaveStaggeredState,
  (state: ILeaveStaggeredState) => state.leaveEntitlement
);

export const getLeaveStaggeredCurrencyList = createSelector(
  getLeaveStaggeredState,
  (state: ILeaveStaggeredState) => state.currencyList
);

export const getLeaveStaggeredStateList = createSelector(
  getLeaveStaggeredState,
  (state: ILeaveStaggeredState) => state.stateList
);

export const getLeaveStaggeredCityList = createSelector(
  getLeaveStaggeredState,
  (state: ILeaveStaggeredState) => state.cityList
);

export const getLeaveStaggeredIdentity = createSelector(
  getLeaveStaggeredState,
  (state: ILeaveStaggeredState) => state.leaveStaggeredIdentity
);

export const getLeaveStaggeredType = createSelector(
  getLeaveStaggeredState,
  (state: ILeaveStaggeredState) => state.leaveType
);
