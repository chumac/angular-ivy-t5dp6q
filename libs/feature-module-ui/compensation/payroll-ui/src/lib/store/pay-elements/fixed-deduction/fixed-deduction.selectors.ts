import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IFixedDeductionState } from './fixed-deduction.state';
import { IRootState } from '../../root/root.state';


const getState = createFeatureSelector<IRootState>('payroll');
const getFixedDeductionState = createSelector(getState, (state: IRootState) => state.fixedDeduction);

export const showEditorFixedDeduction = createSelector(
  getFixedDeductionState, (state: IFixedDeductionState) => state.showEditor
);

export const showViewerFixedDeduction = createSelector(
  getFixedDeductionState, (state: IFixedDeductionState) => state.showViewer
);

export const showViewerEmployeeRateFixedDeduction = createSelector(
  getFixedDeductionState, (state: IFixedDeductionState) => state.showEmployeeRateViewer
);

export const showViewerPaygroupRateFixedDeduction = createSelector(
  getFixedDeductionState, (state: IFixedDeductionState) => state.showPaygroupRateViewer
);

export const showViewerGlobalRateFixedDeduction = createSelector(
  getFixedDeductionState, (state: IFixedDeductionState) => state.showGlobalViewer
);

export const isProcessingFixedDeduction = createSelector(
  getFixedDeductionState, (state: IFixedDeductionState) => state.isProcessing
);

export const isLoadingFixedDeduction = createSelector(
  getFixedDeductionState, (state: IFixedDeductionState) => state.isLoading
);

export const showRateEditorFixedDeduction = createSelector(
  getFixedDeductionState, (state: IFixedDeductionState) => state.showRateEditor
);

export const showConfigureEditorFixedDeduction = createSelector(
  getFixedDeductionState, (state: IFixedDeductionState) => state.showConfigureEditor
);

export const isProcessingItemCheckFixedDeduction = createSelector(
  getFixedDeductionState,
  (state: IFixedDeductionState) => state.isProcessingItemCheck
);


export const getDataFixedDeduction = createSelector(
  getFixedDeductionState, (state: IFixedDeductionState) => state.data
);

export const getPaygroupRatesFixedDeduction = createSelector(
  getFixedDeductionState, (state: IFixedDeductionState) => state.paygroupRates
);

export const getEmployeeRatesFixedDeduction = createSelector(
  getFixedDeductionState, (state: IFixedDeductionState) => state.employeeRates
);

export const getGlobalRatesFixedDeduction = createSelector(
  getFixedDeductionState, (state: IFixedDeductionState) => state.globalRates
);

export const getPaymentItemTypesFixedDeduction = createSelector(
  getFixedDeductionState, (state: IFixedDeductionState) => state.deductItemTypes
);


export const getDeductionListFixedDeduction = createSelector(
  getFixedDeductionState, (state: IFixedDeductionState) => state.deductionList
);

export const getCurrenciesFixedDeduction = createSelector(
  getFixedDeductionState, (state: IFixedDeductionState) => state.currencyList
);

export const getEligibilityListFixedDeduction = createSelector(
  getFixedDeductionState, (state: IFixedDeductionState) => state.eligibilityList
);

export const getGroupListFixedDeduction = createSelector(
  getFixedDeductionState, (state: IFixedDeductionState) => state.groupList
);

export const getMonthListFixedDeduction = createSelector(
  getFixedDeductionState, (state: IFixedDeductionState) => state.monthList
);

export const getDeductFormulaeFixedDeduction = createSelector(
  getFixedDeductionState, (state: IFixedDeductionState) => state.deductFormulaList
);

export const getPaygroupListFixedDeduction = createSelector(
  getFixedDeductionState, (state: IFixedDeductionState) => state.paygroupList
);

export const getPayrollProfileFixedDeduction = createSelector(
  getFixedDeductionState, (state: IFixedDeductionState) => state.payrollProfileList
);

export const getPayrollTypeListFixedDeduction = createSelector(
  getFixedDeductionState, (state: IFixedDeductionState) => state.payrollTypes
);

export const getProrationDateTypeListFixedDeduction = createSelector(
  getFixedDeductionState, (state: IFixedDeductionState) => state.prorationDateList
);


export const getPaymentFrequencyListFixedDeduction = createSelector(
  getFixedDeductionState, (state: IFixedDeductionState) => state.payFrequencies
);

export const employeeRateChartExistFixedDeduction = createSelector(
  getFixedDeductionState,
  (state: IFixedDeductionState) => state.employeeRateChartCheck
);

export const paygroupRateChartExistFixedDeduction = createSelector(
  getFixedDeductionState,
  (state: IFixedDeductionState) => state.paygroupRateChartCheck
);

export const getCriteriaConfigurationCheckFixedDeduction = createSelector(
  getFixedDeductionState,
  (state: IFixedDeductionState) => state.criteriaCheck
);

export const getCriteriaConfigurationDataFixedDeduction = createSelector(
  getFixedDeductionState,
  (state: IFixedDeductionState) => state.criteriaConfiguration
);
