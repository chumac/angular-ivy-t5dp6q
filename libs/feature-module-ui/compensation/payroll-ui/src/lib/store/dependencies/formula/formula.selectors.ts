import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IFormulaState } from './formula.state';
import { IRootState } from '../../root/root.state';


const getState = createFeatureSelector<IRootState>('payroll');
const getFormulaState = createSelector(getState, (state: IRootState) => state.formula);

export const getFormula = createSelector(
  getFormulaState,
  (state: IFormulaState) => state.data
);

export const getFilteredFormula = createSelector(
  getFormulaState,
  (state: IFormulaState) => state.filteredData
);

export const showEditorFormula = createSelector(
  getFormulaState,
  (state: IFormulaState) => state.showEditor
);


export const isProcessingFormula = createSelector(
  getFormulaState,
  (state: IFormulaState) => state.isProcessing
);

export const isLoadingFormula = createSelector(
  getFormulaState,
  (state: IFormulaState) => state.isLoading
);

export const getRoleData = createSelector(
  getFormulaState,
  (state: IFormulaState) => state.roles
);

export const hasFormulaAdminRole = createSelector(
  getFormulaState,
  (state: IFormulaState) => state.hasFormulaAdminRole
);
