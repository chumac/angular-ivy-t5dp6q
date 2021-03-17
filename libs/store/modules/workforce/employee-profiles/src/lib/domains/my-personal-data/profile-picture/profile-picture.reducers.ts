import { IProfilePictureState, initialProfilePictureState } from "./profile-picture.state";
import { ProfilePictureActions, ProfilePictureActionTypes } from "./profile-picture.actions";

export function profilePictureReducer(
  state = initialProfilePictureState,
  action: ProfilePictureActions
): IProfilePictureState {
  switch (action.type) {
    case ProfilePictureActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case ProfilePictureActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case ProfilePictureActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case ProfilePictureActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case ProfilePictureActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case ProfilePictureActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case ProfilePictureActionTypes.LOAD_EMPLOYEE_PHOTO_SUCCESS:
      return { ...state, approvedEmployeePhoto: action.payload };
    case ProfilePictureActionTypes.LOAD_AWAITING_APPROVAL_EMPLOYEE_PHOTO_SUCCESS:
      return { ...state, awaitingApprovalEmployeePhoto: action.payload };
    default: {
      return state;
    }
  }
}
