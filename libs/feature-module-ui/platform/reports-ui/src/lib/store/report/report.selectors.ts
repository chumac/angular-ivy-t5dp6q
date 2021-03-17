import { createSelector, createFeatureSelector } from '@ngrx/store';

// import { IRootState, getRootState } from '../root/root.state';

import { IReportState } from './report.state';

// export const getReportState = createSelector(
//   getRootState,
//   (state: IRootState) => state.report
// );

export const getReportState = createFeatureSelector<IReportState>('report');

export const getReportData = createSelector(
  getReportState,
  (state: IReportState) => state.reportData
);

export const getReportUrl = createSelector(
  getReportState,
  (state: IReportState) => state.reportUrl
);

export const getSingleReportData = createSelector(
  getReportState,
  (state: IReportState) => state.reportSingleData
);

export const isProcessingReport = createSelector(
  getReportState,
  (state: IReportState) => state.isProcessing
);
