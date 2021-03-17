import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IEmployeesProfileState } from '../../root';
import { IConfirmationState } from './confirmation.state';

const getState = createFeatureSelector<IEmployeesProfileState>('employeesProfile');
const getConfirmationState = createSelector(getState, (state: IEmployeesProfileState) => state.confirmation);


export const getApprovedDataConfirmation = createSelector(
  getConfirmationState,
  (state: IConfirmationState) => state.approvedData
);

export const getAwaitingApprovalDataConfirmation = createSelector(
  getConfirmationState,
  (state: IConfirmationState) => state.awaitingApprovalData
);

export const getTransactionTypesConfirmation = createSelector(
  getConfirmationState,
  (state: IConfirmationState) => state.transctionTypes
);

export const isProcessingConfirmation = createSelector(
  getConfirmationState,
  (state: IConfirmationState) => state.isProcessing
);

export const showEditorConfirmation = createSelector(
  getConfirmationState,
  (state: IConfirmationState) => state.showEditor
);

export const showViewerConfirmation = createSelector(
  getConfirmationState,
  (state: IConfirmationState) => state.showViewer
);

export const getConfirmationDocument = createSelector(
  getConfirmationState,
  (state: IConfirmationState) => state.document
);

