import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IEmployeesProfileState } from '../../root';
import { ICommendationState } from './commendation.state';

const getState = createFeatureSelector<IEmployeesProfileState>('employeesProfile');
const getCommendationState = createSelector(getState, (state: IEmployeesProfileState) => state.commendation);


export const getApprovedDataCommendation = createSelector(
  getCommendationState,
  (state: ICommendationState) => state.approvedData
);

export const getAwaitingApprovalDataCommendation = createSelector(
  getCommendationState,
  (state: ICommendationState) => state.awaitingApprovalData
);

export const getRoleTypesCommendation = createSelector(
  getCommendationState,
  (state: ICommendationState) => state.roleTypes
);

export const isProcessingCommendation = createSelector(
  getCommendationState,
  (state: ICommendationState) => state.isProcessing
);

export const showEditorCommendation = createSelector(
  getCommendationState,
  (state: ICommendationState) => state.showEditor
);

export const showViewerCommendation = createSelector(
  getCommendationState,
  (state: ICommendationState) => state.showViewer
);

export const getCommendationDocument = createSelector(
  getCommendationState,
  (state: ICommendationState) => state.document
);

