import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IProgressReportState } from './progress-report.state';
import { IPerformanceState, getPerformanceState } from '../../root/performance.state';




export const getProgressReportState = createSelector(
    getPerformanceState,
    (state: IPerformanceState) => state.progressReport
);


export const showEditorProgressDefinition = createSelector(
  getProgressReportState,
  (state: IProgressReportState) => state.showProgressDefinitionEditor
);

export const showEditorProgressTransaction = createSelector(
  getProgressReportState,
  (state: IProgressReportState) => state.showProgressTransactionEditor
);

export const getSingleProgressDefinitionInfo = createSelector(
  getProgressReportState,
  (state: IProgressReportState) => state.singleProgressDefinitionInfo
);

export const getProgressDefinitionInfo = createSelector(
  getProgressReportState,
  (state: IProgressReportState) => state.progressDefinitionInfo
);

export const getProgressTransactionInfo = createSelector(
  getProgressReportState,
  (state: IProgressReportState) => state.progressTransactionInfo
);

export const isProcessingProgressReport = createSelector(
  getProgressReportState,
  (state: IProgressReportState) => state.isProcessing
);

export const getObjectiveByIdInfo = createSelector(
  getProgressReportState,
  (state: IProgressReportState) => state.objectiveDataById
);

export const getImageCacheProgressReport = createSelector(
  getProgressReportState,
  (state: IProgressReportState) => state.imageCache
);


export const getIsLMStatusProgressReport = createSelector(
  getProgressReportState,
  (state: IProgressReportState) => state.isLineManager
);


