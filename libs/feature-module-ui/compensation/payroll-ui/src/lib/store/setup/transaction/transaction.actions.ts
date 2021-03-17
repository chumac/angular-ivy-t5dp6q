import { Action } from '@ngrx/store';
import { IPayrollProfile } from '@nutela/models/compensation/payment';
import { IExclusionActiveEmployee, IExclusionReason, IExclusionTransaction, IExclusionType } from '@nutela/models/compensation/payroll';
import { ISelectOption } from '@nutela/models/core-data';
import { IConfigureTransactionCreate } from 'libs/models/compensation/payroll/src/lib/interfaces/configure-transaction-create.interface';
import { IConfigureTransaction } from 'libs/models/compensation/payroll/src/lib/interfaces/configure-transaction.interface';
import { IExclusionItemType } from 'libs/models/compensation/payroll/src/lib/interfaces/exclusion-item-type.interface';






export enum TransactionActionTypes {

  PROCESSING = '[ EXCLUSION TRANSACTION EXECUTION PROCESS ] Processing',
  NOT_PROCESSING = '[ EXCLUSION TRANSACTION EXECUTION PROCESS ] Not Processing',

  LOADING = '[ EXCLUSION TRANSACTION EXECUTION PROCESS ] Loading',
  NOT_LOADING = '[ EXCLUSION TRANSACTION EXECUTION PROCESS ] Not Loading',

  LOAD_EXCLUSION_TRANSACTION_DATA = '[ EXCLUSION TRANSACTION EXECUTION PROCESS ] Load Exclusion Transaction Data',
  LOAD_EXCLUSION_TRANSACTION_DATA_SUCCESS = '[ EXCLUSION TRANSACTION EXECUTION PROCESS ] Load Exclusion Transaction Data Success',

  LOAD_EXCLUSION_SCOPE_DATA = '[ EXCLUSION SCOPE EXECUTION PROCESS ] Load Exclusion scope Data',
  LOAD_EXCLUSION_SCOPE_DATA_SUCCESS = '[ EXCLUSION SCOPE EXECUTION PROCESS ] Load Exclusion scope Data Success',

  LOAD_EXCLUSION_ACTIVE_EMPLOYEE_DATA = '[ EXCLUSION ACTIVE EMPLOYEE EXECUTION PROCESS ] Load Exclusion Active Employee Data',
  LOAD_EXCLUSION_ACTIVE_EMPLOYEE_DATA_SUCCESS = '[ EXCLUSION ACTIVE EMPLOYEE EXECUTION PROCESS ] Load Exclusion Active Employee Data Success',

  LOAD_EXCLUSION_REASON_DATA = '[ EXCLUSION REASON EXECUTION PROCESS ] Load Exclusion Reason Data',
  LOAD_EXCLUSION_REASON_DATA_SUCCESS = '[ EXCLUSION REASON EXECUTION PROCESS ] Load Exclusion Reason Data Success',

  LOAD_CAN_RUN_DATA = '[ PAYROLL EXECUTION PROCESS ] Load Can Run Data',
  LOAD_CAN_RUN_DATA_SUCCESS = '[ PAYROLL EXECUTION PROCESS ] Load Can Run Data Success',

  SHOW_CONFIGURE_TRANSACTION_EDITOR = '[ CONFIGURE EXECUTION PROCESS ] Show Configure Editor',
  HIDE_CONFIGURE_TRANSACTION_EDITOR = '[ CONFIGURE EXECUTION PROCESS ] Hide Configure Editor',

  LOAD_CONFIGURE_TRANSACTION_DATA = '[ LOAD CONFIGURE EXECUTION PROCESS ] Load Configure Transaction Data',
  LOAD_CONFIGURE_TRANSACTION_DATA_SUCCESS = '[ LOAD CONFIGURE EXECUTION PROCESS ] Load Configure Transaction Data Success',

  CONFIGURE_LOADING = '[ CONFIGURE LOADING PROCESS ] Configure Loading',
  NOT_CONFIGURE_LOADING = '[ CONFIGURE NOT LOADING PROCESS ] Configure Not Loading',

  CONFIGURE_PROCESSING = '[ CONFIGURE EXECUTION PROCESS ] Configure Processing',
  CONFIGURE_NOT_PROCESSING = '[ CONFIGURE EXECUTION PROCESS ] Configure Not Processing',

