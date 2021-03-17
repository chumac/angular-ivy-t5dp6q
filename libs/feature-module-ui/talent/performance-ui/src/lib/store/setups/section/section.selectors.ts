import { createSelector, createFeatureSelector } from '@ngrx/store';

import { ISectionState } from './section.state';
import { ISection } from '@nutela/models/talent/performance';
import { getPerformanceState, IPerformanceState } from '../../root/performance.state';

export const getSectionState = createSelector(
  getPerformanceState,
  (state: IPerformanceState) => state.sectionSetup
);

export const isProcessingSection = createSelector(
  getSectionState,
  (state: ISectionState) => state.isProcessing
);

export const isProcessingGridSection = createSelector(
  getSectionState,
  (state: ISectionState) => state.isProcessingGrid
);

export const showEditorSection = createSelector(
  getSectionState,
  (state: ISectionState) => state.showEditor
);

export const showViewerSection = createSelector(
  getSectionState,
  (state: ISectionState) => state.showViewer
);

export const getSectionData = createSelector(
  getSectionState,
  (state: ISectionState) => state.sectionData
);

export const getSectionDocument = createSelector(
  getSectionState,
  (state: ISectionState) => state.document
);

export const getCustomPageListSection = createSelector(
  getSectionState,
  (state: ISectionState) => state.customPagesList
);
