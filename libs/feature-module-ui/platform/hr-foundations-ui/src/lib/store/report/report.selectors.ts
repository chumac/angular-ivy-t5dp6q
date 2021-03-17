import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IReportState } from './report.state';
import { IHRFoundationState } from '../root';

const getState = createFeatureSelector<IHRFoundationState>('hr-foundations');
const getReportState = createSelector(getState, (state: IHRFoundationState) => state.report);

export const isProcessingReport = createSelector(
  getReportState,
  (state: IReportState) => state.isProcessing
);

export const isLoadingReport = createSelector(
  getReportState,
  (state: IReportState) => state.isLoading
);

export const showEditorReport = createSelector(
  getReportState,
  (state: IReportState) => state.showEditor
);

export const showViewerReport = createSelector(
  getReportState,
  (state: IReportState) => state.showViewer
);
export const getStandardReport = createSelector(
  getReportState,
  (state: IReportState) => state.standardReport
);

export const getReportPermission = createSelector(
  getReportState,
  (state: IReportState) => state.reportPermission
);

export const getRoleReport = createSelector(
  getReportState,
  (state: IReportState) => state.role
);



