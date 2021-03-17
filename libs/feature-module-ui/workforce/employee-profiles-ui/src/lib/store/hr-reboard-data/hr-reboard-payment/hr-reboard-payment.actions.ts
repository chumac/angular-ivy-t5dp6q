import { Action } from '@ngrx/store';

import { IPayment } from '@nutela/models/workforce/employee-profiles';

export enum HrReboardPaymentActionTypes {
  SHOW_EDITOR = '[HR REBOARDING DATA - PAYMENT] Show Editor',
  HIDE_EDITOR = '[HR REBOARDING DATA - PAYMENT] Hide Editor',

  SHOW_VIEWER = '[HR REBOARDING DATA - PAYMENT] Show Viewer',
  HIDE_VIEWER = '[HR REBOARDING DATA - PAYMENT] Hide Viewer',

  PROCESSING = '[HR REBOARDING DATA - PAYMENT] Processing',
  NOT_PROCESSING = '[HR REBOARDING DATA -PAYMENT] Not Processing',

  LOAD_DATA = '[HR REBOARDING DATA - PAYMENT] Load Data',
  LOAD_DATA_SUCCESS = '[HR REBOARDING DATA - PAYMENT] Load Data Success',

  SAVE = '[HR REBOARDING DATA - PAYMENT] Save',
  UPDATE = '[HR REBOARDING DATA - PAYMENT] Save Update',
}

export class ShowEditorHrReboardPayment implements Action {
  readonly type = HrReboardPaymentActionTypes.SHOW_EDITOR;
}

export class HideEditorHrReboardPayment implements Action {
  readonly type = HrReboardPaymentActionTypes.HIDE_EDITOR;
}


export class ShowViewerHrReboardPayment implements Action {
  readonly type = HrReboardPaymentActionTypes.SHOW_VIEWER;
}

export class HideViewerHrReboardPayment implements Action {
  readonly type = HrReboardPaymentActionTypes.HIDE_VIEWER;
}


export class ProcessingHrReboardPayment implements Action {
  readonly type =HrReboardPaymentActionTypes.PROCESSING;
}

export class NotProcessingHrReboardPayment implements Action {
  readonly type = HrReboardPaymentActionTypes.NOT_PROCESSING;
}


export class LoadDataHrReboardPayment implements Action {
  readonly type = HrReboardPaymentActionTypes.LOAD_DATA;
  constructor(public payload: {employeeId: number}) {}
}

export class LoadDataHrReboardPaymentSuccess implements Action {
  readonly type = HrReboardPaymentActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IPayment) {}
}

export class SaveHrReboardPayment implements Action {
  readonly type = HrReboardPaymentActionTypes.SAVE;

  constructor(public payload: {data: IPayment, employeeId: number}) {}
}

export class SaveUpdateHrReboardPayment implements Action {
  readonly type = HrReboardPaymentActionTypes.UPDATE;

  constructor(public payload: {data: IPayment, employeeId: number}) {}
}

export type HrReboardPaymentActions =
  | ShowEditorHrReboardPayment
  | HideEditorHrReboardPayment
  | ShowViewerHrReboardPayment
  | HideViewerHrReboardPayment
  | ProcessingHrReboardPayment
  | NotProcessingHrReboardPayment
  | LoadDataHrReboardPayment
  | LoadDataHrReboardPaymentSuccess
  | SaveHrReboardPayment
  | SaveUpdateHrReboardPayment;
