import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IConfiguration360State } from './configuration360.state';
import { IConfiguration360 } from '@nutela/models/talent/performance';
import { getPerformanceState, IPerformanceState } from '../../root/performance.state';

export const getConfiguration360State = createSelector(
  getPerformanceState,
  (state: IPerformanceState) => state.configuration360Setup
);

export const isProcessingConfiguration360 = createSelector(
  getConfiguration360State,
  (state: IConfiguration360State) => state.isProcessing
);

export const showEditorConfiguration360 = createSelector(
  getConfiguration360State,
  (state: IConfiguration360State) => state.showEditor
);

export const showViewerConfiguration360 = createSelector(
  getConfiguration360State,
  (state: IConfiguration360State) => state.showViewer
);

export const getConfiguration360Data = createSelector(
  getConfiguration360State,
  (state: IConfiguration360State) => state.configuration360Data
);

export const getConfiguration360Document = createSelector(
  getConfiguration360State,
  (state: IConfiguration360State) => state.document
);

export const getPlanListConfiguration360 = createSelector(
  getConfiguration360State,
  (state: IConfiguration360State) => state.plansList
);

export const getAnalysisListConfiguration360 = createSelector(
  getConfiguration360State,
  (state: IConfiguration360State) => state.analysisList
);

export const getAnalysisDetListConfiguration360 = createSelector(
  getConfiguration360State,
  (state: IConfiguration360State) => state.analysisDetList
);

export const getPositionListConfiguration360 = createSelector(
  getConfiguration360State,
  (state: IConfiguration360State) => state.positionList
);

export const getDesignationListConfiguration360 = createSelector(
  getConfiguration360State,
  (state: IConfiguration360State) => state.designationList
);

export const getGradeListConfiguration360 = createSelector(
  getConfiguration360State,
  (state: IConfiguration360State) => state.gradeList
);

export const getEmployeeListConfiguration360 = createSelector(
  getConfiguration360State,
  (state: IConfiguration360State) => state.employeeList
);
