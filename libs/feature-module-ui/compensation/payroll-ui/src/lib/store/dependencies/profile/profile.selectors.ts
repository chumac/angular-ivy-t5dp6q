import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IProfileState } from './profile.state';
import { IRootState } from '../../root/root.state';


const getState = createFeatureSelector<IRootState>('payroll');
const getProfileState = createSelector(getState, (state: IRootState) => state.profile);

export const getProfile = createSelector(
  getProfileState,
  (state: IProfileState) => state.data
);


export const showEditorProfile = createSelector(
  getProfileState,
  (state: IProfileState) => state.showEditor
);

export const showViewerProfile = createSelector(
  getProfileState,
  (state: IProfileState) => state.showViewer
);


export const isProcessingProfile = createSelector(
  getProfileState,
  (state: IProfileState) => state.isProcessing
);

export const isLoadingProfile = createSelector(
  getProfileState,
  (state: IProfileState) => state.isLoading
);

export const isLoadingFormProfile = createSelector(
  getProfileState,
  (state: IProfileState) => state.isLoadingForm
);

export const showTreeProfile = createSelector(
  getProfileState,
  (state: IProfileState) => state.showTree
);

export const getPayrollProfileSelectOption = createSelector(
  getProfileState,
  (state: IProfileState) => state.payrollSelectOption
);

export const getDaysSelectOptionDataProfile = createSelector(
  getProfileState,
  (state: IProfileState) => state.daysData
);

export const getTaxOptionSelectOptionDataProfile = createSelector(
  getProfileState,
  (state: IProfileState) => state.taxOptionData
);

export const getTaxModeSelectOptionDataProfile = createSelector(
  getProfileState,
  (state: IProfileState) => state.taxModeData
);

export const getTaxRuleSelectOptionDataProfile = createSelector(
  getProfileState,
  (state: IProfileState) => state.taxRuleData
);

export const getPaymentCurrencySelectOptionDataProfile = createSelector(
  getProfileState,
  (state: IProfileState) => state.paymentCurrencyData
);

export const getPayPeriodSelectOptionDataProfile = createSelector(
  getProfileState,
  (state: IProfileState) => state.payPeriodData
);

export const getEnterpriseStructureSelectOptionDataProfile = createSelector(
  getProfileState,
  (state: IProfileState) => state.enterpriseStructures
);

export const getStructureDetailsSelectOptionDataProfile = createSelector(
  getProfileState,
  (state: IProfileState) => state.structureDetails
);

export const getCostCenterSelectOptionDataProfile = createSelector(
  getProfileState,
  (state: IProfileState) => state.costCenterData
);

export const getFixedDeductionSelectOptionDataProfile = createSelector(
  getProfileState,
  (state: IProfileState) => state.fixedDeductionData
);

export const getCoinageRoundingSelectOptionDataProfile = createSelector(
  getProfileState,
  (state: IProfileState) => state.coinageRoundingData
);

export const getUpfrontTreatmentSelectOptionDataProfile = createSelector(
  getProfileState,
  (state: IProfileState) => state.upfrontTreatmentData
);

export const getPeriodicProrationSelectOptionDataProfile = createSelector(
  getProfileState,
  (state: IProfileState) => state.periodicProrationData
);

export const getAllowNegativePaySelectOptionDataProfile = createSelector(
  getProfileState,
  (state: IProfileState) => state.allowNegativePay
);

export const getRunCycleSelectOptionDataProfile = createSelector(
  getProfileState,
  (state: IProfileState) => state.runCycle
);

export const getsecurityRoleSelectOptionDataProfile = createSelector(
  getProfileState,
  (state: IProfileState) => state.securityRoles
);

export const getUpdateSecurityGroupEligibilityProfile = createSelector(
  getProfileState,
  (state: IProfileState) => state.canUpdateSecurityGroup
);

export const hasProfileAdminRole = createSelector(
  getProfileState,
  (state: IProfileState) => state.hasProfileAdminRole
);
