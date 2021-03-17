import { Action } from '@ngrx/store';
import { IDashboardChart, IEmployeeSummary, IComprehensiveData } from '@nutela/models/workforce/employee-profiles';
import { IWorkflowMessage } from '@nutela/models/foundation';

export enum EmployeesDataHomeActionTypes {
  LOAD_CHART =  '[EMPLOYEES DATA HOME] Load Chart',
  LOAD_CHART_SUCCESS = '[EMPLOYEES DATA HOME] Load Chart Success',

  SHOW_VIEWER = '[EMPLOYEES DATA HOME] Show Summary Viewer',
  HIDE_VIEWER = '[EMPLOYEES DATA HOME] Hide Summary Viewer',
  CLEAR_VIEWER_PHOTO = '[EMPLOYEES DATA HOME] Clear Summary Viewer Photo',

  LOAD_ACTIVE_REBOARD_EMPLOYEES_DATA = '[EMPLOYEES DATA HOME] Load Active Reboard Employees Data',
  LOAD_ACTIVE_REBOARD_EMPLOYEES_DATA_SUCCESS = '[EMPLOYEES DATA HOME] Load Active Reboard Employees Data Success',

  LOAD_ACTIVE_EMPLOYEES_DATA = '[EMPLOYEES DATA HOME] Load Active Employees Data',
  LOAD_ACTIVE_EMPLOYEES_DATA_SUCCESS = '[EMPLOYEES DATA HOME] Load Active Employees Data Success',

  LOAD_INACTIVE_EMPLOYEES_DATA = '[EMPLOYEES DATA HOME] Load Inactive Employees Data',
  LOAD_INACTIVE_EMPLOYEES_DATA_SUCCESS = '[EMPLOYEES DATA HOME] Load Inactive Employees Data Success',

  LOADING_EMPLOYEE_DATA = '[EMPLOYEES DATA HOME] Loading Employee Data',
  NOT_LOADING_EMPLOYEE_DATA = '[EMPLOYEES DATA HOME] Not Loading Employee Data',

  PROCESSING_START = '[EMPLOYEES DATA HOME] Processing Start',
  NOT_PROCESSING_START = '[EMPLOYEES DATA HOME] Not Processing Start',

  PROCESSING_CANCEL = '[EMPLOYEES DATA HOME] Processing Cancel',
  NOT_PROCESSING_CANCEL = '[EMPLOYEES DATA HOME] Not Processing Cancel',

  PROCESSING_RETRIEVE = '[EMPLOYEES DATA HOME] Processing Retrieve',
  NOT_PROCESSING_RETRIEVE = '[EMPLOYEES DATA HOME] Not Processing Retrieve',

  PROCESSING_MY_REBOARD_CANCEL = '[EMPLOYEES DATA HOME] Processing My Reboard Cancel',
  NOT_PROCESSING_MY_REBOARD_CANCEL = '[EMPLOYEES DATA HOME] Not Processing My Reboard Cancel',

  PROCESSING_DECLINE = '[EMPLOYEES DATA HOME] Processing Decline',
  NOT_PROCESSING_DECLINE = '[EMPLOYEES DATA HOME] Not Processing Decline',

  LOAD_EMPLOYEES_DATA_ITEM = '[EMPLOYEES DATA HOME] Load Employees Data Item',
  LOAD_EMPLOYEES_DATA_ITEM_SUCCESS = '[EMPLOYEES DATA HOME] Load Employees Data Item Success',
  CLEAR_EMPLOYEES_DATA_ITEM = '[EMPLOYEES DATA HOME] Clear Employees Data Item',

  LOAD_EMPLOYEES_PROFILE_PICTURE = '[EMPLOYEES DATA HOME] Load Employees Profile Picture',
  LOAD_EMPLOYEES_PROFILE_PICTURE_SUCCESS = '[EMPLOYEES DATA HOME] Load Employees Profile Picture Success',

  LOAD_HR_REBOARD_EMPLOYEE_DETAILS = '[EMPLOYEES DATA HOME] Load Hr Reboard Employee Details',
  LOAD_HR_REBOARD_EMPLOYEE_DETAILS_SUCCESS = '[EMPLOYEES DATA HOME] Load Hr Reboard Employee Details Success',

  LOAD_AGREEMENT_TEXT = '[EMPLOYEES DATA HOME] Load Agreement Text',
  LOAD_AGREEMENT_TEXT_SUCCESS = '[EMPLOYEES DATA HOME] Load Agreement Text Success',

