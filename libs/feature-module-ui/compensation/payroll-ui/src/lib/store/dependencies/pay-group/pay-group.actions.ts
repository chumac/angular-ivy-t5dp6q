import { Action } from '@ngrx/store';
import { IPayGroup } from '@nutela/models/compensation/payroll';
import { IRolesTransform } from 'libs/feature-module-ui/platform/provisioning-ui/src/lib/models/interfaces';
import { ISelectOption } from '@nutela/models/core-data';



export enum PayGroupActionTypes {

  SHOW_EDITOR = '[ PAYGROUP] Show Editor',
  HIDE_EDITOR = '[PAYGROUP] Hide Editor',

  SHOW_VIEWER = '[ PAYGROUP] Show Viewer',
  HIDE_VIEWER = '[PAYGROUP] Hide Viewer',

  PROCESSING = '[ PAYGROUP ] Processing',
  NOT_PROCESSING = '[ PAYGROUP ] Not Processing',

  LOADING = '[ PAYGROUP ] LOADING',
  NOT_LOADING = '[ PAYGROUP ] Not LOADING',

  LOAD_PAY_GROUP_DATA = '[ PAYGROUP] Load Paygroup Data',
  LOAD_PAY_GROUP_DATA_SUCCESS = '[ PAYGROUP] Load Paygroup Data Success',

  LOAD_PAY_GROUP_AWAITING_APPROVAL_DATA = '[ PAYGROUP] Load Paygroup Awaiting Approval Data',
  LOAD_PAY_GROUP_AWAITING_APPROVAL_DATA_SUCCESS = '[ PAYGROUP] Load Paygroup Awaiting Approval Data Success',

  LOAD_CURRENCY_DATA = '[ PAYGROUP] Load Currency Data',
  LOAD_CURRENCY_DATA_SUCCESS = '[ PAYGROUP] Load Currency Data Success',

  LOAD_CONFIRMATION_STATUS_DATA = '[ PAYGROUP] Load Confirmation Status Data',
  LOAD_CONFIRMATION_STATUS_DATA_SUCCESS = '[ PAYGROUP] Load Confirmation Status Data Success',

  LOAD_PAYROLL_SELECT_OPTION_DATA = '[ PAYGROUP] Load Payroll Profile SelectOption Data',
  LOAD_PAYROLL_SELECT_OPTION_DATA_SUCCESS = '[ PAYGROUP] Load Payroll Profile SelectOption Data Success',

  LOAD_GRADE_SELECT_OPTION_DATA = '[ PAYGROUP] Load Grade SelectOption Data',
  LOAD_GRADE_SELECT_OPTION_DATA_SUCCESS = '[ PAYGROUP] Load Grade SelectOption Data Success',

  LOAD_ROLE_DATA = '[ PAYGROUP] Load Role Data',
  LOAD_ROLE_DATA_SUCCESS = '[ PAYGROUP] Load Role Data Success',

  SAVE = '[PAYGROUP] Save',
  SAVE_SUCCESS = '[ PAYGROUP] Save Success',

  UPDATE = '[UPDATE PAYGROUP] UPDATE',
  UPDATE_SUCCESS = '[UPDATE PAYGROUP] UPDATE Success',

  UPDATE_RATE = '[UPDATE PAYGROUP] Update Rate',
  UPDATE_RATE_SUCCESS = '[UPDATE PAYGROUP] Update Rate Success',

  ARCHIVE_PAY_GROUP_DATA = '[PAYGROUP] Delete Paygroup Data',

  HAS_PAYGROUP_ADMIN_ROLE = '[PAYGROUP ] Has Paygroup Admin Role',

  LOAD_FILTERED_PAYGROUP_DATA = '[PAYGROUP ] Load Filtered Paygroup',
}


export class ShowEditorPayGroup implements Action {
  readonly type = PayGroupActionTypes.SHOW_EDITOR;
}

export class HideEditorPayGroup implements Action {
  readonly type = PayGroupActionTypes.HIDE_EDITOR;
}

export class ShowViewerPayGroup implements Action {
  readonly type = PayGroupActionTypes.SHOW_VIEWER;
}

export class HideViewerPayGroup implements Action {
  readonly type = PayGroupActionTypes.HIDE_VIEWER;
}

export class ProcessingPayGroup implements Action {
  readonly type = PayGroupActionTypes.PROCESSING;
}

export class NotProcessingPayGroup implements Action {
  readonly type = PayGroupActionTypes.NOT_PROCESSING;
}

export class LoadingPayGroup implements Action {
  readonly type = PayGroupActionTypes.LOADING;
}

export class NotLoadingPayGroup implements Action {
  readonly type = PayGroupActionTypes.NOT_LOADING;
}


export class LoadPayGroupData implements Action {
  readonly type = PayGroupActionTypes.LOAD_PAY_GROUP_DATA;
}

