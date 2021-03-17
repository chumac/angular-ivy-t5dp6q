import { createSelector, createFeatureSelector } from '@ngrx/store';

import { ICurrencyState } from './payment-currency.state';
import { IRootState } from '../../root/root.state';


const getState = createFeatureSelector<IRootState>('payroll');
const getCurrencyState = createSelector(getState, (state: IRootState) => state.currency);

export const getCurrency = createSelector(
  getCurrencyState,
  (state: ICurrencyState) => state.data
);


export const showEditorCurrency = createSelector(
  getCurrencyState,
  (state: ICurrencyState) => state.showEditor
);


export const isProcessingCurrency = createSelector(
  getCurrencyState,
  (state: ICurrencyState) => state.isProcessing
);

export const isLoadingCurrency = createSelector(
  getCurrencyState,
  (state: ICurrencyState) => state.isLoading
);
