import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IFormTemplateDetailState } from './form-template-detail.state';
import { IFormTemplateDetail } from '@nutela/models/talent/performance';
import { getPerformanceState, IPerformanceState } from '../../root/performance.state';

export const getFormTemplateDetailState = createSelector(
  getPerformanceState,
  (state: IPerformanceState) => state.formTemplateDetailSetup
);

export const isProcessingFormTemplateDetail = createSelector(
  getFormTemplateDetailState,
  (state: IFormTemplateDetailState) => state.isProcessing
);

export const showEditorFormTemplateDetail = createSelector(
  getFormTemplateDetailState,
  (state: IFormTemplateDetailState) => state.showEditor
);

export const showViewerFormTemplateDetail = createSelector(
  getFormTemplateDetailState,
  (state: IFormTemplateDetailState) => state.showViewer
);

export const getFormTemplateDetailData = createSelector(
  getFormTemplateDetailState,
  (state: IFormTemplateDetailState) => state.formTemplateDetailData
);

export const getFormTemplateDetailTemplateList = createSelector(
  getFormTemplateDetailState,
  (state: IFormTemplateDetailState) => state.formTemplateList
);

export const getFormTemplateDetailPageList = createSelector(
  getFormTemplateDetailState,
  (state: IFormTemplateDetailState) => state.pageList
);

export const getFormTemplateDetailDocument = createSelector(
  getFormTemplateDetailState,
  (state: IFormTemplateDetailState) => state.document
);
