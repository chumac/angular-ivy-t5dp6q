import { Action } from '@ngrx/store';

import { IPayment } from '@nutela/models/workforce/employee-profiles';

export enum ReboardPaymentActionTypes {
  SHOW_EDITOR = '[MY REBOARDING DATA - PAYMENT] Show Editor',
  HIDE_EDITOR = '[MY REBOARDING DATA - PAYMENT] Hide Editor',

  SHOW_VIEWER = '[MY REBOARDING DATA - PAYMENT] Show Viewer',
  HIDE_VIEWER = '[MY REBOARDING DATA - PAYMENT] Hide Viewer',

  PROCESSING = '[MY REBOARDING DATA - PAYMENT] Processing',
  NOT_PROCESSING = '[MY REBOARDING DATA -PAYMENT] Not Processing',

  LOAD_DATA = '[MY REBOARDING DATA - PAYMENT] Load Data',
  LOAD_DATA_SUCCESS = '[MY REBOARDING DATA - PAYMENT] Load Data Success',

  SAVE = '[MY REBOARDING DATA - PAYMENT] Save',
  UPDATE = '[MY REBOARDING DATA - PAYMENT] Save Update',
}

export class ShowEditorReboardPayment implements Action {
  readonly type = ReboardPaymentActionTypes.SHOW_EDITOR;
}

export class HideEditorReboardPayment implements Action {
  readonly type = ReboardPaymentActionTypes.HIDE_EDITOR;
}


export class ShowViewerReboardPayment implements Action {
  readonly type = ReboardPaymentActionTypes.SHOW_VIEWER;
}

export class HideViewerReboardPayment implements Action {
  readonly type = ReboardPaymentActionTypes.HIDE_VIEWER;
}


export class ProcessingReboardPayment implements Action {
  readonly type =ReboardPaymentActionTypes.PROCESSING;
}

export class NotProcessingReboardPayment implements Action {
  readonly type = ReboardPaymentActionTypes.NOT_PROCESSING;
}


export class LoadDataReboardPayment implements Action {
  readonly type = ReboardPaymentActionTypes.LOAD_DATA;
}

export class LoadDataReboardPaymentSuccess implements Action {
  readonly type = ReboardPaymentActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IPayment) {}
}

export class SaveReboardPayment implements Action {
  readonly type = ReboardPaymentActionTypes.SAVE;

  constructor(public payload: IPayment) {}
}

export class SaveUpdateReboardPayment implements Action {
  readonly type = ReboardPaymentActionTypes.UPDATE;

  constructor(public payload: {data: IPayment, recordId: number}) {}
}

export type ReboardPaymentActions =
  | ShowEditorReboardPayment
  | HideEditorReboardPayment
  | ShowViewerReboardPayment
  | HideViewerReboardPayment
  | ProcessingReboardPayment
  | NotProcessingReboardPayment
  | LoadDataReboardPayment
  | LoadDataReboardPaymentSuccess
  | SaveReboardPayment
  | SaveUpdateReboardPayment;
