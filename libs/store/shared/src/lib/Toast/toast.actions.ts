import { Action } from '@ngrx/store';
import { IndividualConfig } from 'ng-uikit-pro-standard';
import { ToastTypes } from '@nutela/shared/app-global';

export enum ToastActionTypes {
  SHOW = '[TOAST] Show',
}

export class ShowToast implements Action {
  readonly type = ToastActionTypes.SHOW;

  constructor(public payload: { title: string, message: string, options?: IndividualConfig, type?: ToastTypes }) {}
}

export type ToastActions = ShowToast;
