import { createSelector, createFeatureSelector } from '@ngrx/store';

import { ICityState } from './city.state';
import { ILookupState } from '../../../store';



const getState = createFeatureSelector<ILookupState>('hr-lookup');
const getCityState = createSelector(getState, (state: ILookupState) => state.city);

export const getCity = createSelector(
  getCityState,
  (state: ICityState) => state.cityData
);

export const isProcessingCity = createSelector(
  getCityState,
  (state: ICityState) => state.isProcessing
);

export const showEditorCity = createSelector(
  getCityState,
  (state: ICityState) => state.showEditor
);

export const getNationData= createSelector(
  getCityState,
  (state: ICityState) => state.nationality
);

export const getStateData= createSelector(
  getCityState,
  (state: ICityState) => state.stateData
);