  LOAD_MY_REBOARD_DETAILS = '[EMPLOYEES DATA HOME] Load My Reboard Details',
  LOAD_MY_REBOARD_DETAILS_SUCCESS = '[EMPLOYEES DATA HOME] Load My Reboard Details Success',

  REBOARD_ALL_EMPLOYEES = '[EMPLOYEES DATA HOME] Reboard All Employees',
  REBOARD_ALL_EMPLOYEES_SUCCESS = '[EMPLOYEES DATA HOME] Reboard All Employees Success',

  REBOARD_EMPLOYEE = '[EMPLOYEES DATA HOME] Reboard Employee',
  REBOARD_EMPLOYEE_SUCCESS = '[EMPLOYEES DATA HOME] Reboard Employee Success',

  CANCEL_REBOARD_EMPLOYEE = '[EMPLOYEES DATA HOME] Cancel Reboard Employee',
  RETRIEVE_REBOARD_EMPLOYEE = '[EMPLOYEES DATA HOME] Retrieve Reboard Employee',
  CANCEL_REBOARD_EMPLOYEE_SUCCESS = '[EMPLOYEES DATA HOME] Cancel Reboard Employee Success',

  CANCEL_REBOARD_ALL_EMPLOYEES = '[EMPLOYEES DATA HOME] Cancel Reboard All Employees',
  CANCEL_REBOARD_ALL_EMPLOYEES_SUCCESS = '[EMPLOYEES DATA HOME] Cancel Reboard All Employees Success',

  SUBMIT_DATA_REBOARD_EMPLOYEE = '[EMPLOYEES DATA HOME] Submit Data Reboard Employee',
  START_MY_REBOARD = '[EMPLOYEES DATA HOME] Start My Reboard',
  CANCEL_MY_REBOARD = '[EMPLOYEES DATA HOME] Cancel My Reboard',
  RETRIEVE_MY_REBOARD = '[EMPLOYEES DATA HOME] Retrieve My Reboard',
  APPROVE_REBOARD_EMPLOYEE = '[EMPLOYEES DATA HOME] Approve Reboard Employee',
  DECLINE_REBOARD_EMPLOYEE = '[EMPLOYEES DATA HOME] Decline Reboard Employee',

  LOAD_REBOARD_WORKFLOW_MESSAGE = '[EMPLOYEES DATA HOME] Load Reboard Workflow Message',
  LOAD_REBOARD_WORKFLOW_MESSAGE_SUCCESS = '[EMPLOYEES DATA HOME] Load Reboard Workflow Message Success'
}

export class ShowViewerEmployeesDataSummary implements Action {
  readonly type = EmployeesDataHomeActionTypes.SHOW_VIEWER;
}

export class HideViewerEmployeesDataSummary implements Action {
  readonly type = EmployeesDataHomeActionTypes.HIDE_VIEWER;
}

export class ClearViewerPhotoEmployeesDataSummary implements Action {
  readonly type = EmployeesDataHomeActionTypes.CLEAR_VIEWER_PHOTO;
}

export class LoadEmployeesDataChart implements Action {
  readonly type = EmployeesDataHomeActionTypes.LOAD_CHART;

  constructor(public payload: { sourceId: number }) {}
}

export class LoadEmployeesDataChartSuccess implements Action {
  readonly type = EmployeesDataHomeActionTypes.LOAD_CHART_SUCCESS;

  constructor(public payload: IDashboardChart) {}
}

export class LoadActiveEmployeesData implements Action {
  readonly type = EmployeesDataHomeActionTypes.LOAD_ACTIVE_EMPLOYEES_DATA;

  constructor(public payload: { sourceId: string }) {}
}

export class LoadActiveEmployeesDataSuccess implements Action {
  readonly type = EmployeesDataHomeActionTypes.LOAD_ACTIVE_EMPLOYEES_DATA_SUCCESS;

  constructor(public payload: IEmployeeSummary[]) {}
}

export class LoadHrReboardEmployeeDetails implements Action {
  readonly type = EmployeesDataHomeActionTypes.LOAD_HR_REBOARD_EMPLOYEE_DETAILS;

  constructor(public payload: { employeeId: number }) {}
}

export class LoadHrReboardEmployeeDetailsSuccess implements Action {
  readonly type = EmployeesDataHomeActionTypes.LOAD_HR_REBOARD_EMPLOYEE_DETAILS_SUCCESS;

