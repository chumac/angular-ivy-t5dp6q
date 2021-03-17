import { createSelector } from '@ngrx/store';

import { IRootState, getRootState} from '../root/root.state';
import { IApprovalState } from './approval.state';

export const getApprovalState = createSelector(getRootState, (state: IRootState) => state.approval);

export const isLoadingApproval = createSelector(getApprovalState, (state: IApprovalState) => state.isLoading );
export const isProcessingApproval = createSelector(getApprovalState, (state: IApprovalState) => state.isProcessing );
export const isProcessingDecline = createSelector(getApprovalState, (state: IApprovalState) => state.isProcessingDecline );
export const isProcessingRedirect = createSelector(getApprovalState, (state: IApprovalState) => state.isProcessingRedirect );
export const isProcessingRemove = createSelector(getApprovalState, (state: IApprovalState) => state.isProcessingRemove );

export const showApproveEditor = createSelector(getApprovalState, (state: IApprovalState) => state.showApproveEditor );

export const showDeclineEditor = createSelector(getApprovalState, (state: IApprovalState) => state.showDeclineEditor );

export const showRedirectEditor = createSelector(getApprovalState, (state: IApprovalState) => state.showRedirectEditor );

export const showRemoveEditor = createSelector(getApprovalState, (state: IApprovalState) => state.showRemoveEditor );

export const showRequestEditor = createSelector(getApprovalState, (state: IApprovalState) => state.showRequestEditor );

export const showViewerApproval = createSelector(getApprovalState, (state: IApprovalState) => state.showViewer );

export const getWorkflowApprovalPath = createSelector(getApprovalState, (state: IApprovalState) => state.workflowApprovalPath);

export const showApprovalPathViewer = createSelector(getApprovalState, (state: IApprovalState) => state.showApprovalPathViewer );

export const getQueueLists = createSelector(getApprovalState, (state: IApprovalState) => state.queueLists );

export const getViewerLabelValue = createSelector(getApprovalState, (state: IApprovalState) => state.viewerLabelValue );