  SHOW_EDITOR_CONFIGURE_TRANSACTION_CREATE = '[ SHOW EDITOR CONFIGURE PROCESS ] Show Editor',
  HIDE_EDITOR_CONFIGURE_TRANSACTION_CREATE = '[ HIDE EDITOR CONFIGURE  PROCESS ] Hide Editor',

  LOAD_CONFIGURE_TRANSACTION_EDITOR_DATA = '[ LOAD CONFIGURE EDITOR EXECUTION PROCESS ] Load Configure Editor Transaction Data',
  LOAD_CONFIGURE_TRANSACTION_DATA_EDITOR_SUCCESS = '[ LOAD CONFIGURE EDITOR EXECUTION PROCESS ] Load Configure Editor Transaction Data Success',

  CONFIGURE_CREATE_PROCESSING = '[ CONFIGURE CREATE EXECUTION PROCESS ] Configure Create Processing',
  CONFIGURE_CREATE_NOT_PROCESSING = '[ CONFIGURE CREATE EXECUTION PROCESS ] Configure Create Not Processing',

  LOAD_EXCLUSION_TYPE_DATA = '[ EXCLUSION TYPE EXECUTION PROCESS ] Load Exclusion Type Data',
  LOAD_EXCLUSION_TYPE_DATA_SUCCESS = '[ EXCLUSION TYPE EXECUTION PROCESS ] Load Exclusion Type Data Success',

  LOADING_EXCLUSION_TYPE = '[ EXCLUSION TYPE PROCESS ] Loading',
  NOT_LOADING_EXCLUSION_TYPE = '[ EXCLUSION TYPE PROCESS ] Not Loading',

  LOAD_EXCLUSION_ITEM_TYPE_DATA = '[ EXCLUSION ITEM TYPE EXECUTION PROCESS ] Load Exclusion Item Type Data',
  LOAD_EXCLUSION_ITEM_TYPE_DATA_SUCCESS = '[ EXCLUSION ITEM TYPE EXECUTION PROCESS ] Load Exclusion Item Type Data Success',

  SAVE_CONFIGURE_DATA = '[ SAVE CONFIGURE EXECUTION PROCESS ] Save Configure Data',
  SAVE_CONFIGURE_DATA_SUCCESS = '[ SAVE CONFIGURE EXECUTION PROCESS ] Save Configure Data Success',

  LOAD_EDIT_CONFIGURE_DATA = '[ EDIT CONFIGURE EXECUTION PROCESS ] Load Edit Configure Data',
  LOAD_EDIT_CONFIGURE_DATA_SUCCESS = '[ EDIT CONFIGURE EXECUTION PROCESS ] Load Edit Configure Data Success',

  EXCLUSION_CLOSE_CREATE_PROCESSING = '[ EXCLUSION CLOSE CREATE EXECUTION PROCESS ] Exclusion Close Create Processing',
  EXCLUSION_CLOSE_CREATE_NOT_PROCESSING = '[ EXCLUSION CLOSE CREATE EXECUTION PROCESS ] Exclusion Close Create Not Processing',

  LOADING_EDIT_CONFIGURE = '[ LOADING EDIT CONFIGURE PROCESS ] Loading',
  NOT_LOADING_EDIT_CONFIGURE = '[ NOT LOADING EDIT CONFIGURE PROCESS ] Not Loading',

  SAVE_EXCLUSION_CLOSE_DATA = '[ SAVE EXCLUSION CLOSE EXECUTION PROCESS ] Save Exclusion Close Data',
  SAVE_EXCLUSION_CLOSE_DATA_SUCCESS = '[ SAVE EXCLUSION CLOSE EXECUTION PROCESS ] Save Exclusion Close Data Success',

  DELETE_TRANSACTION_CONFIGURE = '[TRANSACTION CONFIGURE] Delete Transaction Configure',

  SAVE_EXCLUSION_TRANSACTION_DATA = '[ EXCLUSION TRANSACTION PROCESS ] Save Exclusion  Data',
  SAVE_EXCLUSION_TRANSACTION_DATA_SUCCESS = '[ EXCLUSION TRANSACTION PROCESS ] Save Exclusion Data Success',

