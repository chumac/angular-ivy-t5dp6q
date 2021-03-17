import { IHrReboardProfilePictureState, initialHrReboardProfilePictureState } from "./hr-reboard-profile-picture.state";
import { HrReboardProfilePictureActions, HrReboardProfilePictureActionTypes } from "./hr-reboard-profile-picture.actions";

export function hrReboardProfilePictureReducer(
  state = initialHrReboardProfilePictureState,
  action: HrReboardProfilePictureActions
): IHrReboardProfilePictureState {
  switch (action.type) {
    case HrReboardProfilePictureActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case HrReboardProfilePictureActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case HrReboardProfilePictureActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case HrReboardProfilePictureActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case HrReboardProfilePictureActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case HrReboardProfilePictureActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case HrReboardProfilePictureActionTypes.LOAD_EMPLOYEE_PHOTO_SUCCESS:
      return { ...state, employeePhoto: action.payload };
    default: {
      return state;
    }
  }
}
