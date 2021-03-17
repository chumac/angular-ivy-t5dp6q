import { initialHrReboardProfessionalQualificationsState, IHrReboardProfessionalQualificationsState } from './hr-reboard-professional-qualifications.state';
import { HrReboardProfessionalQualificationsActions, HrReboardProfessionalQualificationsActionTypes } from './hr-reboard-professional-qualifications.actions';

export function hrReboardProfessionalQualificationsReducer(
  state = initialHrReboardProfessionalQualificationsState,
  action: HrReboardProfessionalQualificationsActions
): IHrReboardProfessionalQualificationsState {
  switch (action.type) {
    case HrReboardProfessionalQualificationsActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case HrReboardProfessionalQualificationsActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case HrReboardProfessionalQualificationsActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case HrReboardProfessionalQualificationsActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case HrReboardProfessionalQualificationsActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case HrReboardProfessionalQualificationsActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case HrReboardProfessionalQualificationsActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, data: action.payload };
    case HrReboardProfessionalQualificationsActionTypes.LOAD_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    case HrReboardProfessionalQualificationsActionTypes.CLEAR_DOCUMENT:
      return { ...state, document: null };
    default: {
      return state;
    }
  }
}
