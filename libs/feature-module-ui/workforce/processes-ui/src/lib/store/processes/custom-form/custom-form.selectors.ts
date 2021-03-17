import { createSelector, createFeatureSelector } from '@ngrx/store';

import { ICustomFormState } from './custom-form.state';
import { getProcessesState, IProcessesState } from '../../root/processes.state';

export const getCustomFormState = createSelector(
  getProcessesState,
  (state: IProcessesState) => state.customForm
);

export const isProcessingCustomForm = createSelector(
  getCustomFormState,
  (state: ICustomFormState) => state.isProcessing
);

export const showEditorCustomForm = createSelector(
  getCustomFormState,
  (state: ICustomFormState) => state.showEditor
);

export const showViewerCustomForm = createSelector(
  getCustomFormState,
  (state: ICustomFormState) => state.showViewer
);

export const getCustomFormData = createSelector(
  getCustomFormState,
  (state: ICustomFormState) => state.customFormData
);

export const getCustomFormDataSetType = createSelector(
  getCustomFormState,
  (state: ICustomFormState) => state.dataSetTypes
);

export const getCustomFormCascadeDataSetType = createSelector(
  getCustomFormState,
  (state: ICustomFormState) => state.cascadeDataSetTypes
);

export const getCustomFormTypeList = createSelector(getCustomFormState,(state: ICustomFormState) => state.typeList);
export const getCustomFormAreaList = createSelector(getCustomFormState,(state: ICustomFormState) => state.areaList);
export const getCustomFormScopeList = createSelector(getCustomFormState,(state: ICustomFormState) => state.scopeList);
export const getCustomFormEligibilityList = createSelector(getCustomFormState,(state: ICustomFormState) => state.eligibilityList);
export const getCustomFormWorkFlowList = createSelector(getCustomFormState,(state: ICustomFormState) => state.workFlowList);