import { initialHrReboardIdentificationState, IHrReboardIdentificationState } from './hr-reboard-identification.state';
import { HrReboardIdentificationActions, HrReboardIdentificationActionTypes } from './hr-reboard-identification.actions';

export function hrReboardIdentificationReducer(state = initialHrReboardIdentificationState, action: HrReboardIdentificationActions): IHrReboardIdentificationState {
  switch (action.type) {
    case HrReboardIdentificationActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case HrReboardIdentificationActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case HrReboardIdentificationActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case HrReboardIdentificationActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case HrReboardIdentificationActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case HrReboardIdentificationActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case HrReboardIdentificationActionTypes.LOADING:
      return { ...state, isLoading: true };
    case HrReboardIdentificationActionTypes.NOT_LOADING:
      return { ...state, isLoading: false };
    case HrReboardIdentificationActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, data: action.payload };
    case HrReboardIdentificationActionTypes.LOAD_SIGNATURE_IMAGE_SUCCESS:
      return { ...state, signature: action.payload };
    case HrReboardIdentificationActionTypes.LOAD_PAYGROUP_SUCCESS:
      return { ...state, paygroupList: action.payload };
    case HrReboardIdentificationActionTypes.LOAD_GRADE_SUCCESS:
      return { ...state, gradeList: action.payload };
    case HrReboardIdentificationActionTypes.LOAD_POSITION_SUCCESS:
      return { ...state, positionList: action.payload };
    case HrReboardIdentificationActionTypes.HR_LOAD_STAFF_LIST_SUCCESS:
      return { ...state, reportTos: action.payload, backupOfficers: action.payload };
    case HrReboardIdentificationActionTypes.HR_LOAD_JOB_TITLES_SUCCESS:
      return { ...state, jobTitles: action.payload, actingJobTitles: action.payload };
    case HrReboardIdentificationActionTypes.HR_LOAD_PAYMENT_MODES_SUCCESS:
      return { ...state, paymentModes: action.payload };
    default: {
      return state;
    }
  }
}
