import { createSelector } from '@ngrx/store';

import { IReboardIdentificationState } from './reboard-identification.state';

import { getEmployeesProfileState, IEmployeesProfileState } from 'libs/feature-module-ui/workforce/employee-profiles-ui/src/lib/store/root/employees-profile.state';

export const getReboardIdentificationState = createSelector(
  getEmployeesProfileState,
  (state: IEmployeesProfileState) => state.reboardIdentification
);


export const isProcessingReboardIdentification = createSelector(
  getReboardIdentificationState,
  (state: IReboardIdentificationState) => state.isProcessing
);

export const isLoadingReboardIdentification = createSelector(
  getReboardIdentificationState,
  (state: IReboardIdentificationState) => state.isLoading
);

export const showEditorReboardIdentification = createSelector(
  getReboardIdentificationState,
  (state: IReboardIdentificationState) => state.showEditor
);

export const showViewerReboardIdentification = createSelector(
  getReboardIdentificationState,
  (state: IReboardIdentificationState) => state.showViewer
);

export const getReboardIdentificationData = createSelector(
  getReboardIdentificationState,
  (state: IReboardIdentificationState) => state.data
);

export const getSignatureImageReboardIdentification = createSelector(
  getReboardIdentificationState,
  (state: IReboardIdentificationState) => state.signature
);

export const getPayGroup = createSelector(
  getReboardIdentificationState,
  (state: IReboardIdentificationState) => state.paygroupList
);

export const getPaygrade = createSelector(
  getReboardIdentificationState,
  (state: IReboardIdentificationState) => state.gradeList
);

export const getPositions = createSelector(
  getReboardIdentificationState,
  (state: IReboardIdentificationState) => state.positionList
);
