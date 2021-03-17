import { IImageState, initialImageState } from "./image.state";
import { ImageActions, ImageActionTypes } from "./image.actions";

export function imageReducer(
  state = initialImageState,
  action: ImageActions
): IImageState {
  switch (action.type) {
    case ImageActionTypes.LOAD_EMPLOYEE_PHOTO_SUCCESS:
      return { ...state, employeePhoto: action.payload };
    case ImageActionTypes.LOAD_REPORTS_TO_EMPLOYEE_PHOTO_SUCCESS:
      return { ...state, reportsToEmployeePhoto: action.payload };
    case ImageActionTypes.LOAD_EMPLOYEE_SIGNATURE_SUCCESS:
      return { ...state, signature: action.payload };
    default: {
      return state;
    }
  }
}
