import { createSelector, createFeatureSelector } from '@ngrx/store';

import { INationalityState } from './nationality.state';
import { ILookupState } from '../../../store';



const getState = createFeatureSelector<ILookupState>('hr-lookup');
const getNationalityState = createSelector(getState, (state: ILookupState) => state.nationality);

export const getNationality = createSelector(
  getNationalityState,
  (state: INationalityState) => state.nationalityData
);

export const isProcessingNationality = createSelector(
  getNationalityState,
  (state: INationalityState) => state.isProcessing
);

export const showEditorNationality = createSelector(
  getNationalityState,
  (state: INationalityState) => state.showEditor
);


