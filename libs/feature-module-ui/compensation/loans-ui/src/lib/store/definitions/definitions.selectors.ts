import { createSelector } from '@ngrx/store';

import { ILoanState, getLoanState} from '../root/root.state';
import { IDefinitionsState } from './definitions.state';

export const getDefinitionsState = createSelector(getLoanState, (state: ILoanState) => state.definitions);

export const isProcessingDefinitions = createSelector(getDefinitionsState, (state: IDefinitionsState) => state.isProcessing );

export const isLoadingDefinitions = createSelector(getDefinitionsState, (state: IDefinitionsState) => state.isLoading );

export const showLoanDefinitionEditor = createSelector(getDefinitionsState, (state: IDefinitionsState) => state.showEditor );

export const getDataLoanDefinitions = createSelector(getDefinitionsState, (state: IDefinitionsState) => state.definitionsData );

export const getDataPayrollProfiles = createSelector(getDefinitionsState, (state: IDefinitionsState) => state.payrollProfilesData );

export const getDataDeductionRules = createSelector(getDefinitionsState, (state: IDefinitionsState) => state.deductionRulesData );

export const getDataDeductionAllowances = createSelector(getDefinitionsState, (state: IDefinitionsState) => state.deductionAllowancesData);

export const getIntDataDeductionAllowances = createSelector(getDefinitionsState, (state: IDefinitionsState) => state.intDeductionAllowancesData );

export const getDataAmortizationRules = createSelector(getDefinitionsState, (state: IDefinitionsState) => state.amortizationRulesData );

export const getDataGroupNames = createSelector(getDefinitionsState, (state: IDefinitionsState) => state.groupNamesData );

export const getPayrollProfileSelect = createSelector(getDefinitionsState, (state: IDefinitionsState) => state.payrollProfileSelect );
