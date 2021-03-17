import { createSelector, createFeatureSelector } from '@ngrx/store';

import { ISystemState } from './system.state';
import { IHRFoundationState } from '../root';

const getState = createFeatureSelector<IHRFoundationState>('hr-foundations');
const getSystemState = createSelector(getState, (state: IHRFoundationState) => state.system);

export const getSystemData = createSelector(
  getSystemState,
  (state: ISystemState) => state.systemData
);

export const isProcessingSystem = createSelector(
  getSystemState,
  (state: ISystemState) => state.isProcessing
);




