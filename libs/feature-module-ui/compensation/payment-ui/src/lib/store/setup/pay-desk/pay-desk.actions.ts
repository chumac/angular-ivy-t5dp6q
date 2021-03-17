import { Action } from "@ngrx/store";
import { IPayDesk, IPaymentPlatform } from "@nutela/models/compensation/payment";


export enum PayDeskActionTypes {
  SHOW_EDITOR = '[HR PAYMENTS - PAY DESK] Show Editor',
  HIDE_EDITOR = '[HR PAYMENTS - PAY DESK] Hide Editor',

  SHOW_VIEWER = '[HR PAYMENTS - PAY DESK] Show Viewer',
  HIDE_VIEWER = '[HR PAYMENTS - PAY DESK] Hide Viewer',

  PROCESSING_DATA = '[HR PAYMENTS - PAY DESK] Processing',
  NOT_PROCESSING_DATA = '[HR PAYMENTS - PAY DESK] Not Processing',

  LOADING_DATA = '[HR PAYMENTS - PAY DESK] Loading',
  NOT_LOADING_DATA = '[HR PAYMENTS - PAY DESK]  Not Loading',

  LOAD_DATA = '[HR PAYMENTS - PAY DESK]  Load Data',
  LOAD_DATA_SUCCESS = '[HR PAYMENTS - PAY DESK]  Load Data Success',

  LOAD_PAYMENT_PLATFORM_DATA = '[HR PAYMENTS - PAY DESK]  Load Payment Platform Data',
  LOAD_PAYMENT_PLATFORM_DATA_SUCCESS = '[HR PAYMENTS - PAY DESK]  Load Payment Platform Data Success',

  SAVE = '[HR PAYMENTS - PAY DESK] Save Data Loan',
  SAVE_SUCCESS = '[HR PAYMENTS - PAY DESK] Save Data Loan Success'
}

export class ShowEditor implements Action {
  readonly type = PayDeskActionTypes.SHOW_EDITOR;
}

export class HideEditor implements Action {
  readonly type = PayDeskActionTypes.HIDE_EDITOR;
}

export class ShowViewer implements Action {
  readonly type = PayDeskActionTypes.SHOW_VIEWER;
}

export class HideViewer implements Action {
  readonly type = PayDeskActionTypes.HIDE_VIEWER;
}

export class ProcessingData implements Action {
  readonly type = PayDeskActionTypes.PROCESSING_DATA;
}

export class NotProcessingData implements Action {
  readonly type = PayDeskActionTypes.NOT_PROCESSING_DATA;
}

export class LoadingData implements Action {
  readonly type = PayDeskActionTypes.LOADING_DATA;
}

export class NotLoadingData implements Action {
  readonly type = PayDeskActionTypes.NOT_LOADING_DATA;
}

export class LoadData implements Action {
  readonly type = PayDeskActionTypes.LOAD_DATA;
}

export class LoadDataSuccess implements Action {
  readonly type =
    PayDeskActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IPayDesk[]) { }
}

export class LoadPaymentPlatformData implements Action {
  readonly type = PayDeskActionTypes.LOAD_PAYMENT_PLATFORM_DATA;
}

export class LoadPaymentPlatformDataSuccess implements Action {
  readonly type =
    PayDeskActionTypes.LOAD_PAYMENT_PLATFORM_DATA_SUCCESS;

  constructor(public payload: IPaymentPlatform[]) { }
}

export class SaveData implements Action {
  readonly type = PayDeskActionTypes.SAVE;

  constructor(public payload: { data: any }) { }
}


export type PayDeskActions =
  | ShowEditor
  | HideEditor
  | ShowViewer
  | HideViewer
  | ProcessingData
  | NotProcessingData
  | LoadingData
  | NotLoadingData
  | LoadData
  | LoadDataSuccess
  | LoadPaymentPlatformData
  | LoadPaymentPlatformDataSuccess
  | SaveData
