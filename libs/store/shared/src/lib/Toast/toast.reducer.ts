import { IToastState, initialToastState } from "./toast.state";
import { ToastActions, ToastActionTypes } from "./toast.actions";

export function toastReducer(state: IToastState = initialToastState, action: ToastActions) {
  switch(action.type) {
    default:
      return state;
  }
}
