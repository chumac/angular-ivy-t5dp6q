import { createSelector } from '@ngrx/store';
import { IEmployeesProfileState, getEmployeesProfileState } from '../../root/employees-profile.state';


import { IGuarantorState } from './guarantor.state';

export const getGuarantorState  = createSelector(
  getEmployeesProfileState,
  (state: IEmployeesProfileState) => state.guarantor
);

export const isProcessingGuarantor = createSelector(
  getGuarantorState,
  (state: IGuarantorState) => state.isProcessing
);

export const showEditorGuarantor = createSelector(
  getGuarantorState,
  (state: IGuarantorState) => state.showEditor
);

export const showViewerGuarantor = createSelector(
  getGuarantorState,
  (state: IGuarantorState) => state.showViewer
);

export const getGuarantorApprovedData = createSelector(
  getGuarantorState,
  (state: IGuarantorState) => state.approvedData
);

export const getGuarantorAwaitingApprovalData = createSelector(
  getGuarantorState,
  (state: IGuarantorState) => state.awaitingApprovalData
);

export const getGuarantorDocument = createSelector(
  getGuarantorState,
  (state: IGuarantorState) => state.document
);

export const getGuarantorInlineDocument = createSelector(
  getGuarantorState,
  (state: IGuarantorState) => state.inlineDocument
);

export const getGuarantorApprovedPhoto = createSelector(
  getGuarantorState,
  (state: IGuarantorState) => state.approvedPhoto
);

export const getGuarantorAwaitingApprovalPhoto = createSelector(
  getGuarantorState,
  (state: IGuarantorState) => state.awaitingApprovalPhoto
);
