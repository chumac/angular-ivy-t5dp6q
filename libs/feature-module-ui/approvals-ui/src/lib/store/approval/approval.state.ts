import { ILeaveDailyData } from "@nutela/models/workforce/leave";
import { IWorkflowApprovalPath } from "@nutela/models/foundation";
import { ISelectOption } from "@nutela/models/core-data";

export interface IApprovalState {
  leaveRequestData: ILeaveDailyData;
  workflowApprovalPath: IWorkflowApprovalPath[];
  isLoading: boolean;
  isProcessing: boolean;
  isProcessingDecline: boolean;
  isProcessingRedirect: boolean;
  isProcessingRemove: boolean;
  isProcessingRequest: boolean;
  showApproveEditor: boolean;
  showDeclineEditor: boolean;
  showRedirectEditor: boolean;
  showRemoveEditor: boolean;
  showRequestEditor: boolean;
  showViewer: boolean;
  showApprovalPathViewer: boolean;
  showSubmissionViewer: boolean;
  queueLists: ISelectOption[];
  viewerLabelValue: ISelectOption[];
}

export const initialApprovalState: IApprovalState = {
  leaveRequestData: null,
  workflowApprovalPath: null,
  isLoading: false,
  isProcessing: false,
  isProcessingDecline: false,
  isProcessingRedirect: false,
  isProcessingRemove: false,
  isProcessingRequest: false,
  showApproveEditor: false,
  showDeclineEditor: false,
  showRedirectEditor: false,
  showRemoveEditor: false,
  showRequestEditor: false,
  showViewer: false,
  showApprovalPathViewer: false,
  showSubmissionViewer: false,
  queueLists:[],
  viewerLabelValue:[]
}

