import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IRootState } from './../../root';
import { ITaxManagementState } from './tax-management.state';

const getState = createFeatureSelector<IRootState>('payroll');
const getTaxManagementState = createSelector(getState, (state: IRootState) => state.taxManagement);

export const getTaxManagementData = createSelector(
  getTaxManagementState,
  (state: ITaxManagementState) => state.taxManagementList
);

export const getTaxManagementProfileData = createSelector(
  getTaxManagementState,
  (state: ITaxManagementState) => state.taxManagementProfileList
);

export const showEditorTaxManagementProfile = createSelector(
  getTaxManagementState,
  (state: ITaxManagementState) => state.showEditor
);

export const isProcessingTaxManagement = createSelector(
  getTaxManagementState,
  (state: ITaxManagementState) => state.isProcessing
);

export const isLoadingTaxManagement = createSelector(
  getTaxManagementState,
  (state: ITaxManagementState) => state.isLoading
);

export const getPercentageGrossData = createSelector(
  getTaxManagementState,
  (state: ITaxManagementState) => state.percentageGrossList
);

export const showPercentGrossEditor = createSelector(
  getTaxManagementState,
  (state: ITaxManagementState) => state.showPercentGrossEditor
);

export const getTaxStandardData = createSelector(
  getTaxManagementState,
  (state: ITaxManagementState) => state.taxStandardList
);

export const showTaxStandardEditor = createSelector(
  getTaxManagementState,
  (state: ITaxManagementState) => state.showTaxStandardEditor
);

export const getRangePercentData = createSelector(
  getTaxManagementState,
  (state: ITaxManagementState) => state.rangePercentList
);

export const showRangePercentEditor = createSelector(
  getTaxManagementState,
  (state: ITaxManagementState) => state.showRangePercentEditor
);

export const getRangeValueData = createSelector(
  getTaxManagementState,
  (state: ITaxManagementState) => state.rangeValueList
);

export const showRangeValueEditor = createSelector(
  getTaxManagementState,
  (state: ITaxManagementState) => state.showRangeValueEditor
);

export const getTaxFixedDeductionData = createSelector(
  getTaxManagementState,
  (state: ITaxManagementState) => state.taxFixedDeduction
);

export const showTaxFixedDeduction = createSelector(
  getTaxManagementState,
  (state: ITaxManagementState) => state.showTaxFixedDeduction
);

export const getTaxFixedDeductionValue = createSelector(
  getTaxManagementState,
  (state: ITaxManagementState) => state.taxFixedDeductionValue
);

export const showTaxProfile = createSelector(
  getTaxManagementState,
  (state: ITaxManagementState) => state.showTaxProfile
);

export const showTaxStandardView = createSelector(
  getTaxManagementState,
  (state: ITaxManagementState) => state.showTaxStandardView
);

export const showRangePercentView = createSelector(
  getTaxManagementState,
  (state: ITaxManagementState) => state.showTaxRangePercentView
);

export const showRangeValueView = createSelector(
  getTaxManagementState,
  (state: ITaxManagementState) => state.showTaxRangeValueView
);

export const showGrossPercentView = createSelector(
  getTaxManagementState,
  (state: ITaxManagementState) => state.showTaxGrossPercentView
);
