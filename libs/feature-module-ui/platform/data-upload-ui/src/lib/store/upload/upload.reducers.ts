import { initialUploadState, IUploadState } from './upload.state';
import { UploadActions, UploadActionTypes } from './upload.actions';

export function uploadReducer(
  state = initialUploadState,
  action: UploadActions
): IUploadState {
  switch (action.type) {
    case UploadActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case UploadActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case UploadActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case UploadActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case UploadActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case UploadActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case UploadActionTypes.LOADING:
      return { ...state, isLoading: true };
    case UploadActionTypes.NOT_LOADING:
      return { ...state, isLoading: false };
    case UploadActionTypes.LOAD_UPLOAD_DATA_SUCCESS:
      return { ...state, dataUpload: action.payload };
    case UploadActionTypes.LOAD_UPLOAD_STATUS_SUCCESS:
      return { ...state, uploadStatus: action.payload };
    case UploadActionTypes.LOAD_TEMPLATE_DATA_SUCCESS:
      return { ...state, templateData: action.payload };
    case UploadActionTypes.LOAD_DESTINATION_SUCCESS:
      return { ...state, destination: action.payload };
    case UploadActionTypes.LOAD_STATUS_SUCCESS:
      return { ...state, status: action.payload };
    case UploadActionTypes.LOAD_CURRENT_STATUS_SUCCESS:
      return { ...state, currentStatus: action.payload };
    default: {
      return state;
    }
  }
}
