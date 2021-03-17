import { initialAppraisalStatusState, IAppraisalStatusState } from './appraisal-status.state';
import { AppraisalStatusActions, AppraisalStatusActionTypes } from './appraisal-status.actions';

export function appraisalStatusReducer(
  state = initialAppraisalStatusState,
  action: AppraisalStatusActions
): IAppraisalStatusState {
  switch (action.type) {
    case AppraisalStatusActionTypes.LOAD_APPRAISAL_STATUS_SUCCESS:
      return { ...state, data: action.payload };
    case AppraisalStatusActionTypes.CLEAR_APPRAISAL_STATUS:
      return { ...state, data: [] };
    default: {
      return state;
    }
  }
}
