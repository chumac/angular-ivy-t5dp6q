import { initialQualificationState, IQualificationState } from './qualifications.state';
import { QualificationActions, QualificationActionTypes } from './qualifications.actions';

export function qualificationReducer(
  state = initialQualificationState,
  action: QualificationActions
): IQualificationState {
  switch (action.type) {
    case QualificationActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case QualificationActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case QualificationActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case QualificationActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case QualificationActionTypes.LOAD_QUALIFICATION_DATA_SUCCESS:
      return { ...state, qualificationData: action.payload };
    case QualificationActionTypes.LOAD_CATEGORY_DATA_SUCCESS:
      return { ...state, quaCategory: action.payload};
    default: {
      return state;
    }
  }
}
