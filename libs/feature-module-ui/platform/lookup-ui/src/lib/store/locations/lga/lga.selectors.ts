import { createSelector, createFeatureSelector } from '@ngrx/store';

import { ILgaState } from './lga.state';
import { ILookupState } from '../../../store';



const getState = createFeatureSelector<ILookupState>('hr-lookup');
const getLgaState = createSelector(getState, (state: ILookupState) => state.lga);

export const getLga = createSelector(
  getLgaState,
  (state: ILgaState) => state.lgaData
);

export const isProcessingLga = createSelector(
  getLgaState,
  (state: ILgaState) => state.isProcessing
);

export const showEditorLga = createSelector(
  getLgaState,
  (state: ILgaState) => state.showEditor
);

export const getNationLga= createSelector(
  getLgaState,
  (state: ILgaState) => state.nationality
);

export const getStateLga= createSelector(
  getLgaState,
  (state: ILgaState) => state.stateData
);
