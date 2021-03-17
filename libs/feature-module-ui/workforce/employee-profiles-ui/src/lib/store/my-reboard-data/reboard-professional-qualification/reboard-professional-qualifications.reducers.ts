import { initialReboardProfessionalQualificationsState, IReboardProfessionalQualificationsState } from './reboard-professional-qualifications.state';
import { ReboardProfessionalQualificationsActions, ReboardProfessionalQualificationsActionTypes } from './reboard-professional-qualifications.actions';

export function reboardProfessionalQualificationsReducer(
  state = initialReboardProfessionalQualificationsState,
  action: ReboardProfessionalQualificationsActions
): IReboardProfessionalQualificationsState {
  switch (action.type) {
    case ReboardProfessionalQualificationsActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case ReboardProfessionalQualificationsActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case ReboardProfessionalQualificationsActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case ReboardProfessionalQualificationsActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case ReboardProfessionalQualificationsActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case ReboardProfessionalQualificationsActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case ReboardProfessionalQualificationsActionTypes.LOAD_DATA_SUCCESS:
      return {
        ...state, gridData: action.payload.map(data => Object.assign({}, data, {
          institution: data.institution.description,
          qualification: data.qualification.description,
          award: data.proAwards.description,
        })), data: action.payload };
    case ReboardProfessionalQualificationsActionTypes.LOAD_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    case ReboardProfessionalQualificationsActionTypes.CLEAR_DOCUMENT:
      return { ...state, document: null };
    default: {
      return state;
    }
  }
}
