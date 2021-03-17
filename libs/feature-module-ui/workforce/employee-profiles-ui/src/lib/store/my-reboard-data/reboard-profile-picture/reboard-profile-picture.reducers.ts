import { IReboardProfilePictureState, initialReboardProfilePictureState } from "./reboard-profile-picture.state";
import { ReboardProfilePictureActions, ReboardProfilePictureActionTypes } from "./reboard-profile-picture.actions";

export function reboardProfilePictureReducer(
  state = initialReboardProfilePictureState,
  action: ReboardProfilePictureActions
): IReboardProfilePictureState {
  switch (action.type) {
    case ReboardProfilePictureActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case ReboardProfilePictureActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case ReboardProfilePictureActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case ReboardProfilePictureActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case ReboardProfilePictureActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case ReboardProfilePictureActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case ReboardProfilePictureActionTypes.LOAD_EMPLOYEE_PHOTO_SUCCESS:
      return { ...state, employeePhoto: action.payload };
    default: {
      return state;
    }
  }
}