  SHOW_EXCLUSION_TRANSACTION_EDITOR = '[ EXCLUSION TRANSACTION PROCESS ] Show Editor',
  HIDE_EXCLUSION_TRANSACTION_EDITOR = '[ EXCLUSION TRANSACTION PROCESS ] Hide Editor',

  SHOW_CLOSE_EDITOR = '[ EXCLUSION TRANSACTION CLOSE EXECUTION PROCESS ] Show Close Editor',
  HIDE_CLOSE_EDITOR = '[ EXCLUSION TRANSACTION CLOSE EXECUTION PROCESS ] Hide Close Editor',

  LOAD_GET_EXCLUSION_TRANSACTION_DATA = '[ EXCLUSION TRANSACTION EXECUTION PROCESS ] Load Get Exclusion Transaction Data',
  LOAD_GET_EXCLUSION_TRANSACTION_DATA_SUCCESS = '[ EXCLUSION TRANSACTION EXECUTION PROCESS ] Load Get Exclusion Transaction Data Success',

  UPDATE_EXCLUSION_TRANSACTION_DATA = '[ EXCLUSION TRANSACTION PROCESS ] Update Exclusion  Data',
  UPDATE_EXCLUSION_TRANSACTION_DATA_SUCCESS = '[ EXCLUSION TRANSACTION PROCESS ] Update Exclusion Data Success',

  UPDATE_CONFIGURE_DATA = '[ UPDATE CONFIGURE PROCESS ] Update Configure  Data',
  UPDATE_CONFIGURE_DATA_SUCCESS = '[ UPDATE CONFIGURE PROCESS ] Update Configure Data Success',
}

export class ProcessingExclusionTransaction implements Action {
  readonly type = TransactionActionTypes.PROCESSING;
}

export class NotProcessingExclusionTransaction implements Action {
  readonly type = TransactionActionTypes.NOT_PROCESSING;
}

export class LoadingExclusionTransaction implements Action {
  readonly type = TransactionActionTypes.LOADING;
}

export class NotLoadingExclusionTransaction implements Action {
  readonly type = TransactionActionTypes.NOT_LOADING;
}


export class LoadExclusionTransactionData implements Action {
  readonly type = TransactionActionTypes.LOAD_EXCLUSION_TRANSACTION_DATA;
  constructor(public rec_type: number) { }
}

export class LoadExclusionTransactionDataSuccess implements Action {
  readonly type = TransactionActionTypes.LOAD_EXCLUSION_TRANSACTION_DATA_SUCCESS;
  constructor(public payload: IExclusionTransaction[]) { }
}

export class LoadExclusionScopeData implements Action {
  readonly type = TransactionActionTypes.LOAD_EXCLUSION_SCOPE_DATA;
}

export class LoadExclusionScopeDataSuccess implements Action {
  readonly type = TransactionActionTypes.LOAD_EXCLUSION_SCOPE_DATA_SUCCESS;
  constructor(public payload: IExclusionType[]) { }
}

export class LoadExclusionActiveEmployeeData implements Action {
  readonly type = TransactionActionTypes.LOAD_EXCLUSION_ACTIVE_EMPLOYEE_DATA;
}

export class LoadExclusionActiveEmployeeDataSuccess implements Action {
  readonly type = TransactionActionTypes.LOAD_EXCLUSION_ACTIVE_EMPLOYEE_DATA_SUCCESS;
  constructor(public payload: IExclusionActiveEmployee[]) { }
}

export class LoadExclusionReasonData implements Action {
  readonly type = TransactionActionTypes.LOAD_EXCLUSION_REASON_DATA;
}

export class LoadExclusionReasonDataSuccess implements Action {
  readonly type = TransactionActionTypes.LOAD_EXCLUSION_REASON_DATA_SUCCESS;
  constructor(public payload: IExclusionReason[]) { }
}


export class LoadCanRunData implements Action {
  readonly type = TransactionActionTypes.LOAD_CAN_RUN_DATA;

  constructor(public payload: { payrollProfileId: number, payrollDate: string }) { }
}

export class LoadCanRunDataSuccess implements Action {
  readonly type = TransactionActionTypes.LOAD_CAN_RUN_DATA_SUCCESS;
  constructor(public payload: any) { }
}