export class LoadPayGroupSuccess implements Action {
  readonly type = PayGroupActionTypes.LOAD_PAY_GROUP_DATA_SUCCESS;
  constructor(public payload: IPayGroup[]) { }
}

export class LoadFilteredPayGroup implements Action {
  readonly type = PayGroupActionTypes.LOAD_FILTERED_PAYGROUP_DATA;
  constructor(public payload: {statusId: number}) { }
}

export class LoadPayGroupAwaitingApprovalData implements Action {
  readonly type = PayGroupActionTypes.LOAD_PAY_GROUP_AWAITING_APPROVAL_DATA;
}

export class LoadPayGroupAwaitingApprovalDataSuccess implements Action {
  readonly type = PayGroupActionTypes.LOAD_PAY_GROUP_AWAITING_APPROVAL_DATA_SUCCESS;
  constructor(public payload: IPayGroup[]) { }
}

export class LoadConfirmationStatusData implements Action {
  readonly type = PayGroupActionTypes.LOAD_CONFIRMATION_STATUS_DATA;
}

export class LoadConfirmationStatusDataSuccess implements Action {
  readonly type = PayGroupActionTypes.LOAD_CONFIRMATION_STATUS_DATA_SUCCESS;
  constructor(public payload: any[]) { }
}

export class LoadRoleData implements Action {
  readonly type = PayGroupActionTypes.LOAD_ROLE_DATA;
}

export class LoadRoleDataSuccess implements Action {
  readonly type = PayGroupActionTypes.LOAD_ROLE_DATA_SUCCESS;
  constructor(public payload: IRolesTransform[]) { }
}

export class LoadPayrollProfileSelectOptionPaygroup implements Action {
  readonly type = PayGroupActionTypes.LOAD_PAYROLL_SELECT_OPTION_DATA;
}

export class LoadPayrollProfileSelectOptionPaygroupSuccess implements Action {
  readonly type = PayGroupActionTypes.LOAD_PAYROLL_SELECT_OPTION_DATA_SUCCESS;
  constructor(public payload: ISelectOption[]) { }
}

export class LoadGradeSelectOptionPaygroup implements Action {
  readonly type = PayGroupActionTypes.LOAD_GRADE_SELECT_OPTION_DATA;
}

export class LoadGradeSelectOptionPaygroupSuccess implements Action {
  readonly type = PayGroupActionTypes.LOAD_GRADE_SELECT_OPTION_DATA_SUCCESS;
  constructor(public payload: ISelectOption[]) { }
}

export class LoadCurrencyData implements Action {
  readonly type = PayGroupActionTypes.LOAD_CURRENCY_DATA;
}

export class LoadCurrencyDataSuccess implements Action {
  readonly type = PayGroupActionTypes.LOAD_CURRENCY_DATA_SUCCESS;
  constructor(public payload: ISelectOption[]) { }
}

export class SavePayGroup implements Action {
  readonly type = PayGroupActionTypes.SAVE;
  constructor(public payload: { data: IPayGroup }) { }
}

export class UpdatePayGroup implements Action {
  readonly type = PayGroupActionTypes.UPDATE;
  constructor(public payload: { data: IPayGroup, recordId: number }) { }
}

export class UpdateRatePayGroup implements Action {
  readonly type = PayGroupActionTypes.UPDATE_RATE;
  constructor(public payload: { data: IPayGroup, recordId: number }) { }
}

export class ArchivePayGroup implements Action {
  readonly type = PayGroupActionTypes.ARCHIVE_PAY_GROUP_DATA;
  constructor(public payload: { recordId: number }) { }
}

export class HasPaygroupAdminRole implements Action {
  readonly type = PayGroupActionTypes.HAS_PAYGROUP_ADMIN_ROLE;
  constructor(public payload: boolean) { }
}

export type PayGroupActions =
  | ShowEditorPayGroup
  | HideEditorPayGroup
  | ShowViewerPayGroup
  | HideViewerPayGroup
  | ProcessingPayGroup
  | NotProcessingPayGroup
  | LoadingPayGroup
  | NotLoadingPayGroup
  | LoadPayGroupData
  | LoadPayGroupSuccess
  | LoadConfirmationStatusData
  | LoadConfirmationStatusDataSuccess
  | LoadRoleData
  | LoadRoleDataSuccess
  | LoadPayGroupAwaitingApprovalData
  | LoadPayGroupAwaitingApprovalDataSuccess
  | LoadPayrollProfileSelectOptionPaygroup
  | LoadPayrollProfileSelectOptionPaygroupSuccess
  | LoadGradeSelectOptionPaygroup
  | LoadGradeSelectOptionPaygroupSuccess
  | LoadCurrencyData
  | LoadCurrencyDataSuccess
  | SavePayGroup
  | UpdatePayGroup
  | UpdateRatePayGroup
  | HasPaygroupAdminRole
  | LoadFilteredPayGroup
  | ArchivePayGroup;
