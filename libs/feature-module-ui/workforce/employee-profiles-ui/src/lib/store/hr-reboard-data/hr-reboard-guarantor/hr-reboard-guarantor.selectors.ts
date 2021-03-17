import { createSelector } from '@ngrx/store';

import { IHrReboardGuarantorState } from './hr-reboard-guarantor.state';

import { getEmployeesProfileState, IEmployeesProfileState } from 'libs/feature-module-ui/workforce/employee-profiles-ui/src/lib/store/root/employees-profile.state';

export const getHrReboardGuarantorState = createSelector(
  getEmployeesProfileState,
  (state: IEmployeesProfileState) => state.hrReboardGuarantor
);

export const isProcessingHrReboardGuarantor = createSelector(
  getHrReboardGuarantorState,
  (state: IHrReboardGuarantorState) => state.isProcessing
);

export const showEditorHrReboardGuarantor = createSelector(
  getHrReboardGuarantorState,
  (state: IHrReboardGuarantorState) => state.showEditor
);

export const showViewerHrReboardGuarantor = createSelector(
  getHrReboardGuarantorState,
  (state: IHrReboardGuarantorState) => state.showViewer
);

export const getHrReboardGuarantorData = createSelector(
  getHrReboardGuarantorState,
  (state: IHrReboardGuarantorState) => state.data
);

export const getHrReboardGuarantorDocument = createSelector(
  getHrReboardGuarantorState,
  (state: IHrReboardGuarantorState) => state.document
);

export const getHrReboardGuarantorInlineDocument = createSelector(
  getHrReboardGuarantorState,
  (state: IHrReboardGuarantorState) => state.inlineDocument
);

export const getHrReboardGuarantorPhoto = createSelector(
  getHrReboardGuarantorState,
  (state: IHrReboardGuarantorState) => state.photo
);
