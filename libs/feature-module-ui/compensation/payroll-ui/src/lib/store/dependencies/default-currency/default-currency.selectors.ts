import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IDefaultCurrencyState } from './default-currency.state';
import { IRootState } from '../../root/root.state';


const getState = createFeatureSelector<IRootState>('payroll');
const getDefaultCurrencyState = createSelector(getState, (state: IRootState) => state.defaultCurrency);

export const getDefaultCurrency = createSelector(
  getDefaultCurrencyState,
  (state: IDefaultCurrencyState) => state.data
);


export const showEditorDefaultCurrency = createSelector(
  getDefaultCurrencyState,
  (state: IDefaultCurrencyState) => state.showEditor
);


export const isProcessingDefaultCurrency = createSelector(
  getDefaultCurrencyState,
  (state: IDefaultCurrencyState) => state.isProcessing
);

export const isLoadingDefaultCurrency = createSelector(
  getDefaultCurrencyState,
  (state: IDefaultCurrencyState) => state.isLoading
);
