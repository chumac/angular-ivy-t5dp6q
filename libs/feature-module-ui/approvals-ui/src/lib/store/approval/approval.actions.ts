import { Action } from '@ngrx/store';
import { ILeaveDailyData } from '@nutela/models/workforce/leave';
import { IWorkflowApprovalPath } from '@nutela/models/foundation';
import { ISelectOption } from '@nutela/models/core-data';

export enum ApprovalActionTypes {
  SHOW_APPROVE_EDITOR = '[APPROVALS] Show Approve Editor',
  HIDE_APPROVE_EDITOR = '[APPROVALS] Hide Approve Editor',

  SHOW_DECLINE_EDITOR = '[APPROVALS] Show Decline Editor',
  HIDE_DECLINE_EDITOR = '[APPROVALS] Hide Decline Editor',

  SHOW_REDIRECT_EDITOR = '[APPROVALS] Show Redirect Editor',
  HIDE_REDIRECT_EDITOR = '[APPROVALS] Hide Redirect Editor',

  SHOW_REMOVE_EDITOR = '[APPROVALS] Show Remove Editor',
  HIDE_REMOVE_EDITOR = '[APPROVALS] Hide Remove Editor',

  SHOW_REQUEST_EDITOR = '[APPROVALS] Show Request Editor',
  HIDE_REQUEST_EDITOR = '[APPROVALS] Hide Request Editor',

  SHOW_VIEWER = '[APPROVALS] Show Viewer',
  HIDE_VIEWER = '[APPROVALS] Hide Viewer',

  SHOW_APPROVAL_PATH_VIEWER = '[APPROVALS] Show Approval Path Viewer',
  HIDE_APPROVAL_PATH_VIEWER = '[APPROVALS] Hide Approval Path Viewer',

  SHOW_SUBMISSION_VIEWER = '[APPROVALS] Show Submission Viewer',
  HIDE_SUBMISSION_VIEWER = '[APPROVALS] Hide Submission Viewer',


  PROCESSING = '[APPROVALS] Processing',
  NOT_PROCESSING = '[APPROVALS] Not Processing',

  LOADING_APPROVALS = '[APPROVALS] Loading Approvals',
  NOT_LOADING_APPROVALS = '[APPROVALS] Not Loading Approvals',

  PROCESSING_DECLINE = '[APPROVALS] Processing (Decline)',
  NOT_PROCESSING_DECLINE = '[APPROVALS] Not Processing (Decline)',

  PROCESSING_REDIRECT = '[APPROVALS] Processing (Redirect)',
  NOT_PROCESSING_REDIRECT = '[APPROVALS] Not Processing (Redirect)',

  PROCESSING_REMOVE = '[APPROVALS] Processing (Remove)',
  NOT_PROCESSING_REMOVE = '[APPROVALS] Not Processing (Remove)',

  PROCESSING_REQUEST = '[APPROVALS] Processing (Request)',
  NOT_PROCESSING_REQUEST = '[APPROVALS] Not Processing (Request)',


  LOAD_REPORT = '[APPROVALS] Load Report',
  LOAD_DOCUMENT = '[APPROVALS] Load Document',

  LOAD_APPROVAL_PATH = '[APPROVALS] Load Approval Path',
  LOAD_APPROVAL_PATH_SUCCESS = '[APPROVALS] Load Approval Path Success',
  CLEAR_APPROVAL_PATH = '[APPROVALS] Clear Approval Path',
  
  LOAD_QUEUE  = '[APPROVALS] Load QUEUE LISTs ',
  LOAD_QUEUE_SUCCESS = '[APPROVALS] Load QUEUE SUCCESS',

  LOAD_LABEL_VALUE  = '[APPROVALS] Load Label Value ',
  LOAD_LABEL_VALUE_SUCCESS = '[APPROVALS] Label Value Success',
}

export class ShowApproveEditor implements Action {
  readonly type = ApprovalActionTypes.SHOW_APPROVE_EDITOR;
}

export class HideApproveEditor implements Action {
  readonly type = ApprovalActionTypes.HIDE_APPROVE_EDITOR;
}


export class ShowDeclineEditor implements Action {
  readonly type = ApprovalActionTypes.SHOW_DECLINE_EDITOR;
}

export class HideDeclineEditor implements Action {
  readonly type = ApprovalActionTypes.HIDE_DECLINE_EDITOR;
}


export class ShowRedirectEditor implements Action {
  readonly type = ApprovalActionTypes.SHOW_REDIRECT_EDITOR;
}

export class HideRedirectEditor implements Action {
  readonly type = ApprovalActionTypes.HIDE_REDIRECT_EDITOR;
}


export class ShowRemoveEditor implements Action {
  readonly type = ApprovalActionTypes.SHOW_REMOVE_EDITOR;
}

export class HideRemoveEditor implements Action {
  readonly type = ApprovalActionTypes.HIDE_REMOVE_EDITOR;
}




export class ShowRequestEditor implements Action {
  readonly type = ApprovalActionTypes.SHOW_REQUEST_EDITOR;
}

