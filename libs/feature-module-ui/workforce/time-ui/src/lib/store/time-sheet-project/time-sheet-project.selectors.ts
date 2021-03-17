import { createSelector } from '@ngrx/store';

import { ITimeSheetProjectState } from './time-sheet-project.state';
import { getRootState, IRootState } from '../../store/root/root.state';

export const getTimeSheetProjectState = createSelector(
  getRootState,
  (state: IRootState) => state.timeSheetProject
);

export const isProcessingTimeSheetProject = createSelector(
  getTimeSheetProjectState,
  (state: ITimeSheetProjectState) => state.isProcessing
);

export const showEditorTimeSheetProject = createSelector(
  getTimeSheetProjectState,
  (state: ITimeSheetProjectState) => state.showEditor
);

export const showViewerTimeSheetProject = createSelector(
  getTimeSheetProjectState,
  (state: ITimeSheetProjectState) => state.showViewer
);

export const getTimeSheetProjectData = createSelector(
  getTimeSheetProjectState,
  (state: ITimeSheetProjectState) => state.timeSheetProjectData
);

export const getTimeSheetProjectDocument = createSelector(
  getTimeSheetProjectState,
  (state: ITimeSheetProjectState) => state.document
);
