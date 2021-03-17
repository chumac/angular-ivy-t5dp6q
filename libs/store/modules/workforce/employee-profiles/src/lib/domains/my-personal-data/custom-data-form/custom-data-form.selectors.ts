import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ICustomDataFormState } from './custom-data-form.state';

export const getCustomDataFormState = createFeatureSelector<ICustomDataFormState>('customDataForm');

export const isProcessingCustomDataForm = createSelector(
  getCustomDataFormState,
  (state: ICustomDataFormState) => state.isProcessing
);

export const isProcessingAltCustomDataForm = createSelector(
  getCustomDataFormState,
  (state: ICustomDataFormState) => state.isProcessingAlt
);

export const showEditorCustomDataForm = createSelector(
  getCustomDataFormState,
  (state: ICustomDataFormState) => state.showEditor
);

export const showViewerCustomDataForm = createSelector(
  getCustomDataFormState,
  (state: ICustomDataFormState) => state.showViewer
);

export const getCustomDataFormData = createSelector(
  getCustomDataFormState,
  (state: ICustomDataFormState) => state.customDataFormData
);