  constructor(public payload: IEmployeeSummary) {}
}

export class LoadInactiveEmployeesData implements Action {
  readonly type = EmployeesDataHomeActionTypes.LOAD_INACTIVE_EMPLOYEES_DATA;

  constructor(public payload: { sourceId: string }) {}
}

export class LoadInactiveEmployeesDataSuccess implements Action {
  readonly type = EmployeesDataHomeActionTypes.LOAD_INACTIVE_EMPLOYEES_DATA_SUCCESS;

  constructor(public payload: IEmployeeSummary[]) {}
}

export class LoadActiveReboardEmployeesData implements Action {
  readonly type = EmployeesDataHomeActionTypes.LOAD_ACTIVE_REBOARD_EMPLOYEES_DATA;

  // constructor(public payload: { sourceId: string }) {}
}

export class LoadActiveReboardEmployeesDataSuccess implements Action {
  readonly type = EmployeesDataHomeActionTypes.LOAD_ACTIVE_REBOARD_EMPLOYEES_DATA_SUCCESS;

  constructor(public payload: IEmployeeSummary[]) {}
}

export class ReboardAllEmployees implements Action {
  readonly type = EmployeesDataHomeActionTypes.REBOARD_ALL_EMPLOYEES;

  constructor() {}
}

export class SubmitDataReboardEmployee implements Action {
  readonly type = EmployeesDataHomeActionTypes.SUBMIT_DATA_REBOARD_EMPLOYEE;
}

export class StartMyReboard implements Action {
  readonly type = EmployeesDataHomeActionTypes.START_MY_REBOARD;
}

export class CancelMyReboard implements Action {
  readonly type = EmployeesDataHomeActionTypes.CANCEL_MY_REBOARD;
}

export class RetrieveMyReboard implements Action {
  readonly type = EmployeesDataHomeActionTypes.RETRIEVE_MY_REBOARD;
}

export class ApproveReboardEmployee implements Action {
  readonly type = EmployeesDataHomeActionTypes.APPROVE_REBOARD_EMPLOYEE;
  constructor(public payload: { employeeId: number }) { }
}

export class DeclineReboardEmployee implements Action {
  readonly type = EmployeesDataHomeActionTypes.DECLINE_REBOARD_EMPLOYEE;
  constructor(public payload: { employeeId: number }) { }
}

export class ReboardEmployee implements Action {
  readonly type = EmployeesDataHomeActionTypes.REBOARD_EMPLOYEE;

  constructor(public payload: { employeeId: number }) {}
}

export class CancelReboardAllEmployees implements Action {
  readonly type = EmployeesDataHomeActionTypes.CANCEL_REBOARD_ALL_EMPLOYEES;

  constructor() {}
}

export class CancelReboardEmployee implements Action {
  readonly type = EmployeesDataHomeActionTypes.CANCEL_REBOARD_EMPLOYEE;

  constructor(public payload: { employeeId: number }) {}
}

export class RetrieveReboardEmployee implements Action {
  readonly type = EmployeesDataHomeActionTypes.RETRIEVE_REBOARD_EMPLOYEE;

  constructor(public payload: { employeeId: number }) {}
}

export class LoadMyReboardDetails implements Action {
  readonly type = EmployeesDataHomeActionTypes.LOAD_MY_REBOARD_DETAILS;
}

export class LoadMyReboardDetailsSuccess implements Action {
  readonly type = EmployeesDataHomeActionTypes.LOAD_MY_REBOARD_DETAILS_SUCCESS;

  constructor(public payload: any) {}
}

export class LoadReboardWorkflowMessage implements Action {
  readonly type = EmployeesDataHomeActionTypes.LOAD_REBOARD_WORKFLOW_MESSAGE;
}

export class LoadReboardWorkflowMessageSuccess implements Action {
  readonly type = EmployeesDataHomeActionTypes.LOAD_REBOARD_WORKFLOW_MESSAGE_SUCCESS;

  constructor(public payload: IWorkflowMessage) {}
}

export class LoadingEmployeeData implements Action {
  readonly type = EmployeesDataHomeActionTypes.LOADING_EMPLOYEE_DATA;
}

export class NotLoadingEmployeeData implements Action {
  readonly type = EmployeesDataHomeActionTypes.NOT_LOADING_EMPLOYEE_DATA;
}

export class ProcessingReboardStart implements Action {
  readonly type = EmployeesDataHomeActionTypes.PROCESSING_START;
}

