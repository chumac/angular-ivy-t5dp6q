import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IExemptState } from './exempt.state';
import { IExempt } from '@nutela/models/talent/performance';
import { getPerformanceState, IPerformanceState } from '../../root/performance.state';

export const getExemptState = createSelector(
  getPerformanceState,
  (state: IPerformanceState) => state.exemptSetup
);

export const isProcessingExempt = createSelector(
  getExemptState,
  (state: IExemptState) => state.isProcessing
);

export const showEditorExempt = createSelector(
  getExemptState,
  (state: IExemptState) => state.showEditor
);

export const showViewerExempt = createSelector(
  getExemptState,
  (state: IExemptState) => state.showViewer
);

export const getExemptData = createSelector(
  getExemptState,
  (state: IExemptState) => state.exemptData
);

export const getExemptDocument = createSelector(
  getExemptState,
  (state: IExemptState) => state.document
);


export const getExemptPlanList = createSelector(
  getExemptState,
  (state: IExemptState) => state.planList
);

export const getAnalysisListExempt = createSelector(
  getExemptState,
  (state: IExemptState) => state.analysisList
);

export const getAnalysisDetListExempt = createSelector(
  getExemptState,
  (state: IExemptState) => state.analysisDetList
);

export const getPositionListExempt = createSelector(
  getExemptState,
  (state: IExemptState) => state.positionList
);

export const getDesignationListExempt = createSelector(
  getExemptState,
  (state: IExemptState) => state.designationList
);

export const getGradeListExempt = createSelector(
  getExemptState,
  (state: IExemptState) => state.gradeList
);

export const getEmployeeListExempt = createSelector(
  getExemptState,
  (state: IExemptState) => state.employeeList
);



