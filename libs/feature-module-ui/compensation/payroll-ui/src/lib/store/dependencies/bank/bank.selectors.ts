import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IBankState } from './bank.state';
import { IRootState } from '../../root/root.state';


const getState = createFeatureSelector<IRootState>('payroll');
const getBankState = createSelector(getState, (state: IRootState) => state.bank);

export const getBank = createSelector(
  getBankState,
  (state: IBankState) => state.data
);


export const showEditorBank = createSelector(
  getBankState,
  (state: IBankState) => state.showEditor
);


export const isProcessingBank = createSelector(
  getBankState,
  (state: IBankState) => state.isProcessing
);

export const isLoadingBank = createSelector(
  getBankState,
  (state: IBankState) => state.isLoading
);

export const getNationBank = createSelector(
  getBankState,
  (state: IBankState) => state.nationality
);

export const getStateBank = createSelector(
  getBankState,
  (state: IBankState) => state.stateData
);
