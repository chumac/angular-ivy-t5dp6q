import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IPerspectiveRatingState } from './perspective-rating.state';
import { IPerspectiveRating } from '@nutela/models/talent/performance';
import { getPerformanceState, IPerformanceState } from '../../root/performance.state';

export const getPerspectiveRatingState = createSelector(
  getPerformanceState,
  (state: IPerformanceState) => state.perspectiveRatingSetup
);

export const isProcessingPerspectiveRating = createSelector(
  getPerspectiveRatingState,
  (state: IPerspectiveRatingState) => state.isProcessing
);

export const showEditorPerspectiveRating = createSelector(
  getPerspectiveRatingState,
  (state: IPerspectiveRatingState) => state.showEditor
);

export const showViewerPerspectiveRating = createSelector(
  getPerspectiveRatingState,
  (state: IPerspectiveRatingState) => state.showViewer
);

export const getPerspectiveRatingData = createSelector(
  getPerspectiveRatingState,
  (state: IPerspectiveRatingState) => state.perspectiveRatingData
); 

export const getPerspectiveRatingPerspectiveList = createSelector(
  getPerspectiveRatingState,
  (state: IPerspectiveRatingState) => state.perspectiveList
); 

export const getPerspectiveRatingDocument = createSelector(
  getPerspectiveRatingState,
  (state: IPerspectiveRatingState) => state.document
);


export const getAnalysisListPerspectiveRating = createSelector(
  getPerspectiveRatingState,
  (state: IPerspectiveRatingState) => state.analysisList
);

export const getAnalysisDetListPerspectiveRating = createSelector(
  getPerspectiveRatingState,
  (state: IPerspectiveRatingState) => state.analysisDetList
);

export const getPositionListPerspectiveRating = createSelector(
  getPerspectiveRatingState,
  (state: IPerspectiveRatingState) => state.positionList
);

export const getDesignationListPerspectiveRating = createSelector(
  getPerspectiveRatingState,
  (state: IPerspectiveRatingState) => state.designationList
);

export const getGradeListPerspectiveRating = createSelector(
  getPerspectiveRatingState,
  (state: IPerspectiveRatingState) => state.gradeList
);

export const getEmployeeListPerspectiveRating = createSelector(
  getPerspectiveRatingState,
  (state: IPerspectiveRatingState) => state.employeeList
);

