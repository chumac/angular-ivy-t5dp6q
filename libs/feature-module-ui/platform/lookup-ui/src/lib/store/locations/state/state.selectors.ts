import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IStateState } from './state.state';
import { ILookupState } from '../../../store';



const getState = createFeatureSelector<ILookupState>('hr-lookup');
const getStateState = createSelector(getState, (state: ILookupState) => state.state);

export const getStates= createSelector(
  getStateState,
  (state: IStateState) => state.stateData
);

export const isProcessingState= createSelector(
  getStateState,
  (state: IStateState) => state.isProcessing
);

export const showEditorState= createSelector(
  getStateState,
  (state: IStateState) => state.showEditor
);

export const getNation= createSelector(
  getStateState,
  (state: IStateState) => state.nationality
);

