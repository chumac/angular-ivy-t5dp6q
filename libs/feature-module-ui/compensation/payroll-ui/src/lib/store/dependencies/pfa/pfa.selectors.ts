import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IPfaState } from './pfa.state';
import { IRootState } from '../../root/root.state';


const getState = createFeatureSelector<IRootState>('payroll');
const getPfaState = createSelector(getState, (state: IRootState) => state.pfa);

export const getPfa = createSelector(
  getPfaState,
  (state: IPfaState) => state.data
);


export const showEditorPfa = createSelector(
  getPfaState,
  (state: IPfaState) => state.showEditor
);


export const isProcessingPfa = createSelector(
  getPfaState,
  (state: IPfaState) => state.isProcessing
);

export const isLoadingPfa = createSelector(
  getPfaState,
  (state: IPfaState) => state.isLoading
);

export const getNationPfa = createSelector(
  getPfaState,
  (state: IPfaState) => state.nationality
);

export const getStatePfa= createSelector(
  getPfaState,
  (state: IPfaState) => state.stateData
);

export const getCityPfa= createSelector(
  getPfaState,
  (state: IPfaState) => state.cityData
);
