import { createSelector } from '@ngrx/store';

import { IReboardGuarantorState } from './reboard-guarantor.state';

import { getEmployeesProfileState, IEmployeesProfileState } from 'libs/feature-module-ui/workforce/employee-profiles-ui/src/lib/store/root/employees-profile.state';

export const getReboardGuarantorState = createSelector(
  getEmployeesProfileState,
  (state: IEmployeesProfileState) => state.reboardGuarantor
);

export const isProcessingReboardGuarantor = createSelector(
  getReboardGuarantorState,
  (state: IReboardGuarantorState) => state.isProcessing
);

export const showEditorReboardGuarantor = createSelector(
  getReboardGuarantorState,
  (state: IReboardGuarantorState) => state.showEditor
);

export const showViewerReboardGuarantor = createSelector(
  getReboardGuarantorState,
  (state: IReboardGuarantorState) => state.showViewer
);

export const getReboardGuarantorData = createSelector(
  getReboardGuarantorState,
  (state: IReboardGuarantorState) => state.data
);

export const getReboardGuarantorDocument = createSelector(
  getReboardGuarantorState,
  (state: IReboardGuarantorState) => state.document
);

export const getReboardGuarantorInlineDocument = createSelector(
  getReboardGuarantorState,
  (state: IReboardGuarantorState) => state.inlineDocument
);

export const getReboardGuarantorPhoto = createSelector(
  getReboardGuarantorState,
  (state: IReboardGuarantorState) => state.photo
);
