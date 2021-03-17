import { createSelector } from '@ngrx/store';

import { IDisbursementsState } from './disbursements.state';
import { ILoanState, getLoanState} from '../root/root.state';


export const getDisbursementState = createSelector(getLoanState, (state: ILoanState) => state.disbursements);

export const isProcessingDisbursements = createSelector(getDisbursementState, (state: IDisbursementsState) => state.isProcessing );

export const isLoadingDisbursements = createSelector(getDisbursementState, (state: IDisbursementsState) => state.isLoading );

export const showEditorDisbursement = createSelector(getDisbursementState, (state: IDisbursementsState) => state.showEditor);

export const showViewerDisbursement = createSelector(getDisbursementState, (state: IDisbursementsState) => state.showViewer);

export const getDataDisbursements = createSelector(getDisbursementState, (state: IDisbursementsState) => state.disbursementsData);

export const getDisbursedDataDisbursements = createSelector(getDisbursementState, (state: IDisbursementsState) => state.disbursedData);

export const getDefinitions = createSelector(getDisbursementState, (state: IDisbursementsState) => state.loanDefinitions);


