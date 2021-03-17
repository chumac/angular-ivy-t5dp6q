import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IFormTemplateState } from './form-template.state';
import { IFormTemplate } from '@nutela/models/talent/performance';
import { getPerformanceState, IPerformanceState } from '../../root/performance.state';

export const getFormTemplateState = createSelector(
  getPerformanceState,
  (state: IPerformanceState) => state.formTemplateSetup
);

export const isProcessingFormTemplate = createSelector(
  getFormTemplateState,
  (state: IFormTemplateState) => state.isProcessing
);

export const showEditorFormTemplate = createSelector(
  getFormTemplateState,
  (state: IFormTemplateState) => state.showEditor
);

export const showViewerFormTemplate = createSelector(
  getFormTemplateState,
  (state: IFormTemplateState) => state.showViewer
);

export const getFormTemplateData = createSelector(
  getFormTemplateState,
  (state: IFormTemplateState) => state.formTemplateData
);

export const getFormTemplateDocument = createSelector(
  getFormTemplateState,
  (state: IFormTemplateState) => state.document
);

export const getAnalysisListFormTemplate = createSelector(
  getFormTemplateState,
  (state: IFormTemplateState) => state.analysisList
);

export const getAnalysisDetListFormTemplate = createSelector(
  getFormTemplateState,
  (state: IFormTemplateState) => state.analysisDetList
);

export const getPositionListFormTemplate = createSelector(
  getFormTemplateState,
  (state: IFormTemplateState) => state.positionList
);

export const getDesignationListFormTemplate = createSelector(
  getFormTemplateState,
  (state: IFormTemplateState) => state.designationList
);

export const getGradeListFormTemplate = createSelector(
  getFormTemplateState,
  (state: IFormTemplateState) => state.gradeList
);

export const getEmployeeListFormTemplate = createSelector(
  getFormTemplateState,
  (state: IFormTemplateState) => state.employeeList
);
