import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IResignState } from './resign.state';
import { getState } from '../root/exit.selector';
import { IExitState } from '../root/exit.state';

export const getResignState = createSelector(
  getState,
  (state: IExitState) => state.resign
);

export const isProcessingResign = createSelector(
  getResignState,
  (state: IResignState) => state.isProcessing
);

export const showEditorResign = createSelector(
  getResignState,
  (state: IResignState) => state.showEditor
);

export const showViewerResign = createSelector(
  getResignState,
  (state: IResignState) => state.showViewer
);

export const showProcessTableViewerResign = createSelector(
  getResignState,
  (state: IResignState) => state.showViewerProcessTable
);

export const showChecklistViewerResign = createSelector(
  getResignState,
  (state: IResignState) => state.showViewerChecklist
);

export const getResignationLetter = createSelector(
  getResignState,
  (state: IResignState) => state.resignationLetter
);

export const getResignationReviewChecklist = createSelector(
  getResignState,
  (state: IResignState) => state.reviewChecklist
);

export const getResignationExitCompletedUrl = createSelector(
  getResignState,
  (state: IResignState) => state.exitCompletedUrl
);

export const getResignationExitInterviewStatus = createSelector(
  getResignState,
  (state: IResignState) => state.exitInterviewStatus
);

export const getResignationProcessTableData = createSelector(
  getResignState,
  (state: IResignState) => state.processTableData
);

