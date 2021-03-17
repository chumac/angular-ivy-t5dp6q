import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IValidLocationState } from './valid-location.state';
import { IAbsenceState } from '../../root';

export const getState = createFeatureSelector<IAbsenceState>('absence');

export const getValidLocationState = createSelector(getState, (state: IAbsenceState) => state.validLocation);

export const isProcessingValidLocation = createSelector(
  getValidLocationState,
  (state: IValidLocationState) => state.isProcessing
);

export const showEditorValidLocation = createSelector(
  getValidLocationState,
  (state: IValidLocationState) => state.showEditor
);

export const showViewerValidLocation = createSelector(
  getValidLocationState,
  (state: IValidLocationState) => state.showViewer
);

export const getValidLocationData = createSelector(
  getValidLocationState,
  (state: IValidLocationState) => state.validLocationData
);