export class ShowEditorExclusionTransaction implements Action {
  readonly type = TransactionActionTypes.SHOW_EXCLUSION_TRANSACTION_EDITOR;
}

export class HideEditorExclusionTransaction implements Action {
  readonly type = TransactionActionTypes.HIDE_EXCLUSION_TRANSACTION_EDITOR;
}

export class ShowCloseEditorExclusion implements Action {
  readonly type = TransactionActionTypes.SHOW_CLOSE_EDITOR;
}

export class HideCloseEditorExclusion implements Action {
  readonly type = TransactionActionTypes.HIDE_CLOSE_EDITOR;
}

export class ShowConfigureTransaction implements Action {
  readonly type = TransactionActionTypes.SHOW_CONFIGURE_TRANSACTION_EDITOR;
}

export class HideConfigureTransaction implements Action {
  readonly type = TransactionActionTypes.HIDE_CONFIGURE_TRANSACTION_EDITOR;
}

export class LoadConfigureTransactionData implements Action {
  readonly type = TransactionActionTypes.LOAD_CONFIGURE_TRANSACTION_DATA;
  constructor(public exclusion_id: number) { }
}

export class LoadConfigureTransactionDataSuccess implements Action {
  readonly type = TransactionActionTypes.LOAD_CONFIGURE_TRANSACTION_DATA_SUCCESS;
  constructor(public payload: IConfigureTransaction[]) { }
}

export class LoadingConfigureTransaction implements Action {
  readonly type = TransactionActionTypes.CONFIGURE_LOADING;
}

export class NotLoadingConfigureTransaction implements Action {
  readonly type = TransactionActionTypes.NOT_CONFIGURE_LOADING;
}

export class NotProcessingConfigureTransaction implements Action {
  readonly type = TransactionActionTypes.CONFIGURE_NOT_PROCESSING;
}

export class ShowEditorConfigureTransactionCreate implements Action {
  readonly type = TransactionActionTypes.SHOW_EDITOR_CONFIGURE_TRANSACTION_CREATE;
}

export class HideEditorConfigureTransactionCreate implements Action {
  readonly type = TransactionActionTypes.HIDE_EDITOR_CONFIGURE_TRANSACTION_CREATE;
}

export class ProcessingConfigureCreate implements Action {
  readonly type = TransactionActionTypes.CONFIGURE_CREATE_PROCESSING;
}

export class NotProcessingConfigureCreate implements Action {
  readonly type = TransactionActionTypes.CONFIGURE_CREATE_NOT_PROCESSING;
}

export class LoadExclusionTypeData implements Action {
  readonly type = TransactionActionTypes.LOAD_EXCLUSION_TYPE_DATA;
}

export class LoadExclusionTypeDataSuccess implements Action {
  readonly type = TransactionActionTypes.LOAD_EXCLUSION_TYPE_DATA_SUCCESS;
  constructor(public payload: IExclusionType[]) { }
}

export class LoadingExclusionTypeData implements Action {
  readonly type = TransactionActionTypes.LOADING_EXCLUSION_TYPE;
}

export class NotLoadingExclusionTypeData implements Action {
  readonly type = TransactionActionTypes.NOT_LOADING_EXCLUSION_TYPE;
}

export class LoadExclusionItemTypeData implements Action {
  readonly type = TransactionActionTypes.LOAD_EXCLUSION_ITEM_TYPE_DATA;
  constructor(public item_type: number) { }
}

export class LoadExclusionItemTypeDataSuccess implements Action {
  readonly type = TransactionActionTypes.LOAD_EXCLUSION_ITEM_TYPE_DATA_SUCCESS;
  constructor(public payload: IExclusionItemType[]) { }
}

export class SaveConfigureData implements Action {
  readonly type = TransactionActionTypes.SAVE_CONFIGURE_DATA;
  constructor(public payload: { data: any }) { }
}

export class LoadEditConfigureData implements Action {
  readonly type = TransactionActionTypes.LOAD_EDIT_CONFIGURE_DATA;
  constructor(public exclusion_det_id: number) { }
}