export class HideRequestEditor implements Action {
  readonly type = ApprovalActionTypes.HIDE_REQUEST_EDITOR;
}





export class ShowViewerApproval implements Action {
  readonly type = ApprovalActionTypes.SHOW_VIEWER;
}

export class HideViewerApproval implements Action {
  readonly type = ApprovalActionTypes.HIDE_VIEWER;
}



export class ShowApprovalPathViewer implements Action {
  readonly type = ApprovalActionTypes.SHOW_APPROVAL_PATH_VIEWER;
}

export class HideApprovalPathViewer implements Action {
  readonly type = ApprovalActionTypes.HIDE_APPROVAL_PATH_VIEWER;
}


export class ShowSubmissionViewer implements Action {
  readonly type = ApprovalActionTypes.SHOW_SUBMISSION_VIEWER;
}

export class HideSubmissionViewer implements Action {
  readonly type = ApprovalActionTypes.HIDE_SUBMISSION_VIEWER;
}


export class LoadingApproval implements Action {
  readonly type = ApprovalActionTypes.LOADING_APPROVALS;
}

export class NotLoadingApproval implements Action {
  readonly type = ApprovalActionTypes.NOT_LOADING_APPROVALS;
}

export class ProcessingApproval implements Action {
  readonly type = ApprovalActionTypes.PROCESSING;
}

export class NotProcessingApproval implements Action {
  readonly type = ApprovalActionTypes.NOT_PROCESSING;
}



export class ProcessingDecline implements Action {
  readonly type = ApprovalActionTypes.PROCESSING_DECLINE;
}

export class NotProcessingDecline implements Action {
  readonly type = ApprovalActionTypes.NOT_PROCESSING_DECLINE;
}


export class ProcessingRedirect implements Action {
  readonly type = ApprovalActionTypes.PROCESSING_REDIRECT;
}

export class NotProcessingRedirect implements Action {
  readonly type = ApprovalActionTypes.NOT_PROCESSING_REDIRECT;
}


export class ProcessingRemove implements Action {
  readonly type = ApprovalActionTypes.PROCESSING_REMOVE;
}

export class NotProcessingRemove implements Action {
  readonly type = ApprovalActionTypes.NOT_PROCESSING_REMOVE;
}



export class ProcessingRequest implements Action {
  readonly type = ApprovalActionTypes.PROCESSING_REMOVE;
}

export class NotProcessingRequest implements Action {
  readonly type = ApprovalActionTypes.NOT_PROCESSING_REMOVE;
}



export class LoadReport implements Action {
  readonly type = ApprovalActionTypes.LOAD_REPORT;

  constructor(public payload: number) {}
}

export class LoadDocument implements Action {
  readonly type = ApprovalActionTypes.LOAD_DOCUMENT;

  constructor(public payload: {docGuid: string, docExtension: string}) {}
}

export class LoadApprovalPath implements Action {
  readonly type = ApprovalActionTypes.LOAD_APPROVAL_PATH;

  constructor(public payload: {msgId: number}) {}
}

export class LoadApprovalPathSuccess implements Action {
  readonly type = ApprovalActionTypes.LOAD_APPROVAL_PATH_SUCCESS;

  constructor(public payload: IWorkflowApprovalPath[]) {}
}

export class ClearApprovalPath implements Action {
  readonly type = ApprovalActionTypes.CLEAR_APPROVAL_PATH;

  constructor() {}
}

export class LoadQueueList implements Action {
  readonly type = ApprovalActionTypes.LOAD_QUEUE;
}

export class LoadQueueListSuccess implements Action {
  readonly type = ApprovalActionTypes.LOAD_QUEUE_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}

export class LoadLabelValue implements Action {
  readonly type = ApprovalActionTypes.LOAD_LABEL_VALUE;
  constructor(public payload: {msgId: number}) {}

}

export class LoadLabelValueSuccess implements Action {
  readonly type = ApprovalActionTypes.LOAD_LABEL_VALUE_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}

export type ApprovalActions =
  | ShowApproveEditor
  | HideApproveEditor
  | ShowDeclineEditor
  | HideDeclineEditor
  | ShowRedirectEditor
  | HideRedirectEditor
  | ShowRemoveEditor
  | HideRemoveEditor
  | ShowRequestEditor
  | HideRequestEditor
  | ShowViewerApproval
  | HideViewerApproval
  | ShowSubmissionViewer
  | HideSubmissionViewer
  | LoadingApproval
  | NotLoadingApproval
  | ProcessingApproval
  | NotProcessingApproval
  | ProcessingDecline
  | NotProcessingDecline
  | ProcessingRedirect
  | NotProcessingRedirect
  | ProcessingRemove
  | NotProcessingRemove
  | LoadReport
  | LoadDocument
  | ShowApprovalPathViewer
  | HideApprovalPathViewer
  | LoadApprovalPath
  | LoadApprovalPathSuccess
  | ClearApprovalPath
  | LoadQueueList
  | LoadQueueListSuccess
  | LoadLabelValue
  | LoadLabelValueSuccess;
