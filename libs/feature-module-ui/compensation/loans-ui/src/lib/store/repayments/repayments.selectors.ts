import { createSelector } from '@ngrx/store';

import { IRepaymentsState } from './repayments.state';
import { ILoanState, getLoanState} from '../root/root.state';


export const getRepaymentState = createSelector(getLoanState, (state: ILoanState) => state.repayments);

export const isProcessingRepayments = createSelector(getRepaymentState, (state: IRepaymentsState) => state.isProcessing );

export const isLoadingRepayments = createSelector(getRepaymentState, (state: IRepaymentsState) => state.isLoading );

export const showEditorRepayment = createSelector(getRepaymentState, (state: IRepaymentsState) => state.showEditor);

export const showRepaymentViewer = createSelector(getRepaymentState, (state: IRepaymentsState) => state.showViewer );

export const showViewerRepaymentSchedule = createSelector(
  getRepaymentState,
  (state: IRepaymentsState) => state.showRepaymentScheduleViewer
);

export const showViewerPaymentsHistory = createSelector(getRepaymentState, (state: IRepaymentsState) => state.showPayments);

export const getDataRepayments = createSelector(getRepaymentState, (state: IRepaymentsState) => state.repaymentsData);

export const getDataPaymentsHistory = createSelector(getRepaymentState, (state: IRepaymentsState) => state.paymentsHistory);

export const getDataRepaymentTypes = createSelector(getRepaymentState, (state: IRepaymentsState) => state.repaymentTypes);

export const getDataPaymentInstruments = createSelector(getRepaymentState, (state: IRepaymentsState) => state.paymentInstruments);

export const getDefinitionsRepayment = createSelector(getRepaymentState, (state: IRepaymentsState) => state.loanDefinitions);

export const getRunningRepayment = createSelector(getRepaymentState, (state: IRepaymentsState) => state.runningLoans);

export const getRepaymentInterestRepayment = createSelector(getRepaymentState, (state: IRepaymentsState) => state.repaymentInterest);

export const getRepaymentSchedule = createSelector(
  getRepaymentState,
  (state: IRepaymentsState) => state.repaymentScheduleData
);


