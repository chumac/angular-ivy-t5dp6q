import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IReligionsState } from './religions.state';
import { ILookupState } from '../../store';


const getState = createFeatureSelector<ILookupState>('hr-lookup');
const getReligionsState = createSelector(getState, (state: ILookupState) => state.religion);

export const getReligions = createSelector(
  getReligionsState,
  (state: IReligionsState) => state.religionData
);

export const isProcessingReligions = createSelector(
  getReligionsState,
  (state: IReligionsState) => state.isProcessing
);

export const showEditorReligions = createSelector(
  getReligionsState,
  (state: IReligionsState) => state.showEditor
);


