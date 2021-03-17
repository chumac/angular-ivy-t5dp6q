import { IImageState, initialImageState } from "./image.state";
import { ImageActions, ImageActionTypes } from "./image.actions";

export function imageReducer(
  state = initialImageState,
  action: ImageActions
): IImageState {
  switch (action.type) {
    case ImageActionTypes.HR_SHOW_EDITOR:
      return { ...state, showEditor: true };
    case ImageActionTypes.HR_HIDE_EDITOR:
      return { ...state, showEditor: false };
    case ImageActionTypes.HR_SHOW_VIEWER:
      return { ...state, showViewer: true };
    case ImageActionTypes.HR_HIDE_VIEWER:
      return { ...state, showViewer: false };
    case ImageActionTypes.HR_PROCESSING:
      return { ...state, isProcessing: true };
    case ImageActionTypes.HR_NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case ImageActionTypes.HR_LOAD_EMPLOYEE_PHOTO_SUCCESS:
      return { ...state, employeePhoto: action.payload };
    case ImageActionTypes.HR_LOAD_EMPLOYEE_FILE_PHOTO_SUCCESS:
      return { ...state, employeeFilePhoto: action.payload };
    case ImageActionTypes.HR_LOAD_AWAITING_APPROVAL_EMPLOYEE_PHOTO_SUCCESS:
      return { ...state, awaitingApprovalEmployeePhoto: action.payload };
    case ImageActionTypes.HR_LOAD_REPORTS_TO_EMPLOYEE_PHOTO_SUCCESS:
      return { ...state, reportsToEmployeePhoto: action.payload };
    case ImageActionTypes.HR_LOAD_EMPLOYEE_SIGNATURE_SUCCESS:
      return { ...state, signature: action.payload };
    case ImageActionTypes.HR_RESET_DATA:
      return {
        ...state,
        employeePhoto: null,
        awaitingApprovalEmployeePhoto: null,
        signature: null,
        isProcessing: false,
        showEditor: false,
        showViewer: false
   };
    default: {
      return state;
    }
  }
}
