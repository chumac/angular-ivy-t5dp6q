import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IEmployeesProfileState, getEmployeesProfileState } from '../../root/employees-profile.state';



import { IProfessionalQualificationsState } from './professional-qualifications.state';


export const getProfessionalQualificationsState = createSelector(
  getEmployeesProfileState,
  (state: IEmployeesProfileState) => state.professionalQualifications
);

export const isProcessingProfessionalQualifications = createSelector(
  getProfessionalQualificationsState,
  (state: IProfessionalQualificationsState) => state.isProcessing
);

export const showEditorProfessionalQualifications = createSelector(
  getProfessionalQualificationsState,
  (state: IProfessionalQualificationsState) => state.showEditor
);

export const showViewerProfessionalQualifications = createSelector(
  getProfessionalQualificationsState,
  (state: IProfessionalQualificationsState) => state.showViewer
);

export const getProfessionalQualificationsApprovedData = createSelector(
  getProfessionalQualificationsState,
  (state: IProfessionalQualificationsState) => state.approvedData
);

export const getProfessionalQualificationsAwaitingApprovalData = createSelector(
  getProfessionalQualificationsState,
  (state: IProfessionalQualificationsState) => state.awaitingApprovalData
);

export const getProfessionalQualificationsDocument = createSelector(
  getProfessionalQualificationsState,
  (state: IProfessionalQualificationsState) => state.document
);

export const getProfessionalQualificationsInlineDocument = createSelector(
  getProfessionalQualificationsState,
  (state: IProfessionalQualificationsState) => state.inlineDocument
);

export const getProfessionalQualificationsApprovedDataMap = createSelector(
  getProfessionalQualificationsState,
  (state: IProfessionalQualificationsState) => state.approvedDataMap
);

