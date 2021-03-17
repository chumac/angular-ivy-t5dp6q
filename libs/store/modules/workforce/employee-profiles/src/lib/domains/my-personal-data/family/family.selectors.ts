import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IFamilyState } from './family.state';

export const getFamilyState = createFeatureSelector<IFamilyState>('family');

export const isProcessingFamily = createSelector(
  getFamilyState,
  (state: IFamilyState) => state.isProcessing
);

export const showEditorFamily = createSelector(
  getFamilyState,
  (state: IFamilyState) => state.showEditor
);

export const showViewerFamily = createSelector(
  getFamilyState,
  (state: IFamilyState) => state.showViewer
);

export const getFamilyApprovedData = createSelector(
  getFamilyState,
  (state: IFamilyState) => state.approvedData
);

export const getFamilyAwaitingApprovalData = createSelector(
  getFamilyState,
  (state: IFamilyState) => state.awaitingApprovalData
);

export const getFamilyStateList = createSelector(
  getFamilyState,
  (state: IFamilyState) => state.stateList
);

export const getFamilyCityList = createSelector(
  getFamilyState,
  (state: IFamilyState) => state.cityList
);

export const getFamilyDocument = createSelector(
  getFamilyState,
  (state: IFamilyState) => state.document
);

export const getFamilyInlineDocument = createSelector(
  getFamilyState,
  (state: IFamilyState) => state.inlineDocument
);

export const getFamilyApprovedDataMap = createSelector(getFamilyState, (state: IFamilyState) => state.approvedDataMap);

export const getFamilyApprovedPhoto = createSelector(
  getFamilyState,
  (state: IFamilyState) => state.approvedPhoto
);

export const getFamilyAwaitingApprovalPhoto = createSelector(
  getFamilyState,
  (state: IFamilyState) => state.awaitingApprovalPhoto
);