export class NotProcessingReboardStart implements Action {
  readonly type = EmployeesDataHomeActionTypes.NOT_PROCESSING_START;
}

export class ProcessingReboardCancel implements Action {
  readonly type = EmployeesDataHomeActionTypes.PROCESSING_CANCEL;
}

export class NotProcessingReboardCancel implements Action {
  readonly type = EmployeesDataHomeActionTypes.NOT_PROCESSING_CANCEL;
}

export class ProcessingReboardRetrieve implements Action {
  readonly type = EmployeesDataHomeActionTypes.PROCESSING_RETRIEVE;
}

export class NotProcessingReboardRetrieve implements Action {
  readonly type = EmployeesDataHomeActionTypes.NOT_PROCESSING_RETRIEVE;
}

export class ProcessingMyReboardCancel implements Action {
  readonly type = EmployeesDataHomeActionTypes.PROCESSING_MY_REBOARD_CANCEL;
}

export class NotProcessingMyReboardCancel implements Action {
  readonly type = EmployeesDataHomeActionTypes.NOT_PROCESSING_MY_REBOARD_CANCEL;
}

export class ProcessingReboardDecline implements Action {
  readonly type = EmployeesDataHomeActionTypes.PROCESSING_DECLINE;
}

export class NotProcessingReboardDecline implements Action {
  readonly type = EmployeesDataHomeActionTypes.NOT_PROCESSING_DECLINE;
}

export class LoadEmployeesDataItem implements Action {
  readonly type = EmployeesDataHomeActionTypes.LOAD_EMPLOYEES_DATA_ITEM;

  constructor(public payload: { employeeId: number }) { }
}

export class LoadEmployeesDataItemSuccess implements Action {
  readonly type = EmployeesDataHomeActionTypes.LOAD_EMPLOYEES_DATA_ITEM_SUCCESS;

  constructor(public payload: IComprehensiveData) {}
}

export class ClearEmployeesDataItem implements Action {
  readonly type = EmployeesDataHomeActionTypes.CLEAR_EMPLOYEES_DATA_ITEM;
}

export class LoadEmployeesProfilePicture implements Action {
  readonly type = EmployeesDataHomeActionTypes.LOAD_EMPLOYEES_PROFILE_PICTURE;

  constructor(public payload: { employeeId: number }) { }
}

export class LoadEmployeesProfilePictureSuccess implements Action {
  readonly type = EmployeesDataHomeActionTypes.LOAD_EMPLOYEES_PROFILE_PICTURE_SUCCESS;

  constructor(public payload: any) {}
}

export type EmployeesDataHomeActions =
  | ShowViewerEmployeesDataSummary
  | HideViewerEmployeesDataSummary
  | ClearViewerPhotoEmployeesDataSummary
  | LoadEmployeesDataChart
  | LoadEmployeesDataChartSuccess
  | LoadActiveReboardEmployeesData
  | LoadActiveReboardEmployeesDataSuccess
  | LoadActiveEmployeesData
  | LoadActiveEmployeesDataSuccess
  | LoadInactiveEmployeesData
  | LoadInactiveEmployeesDataSuccess
  | LoadingEmployeeData
  | NotLoadingEmployeeData
  | ProcessingReboardStart
  | NotProcessingReboardStart
  | ProcessingReboardCancel
  | NotProcessingReboardCancel
  | ProcessingReboardRetrieve
  | NotProcessingReboardRetrieve
  | ProcessingMyReboardCancel
  | NotProcessingMyReboardCancel
  | ProcessingReboardDecline
  | NotProcessingReboardDecline
  | LoadEmployeesDataItem
  | LoadEmployeesDataItemSuccess
  | ClearEmployeesDataItem
  | LoadEmployeesProfilePicture
  | LoadEmployeesProfilePictureSuccess
  | LoadReboardWorkflowMessage
  | LoadReboardWorkflowMessageSuccess
  | LoadHrReboardEmployeeDetails
  | LoadHrReboardEmployeeDetailsSuccess
  | LoadMyReboardDetails
  | LoadMyReboardDetailsSuccess
  | ReboardAllEmployees
  | ReboardEmployee
  | CancelReboardAllEmployees
  | CancelReboardEmployee
  | RetrieveReboardEmployee
  | SubmitDataReboardEmployee
  | StartMyReboard
  | CancelMyReboard
  | RetrieveMyReboard
  | ApproveReboardEmployee
  | DeclineReboardEmployee;
