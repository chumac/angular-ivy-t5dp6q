import { createSelector } from '@ngrx/store';

import { ILoanState, getLoanState} from '../root/root.state';
import { ITransactionsState } from './transactions.state';

export const getTransactionsState = createSelector(getLoanState, (state: ILoanState) => state.transactions);

export const isProcessingTransactions = createSelector(getTransactionsState, (state: ITransactionsState) => state.isProcessing );

export const isLoadingTransactions = createSelector(getTransactionsState, (state: ITransactionsState) => state.isLoading );

export const showViewerRepaymentSchedule = createSelector(
  getTransactionsState,
  (state: ITransactionsState) => state.showRepaymentScheduleViewer
);

export const showViewerActualSchedule = createSelector(
  getTransactionsState,
  (state: ITransactionsState) => state.showActualScheduleViewer
);

export const showViewerGenericSchedule = createSelector(
  getTransactionsState,
  (state: ITransactionsState) => state.showGenericScheduleViewer
)

export const getRepaymentScheduleTransaction = createSelector(
  getTransactionsState,
  (state: ITransactionsState) => state.repaymentScheduleData
);

export const showTransactionEditor = createSelector(getTransactionsState, (state: ITransactionsState) => state.showEditor );

export const showTransactionViewer = createSelector(getTransactionsState, (state: ITransactionsState) => state.showViewer );

export const getCurreciesDataTransactions = createSelector(getTransactionsState, (state: ITransactionsState) => state.currenciesData );

export const getDataTransactions = createSelector(getTransactionsState, (state: ITransactionsState) => state.transactionsData );

export const getApprovedDataTransactions = createSelector(getTransactionsState, (state: ITransactionsState) => state.approvedApplicationsData );

export const getAwaitingApprovalDataTransactions = createSelector(getTransactionsState, (state: ITransactionsState) => state.awaitingApprovalsData );

export const getLoanTypesDataTransactions = createSelector(getTransactionsState, (state: ITransactionsState) => state.loanTypesData );

export const getGenericSchedule = createSelector(
  getTransactionsState,
  (state: ITransactionsState) => state.genericScheduleData
);

export const getMonthlyDeductionAmount = createSelector(getTransactionsState,
  (state: ITransactionsState) => state.monthlyDeduction
);

export const getActualSchedule = createSelector(
  getTransactionsState,
  (state: ITransactionsState) => state.actualScheduleData
);

export const getTransactionDocument = createSelector(
  getTransactionsState,
  (state: ITransactionsState) => state.document
);

export const getTransactionLoanTypesSelect = createSelector(
  getTransactionsState,
  (state: ITransactionsState) => state.loanTypesSelect
);
