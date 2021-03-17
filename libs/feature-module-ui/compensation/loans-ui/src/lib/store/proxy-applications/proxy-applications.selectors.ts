import { createSelector } from '@ngrx/store';

import { ILoanState, getLoanState} from '../root/root.state';
import { IProxyApplicationsState } from './proxy-applications.state';

export const getProxyApplicationsState = createSelector(getLoanState, (state: ILoanState) => state.proxyApplication);

export const isProcessingProxyApplications = createSelector(getProxyApplicationsState, (state: IProxyApplicationsState) => state.isProcessing );

export const isLoadingProxyApplications = createSelector(getProxyApplicationsState, (state: IProxyApplicationsState) => state.isLoading );

export const showProxyApplyEditor = createSelector(getProxyApplicationsState, (state: IProxyApplicationsState) => state.showEditor );

export const showProxyApplyViewer = createSelector(getProxyApplicationsState, (state: IProxyApplicationsState) => state.showViewer );

export const getDataProxyApplications = createSelector(getProxyApplicationsState, (state: IProxyApplicationsState) => state.proxyApplicationsData );

export const getCurreciesDataProxyApplications = createSelector(getProxyApplicationsState, (state: IProxyApplicationsState) => state.currenciesData );

export const getSelfServiceSourcesDataProxyApplications = createSelector(getProxyApplicationsState, (state: IProxyApplicationsState) => state.selfServiceSourcesData );

export const getApprovedDataProxyApplications = createSelector(getProxyApplicationsState, (state: IProxyApplicationsState) => state.approvedApplicationsData );

export const getAwaitingApprovalDataProxyApplications = createSelector(getProxyApplicationsState, (state: IProxyApplicationsState) => state.awaitingApprovalsData );

export const getLoanTypesDataProxyApplications = createSelector(getProxyApplicationsState, (state: IProxyApplicationsState) => state.loanTypesData );

export const getMonthlyDeductionAmount = createSelector(
  getProxyApplicationsState,
  (state: IProxyApplicationsState) => state.monthlyDeduction
);


export const showViewerActualSchedule = createSelector(
  getProxyApplicationsState,
  (state: IProxyApplicationsState) => state.showActualScheduleViewer
);

export const showViewerGenericSchedule = createSelector(
  getProxyApplicationsState,
  (state: IProxyApplicationsState) => state.showGenericScheduleViewer
);

export const showViewerStandardSchedule = createSelector(
  getProxyApplicationsState,
  (state: IProxyApplicationsState) => state.showStandardScheduleViewer
);

export const showViewerRepaymentSchedule = createSelector(
  getProxyApplicationsState,
  (state: IProxyApplicationsState) => state.showRepaymentScheduleViewer
);

export const getStandardScheduleData = createSelector(
  getProxyApplicationsState,
  (state: IProxyApplicationsState) => state.standardScheduleData
);

export const getRepaymentSchedule = createSelector(
  getProxyApplicationsState,
  (state: IProxyApplicationsState) => state.repaymentScheduleData
);

export const getActualSchedule = createSelector(
  getProxyApplicationsState,
  (state: IProxyApplicationsState) => state.actualScheduleData
);

export const getGenericSchedule = createSelector(
  getProxyApplicationsState,
  (state: IProxyApplicationsState) => state.genericScheduleData
);

export const getProxyApplicationDocument = createSelector(
  getProxyApplicationsState,
  (state: IProxyApplicationsState) => state.document
);

export const getProxyApplicationLoanTypesSelect = createSelector(
  getProxyApplicationsState,
  (state: IProxyApplicationsState) => state.loanTypesSelect
);
