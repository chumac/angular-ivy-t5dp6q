import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IControlState } from './control.state';
import { IControl } from '@nutela/models/talent/performance';
import { getPerformanceState, IPerformanceState } from '../../root/performance.state';

export const getControlState = createSelector(
  getPerformanceState,
  (state: IPerformanceState) => state.controlSetup
);

export const isProcessingControl = createSelector(
  getControlState,
  (state: IControlState) => state.isProcessing
);

export const isProcessingGridControl = createSelector(
  getControlState,
  (state: IControlState) => state.isProcessingGrid
);

export const showEditorControl = createSelector(
  getControlState,
  (state: IControlState) => state.showEditor
);

export const showViewerControl = createSelector(
  getControlState,
  (state: IControlState) => state.showViewer
);

export const getControlData = createSelector(
  getControlState,
  (state: IControlState) => state.controlData
);

export const getControlDocument = createSelector(
  getControlState,
  (state: IControlState) => state.document
);

export const getCustomPageListControl = createSelector(
  getControlState,
  (state: IControlState) => state.customPagesList
);

export const getSectionListControl = createSelector(
  getControlState,
  (state: IControlState) => state.sectionList
);