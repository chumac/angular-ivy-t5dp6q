import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IPageState } from './page.state';
import { IPage } from '@nutela/models/talent/performance';
import { getPerformanceState, IPerformanceState } from '../../root/performance.state';

export const getPageState = createSelector(
  getPerformanceState,
  (state: IPerformanceState) => state.pageSetup
);

export const isProcessingPage = createSelector(
  getPageState,
  (state: IPageState) => state.isProcessing
);

export const showEditorPage = createSelector(
  getPageState,
  (state: IPageState) => state.showEditor
);

export const showViewerPage = createSelector(
  getPageState,
  (state: IPageState) => state.showViewer
);

export const getPageData = createSelector(
  getPageState,
  (state: IPageState) => state.pageData
);

export const getPageDocument = createSelector(
  getPageState,
  (state: IPageState) => state.document
);

export const getCompletedPageData = createSelector(
  getPageState,
  (state: IPageState) => state.completedPageData
);

export const getUncompletedPageData = createSelector(
  getPageState,
  (state: IPageState) => state.uncompletedPageData
);

export const getPageType = createSelector(
  getPageState,
  (state: IPageState) => state.pageType
);