export class LoadEditConfigureDataSuccess implements Action {
  readonly type = TransactionActionTypes.LOAD_EDIT_CONFIGURE_DATA_SUCCESS;
  constructor(public payload: IConfigureTransaction ) { }
}

export class ProcessingExclusionCloseCreate implements Action {
  readonly type = TransactionActionTypes.EXCLUSION_CLOSE_CREATE_PROCESSING;
}

export class NotProcessingExclusionCloseCreate implements Action {
  readonly type = TransactionActionTypes.EXCLUSION_CLOSE_CREATE_NOT_PROCESSING;
}

export class LoadingEditConfigureData implements Action {
  readonly type = TransactionActionTypes.LOADING_EDIT_CONFIGURE;
}

export class NotLoadingEditConfigureData implements Action {
  readonly type = TransactionActionTypes.NOT_LOADING_EDIT_CONFIGURE;
}

export class SaveExclusionCloseData implements Action {
  readonly type = TransactionActionTypes.SAVE_EXCLUSION_CLOSE_DATA;
  constructor(public payload: { data: any,exclusion_id: number }) { }
}

export class DeleteTransactionConfigure implements Action {
  readonly type = TransactionActionTypes.DELETE_TRANSACTION_CONFIGURE;
  constructor(public payload: {exclusion_det_id: number}) {}
}


export class SaveTransactionData implements Action {
  readonly type = TransactionActionTypes.SAVE_EXCLUSION_TRANSACTION_DATA;
  constructor(public payload: { data: any }) { }
}

export class UpdateTransactionData implements Action {
  readonly type = TransactionActionTypes.UPDATE_EXCLUSION_TRANSACTION_DATA;
  constructor(public payload: { data: any , id:number }) { }
}
export class LoadGetExclusionTransactionData implements Action {
  readonly type = TransactionActionTypes.LOAD_GET_EXCLUSION_TRANSACTION_DATA;
  constructor(public id: number) { }
}

export class LoadGetExclusionTransactionDataSuccess implements Action {
  readonly type = TransactionActionTypes.LOAD_GET_EXCLUSION_TRANSACTION_DATA_SUCCESS;
  constructor(public payload: IExclusionTransaction) { }
}

export class UpdateConfigureData implements Action {
  readonly type = TransactionActionTypes.UPDATE_CONFIGURE_DATA;
  constructor(public payload: { data: any , exclusion_det_id:number }) { }
}

export type TransactionActions =
  | ProcessingExclusionTransaction
  | NotProcessingExclusionTransaction
  | LoadingExclusionTransaction
  | NotLoadingExclusionTransaction
  | LoadExclusionTransactionData
  | LoadExclusionTransactionDataSuccess
  | LoadExclusionScopeData
  | LoadExclusionScopeDataSuccess
  | LoadExclusionActiveEmployeeData
  | LoadExclusionActiveEmployeeDataSuccess
  | LoadExclusionReasonData
  | LoadExclusionReasonDataSuccess
  | ShowConfigureTransaction
  | HideConfigureTransaction
  | LoadingConfigureTransaction
  | NotLoadingConfigureTransaction
  | LoadConfigureTransactionDataSuccess
  | LoadConfigureTransactionData
  | NotProcessingConfigureTransaction
  | ShowEditorConfigureTransactionCreate
  | HideEditorConfigureTransactionCreate
  | ProcessingConfigureCreate
  | NotProcessingConfigureCreate
  | LoadExclusionTypeData
  | LoadExclusionTypeDataSuccess
  | LoadingExclusionTypeData
  | NotLoadingExclusionTypeData
  | LoadExclusionItemTypeData
  | LoadExclusionItemTypeDataSuccess
  | SaveConfigureData
  | LoadEditConfigureData
  | LoadEditConfigureDataSuccess
  | ProcessingExclusionCloseCreate
  | NotProcessingExclusionCloseCreate
  | DeleteTransactionConfigure
  | SaveTransactionData
  | LoadGetExclusionTransactionData
  | LoadGetExclusionTransactionDataSuccess
  | UpdateConfigureData
  | LoadCanRunData
  | LoadCanRunDataSuccess
  | ShowEditorExclusionTransaction
  | HideEditorExclusionTransaction
  | ShowCloseEditorExclusion
  | HideCloseEditorExclusion;
