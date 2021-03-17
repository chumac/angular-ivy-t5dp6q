import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IHrCustomDataFormState } from './hr-custom-data-form.state';
import { getProcessesState, IProcessesState } from '../../root/processes.state';

export const getHrCustomDataFormState  = createSelector(
  getProcessesState,
  (state: IProcessesState) => state.hrCustomDataForm
);

export const isProcessingHrCustomDataForm = createSelector(
  getHrCustomDataFormState,
  (state: IHrCustomDataFormState) => state.isProcessing
);

export const isProcessingAltHrCustomDataForm = createSelector(
  getHrCustomDataFormState,
  (state: IHrCustomDataFormState) => state.isProcessingAlt
);

export const showEditorHrCustomDataForm = createSelector(
  getHrCustomDataFormState,
  (state: IHrCustomDataFormState) => state.showEditor
);

export const showViewerHrCustomDataForm = createSelector(
  getHrCustomDataFormState,
  (state: IHrCustomDataFormState) => state.showViewer
);

export const getHrCustomDataFormData = createSelector(
  getHrCustomDataFormState,
  (state: IHrCustomDataFormState) => state.hrCustomDataFormData
);
