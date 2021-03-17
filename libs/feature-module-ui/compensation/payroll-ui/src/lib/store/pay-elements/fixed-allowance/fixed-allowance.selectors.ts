import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IFixedAllowanceState } from './fixed-allowance.state';
import { IRootState } from '../../root/root.state';

const getState = createFeatureSelector<IRootState>('payroll');
const getFixedAllowanceState = createSelector(getState,(state: IRootState) => state.fixedAllowance);

export const showEditorFixedAllowance = createSelector(
  getFixedAllowanceState, (state: IFixedAllowanceState) => state.showEditor
);

export const showViewerFixedAllowance = createSelector(
  getFixedAllowanceState, (state: IFixedAllowanceState) => state.showViewer
);

export const showViewerEmployeeRateFixedAllowance = createSelector(
  getFixedAllowanceState, (state: IFixedAllowanceState) => state.showEmployeeRateViewer
);

export const showViewerPaygroupRateFixedAllowance = createSelector(
  getFixedAllowanceState, (state: IFixedAllowanceState) => state.showPaygroupRateViewer
);

export const showViewerGlobalRateFixedAllowance = createSelector(
  getFixedAllowanceState, (state: IFixedAllowanceState) => state.showGlobalRateViewer
);

export const isProcessingFixedAllowance = createSelector(
  getFixedAllowanceState, (state: IFixedAllowanceState) => state.isProcessing
);

export const isLoadingFixedAllowance = createSelector(
  getFixedAllowanceState, (state: IFixedAllowanceState) => state.isLoading
);

export const showRateEditorFixedAllowance = createSelector(
  getFixedAllowanceState, (state: IFixedAllowanceState) => state.showRateEditor
);

export const showConfigureEditorFixedAllowance = createSelector(
  getFixedAllowanceState, (state: IFixedAllowanceState) => state.showConfigureEditor
);

export const isProcessingItemCheckFixedAllowance = createSelector(
  getFixedAllowanceState,
  (state: IFixedAllowanceState) => state.isProcessingItemCheck
);


export const getDataFixedAllowance = createSelector(
  getFixedAllowanceState, (state: IFixedAllowanceState) => state.data
);

export const getFilteredFixedAllowance = createSelector(
  getFixedAllowanceState, (state: IFixedAllowanceState) => state.filteredData
);

export const getPaygroupRatesFixedAllowance = createSelector(
  getFixedAllowanceState, (state: IFixedAllowanceState) => state.paygroupRates
);

export const getEmployeeRatesFixedAllowance = createSelector(
  getFixedAllowanceState, (state: IFixedAllowanceState) => state.employeeRates
);

export const getGlobalRatesFixedAllowance = createSelector(
  getFixedAllowanceState, (state: IFixedAllowanceState) => state.globalRates
);

export const getPaymentItemTypesFixedAllowance = createSelector(
  getFixedAllowanceState, (state: IFixedAllowanceState) => state.payItemTypes
);


export const getAllowanceListFixedAllowance = createSelector(
  getFixedAllowanceState, (state: IFixedAllowanceState) => state.allowanceList
);

export const getCurrenciesFixedAllowance = createSelector(
  getFixedAllowanceState, (state: IFixedAllowanceState) => state.currencyList
);

export const getEligibilityListFixedAllowance = createSelector(
  getFixedAllowanceState, (state: IFixedAllowanceState) => state.eligibilityList
);

export const getGroupListFixedAllowance = createSelector(
  getFixedAllowanceState, (state: IFixedAllowanceState) => state.groupList
);

export const getMonthListFixedAllowance = createSelector(
  getFixedAllowanceState, (state: IFixedAllowanceState) => state.monthList
);

export const getPayFormulaeFixedAllowance = createSelector(
  getFixedAllowanceState, (state: IFixedAllowanceState) => state.payFormulaList
);

export const getPaygroupListFixedAllowance = createSelector(
  getFixedAllowanceState, (state: IFixedAllowanceState) => state.paygroupList
);

export const getPayrollProfileFixedAllowance = createSelector(
  getFixedAllowanceState, (state: IFixedAllowanceState) => state.payrollProfileList
);

export const getPayrollTypeListFixedAllowance = createSelector(
  getFixedAllowanceState, (state: IFixedAllowanceState) => state.payrollTypes
);

export const getProrationDateTypeListFixedAllowance = createSelector(
  getFixedAllowanceState, (state: IFixedAllowanceState) => state.prorationDateList
);


export const getPaymentFrequencyListFixedAllowance = createSelector(
  getFixedAllowanceState, (state: IFixedAllowanceState) => state.payFrequencies
);

export const employeeRateChartExistFixedAllowance = createSelector(
  getFixedAllowanceState,
  (state: IFixedAllowanceState) => state.employeeRateChartCheck
);

export const paygroupRateChartExistFixedAllowance = createSelector(
  getFixedAllowanceState,
  (state: IFixedAllowanceState) => state.paygroupRateChartCheck
);

export const getCriteriaConfigurationCheckFixedAllowance = createSelector(
  getFixedAllowanceState,
  (state: IFixedAllowanceState) => state.criteriaCheck
);

export const getCriteriaConfigurationDataFixedAllowance = createSelector(
  getFixedAllowanceState,
  (state: IFixedAllowanceState) => state.criteriaConfiguration
);
