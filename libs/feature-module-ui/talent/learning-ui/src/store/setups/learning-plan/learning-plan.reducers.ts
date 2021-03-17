import { initialLearningPlanState, ILearningPlanState } from './learning-plan.state';
import { LearningPlanActions, LearningPlanActionTypes } from './learning-plan.actions';

export function LearningPlanReducer(
  state = initialLearningPlanState,
  action: LearningPlanActions
): ILearningPlanState {
  switch (action.type) {
    case LearningPlanActionTypes.SHOW_OPTOUT_EDITOR:
      return { ...state, showEditor: true };
    case LearningPlanActionTypes.HIDE_OPTOUT_EDITOR:
      return { ...state, showEditor: false };
    case LearningPlanActionTypes.SHOW_EDIT_EDITOR:
      return { ...state, showEditEditor: true };
    case LearningPlanActionTypes.HIDE_EDIT_EDITOR:
      return { ...state, showEditEditor: false };
    case LearningPlanActionTypes.SHOW_ENROLL_EDITOR:
      return { ...state, showEnrollEditor: true };
    case LearningPlanActionTypes.HIDE_ENROLL_EDITOR:
      return { ...state, showEnrollEditor: false };
    case LearningPlanActionTypes.SHOW_APPLY_EDITOR:
      return { ...state, showApplyEditor: true };
    case LearningPlanActionTypes.HIDE_APPLY_EDITOR:
      return { ...state, showApplyEditor: false };
    case LearningPlanActionTypes.CREATE_APPLY_SUCCESS:
      return { ...state, createApply: action.payload };
    case LearningPlanActionTypes.CREATE_ENROLL_SUCCESS:
      return { ...state, createEnroll: action.payload };
    case LearningPlanActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case LearningPlanActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case LearningPlanActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, LearningPlanData: action.payload };
    case LearningPlanActionTypes.GOTO_DATA_SUCCESS:
      return { ...state, LearningPlanGoto: action.payload };
    case LearningPlanActionTypes.GOTO_DATA_AFTER_SUCCESS:
      return { ...state, LearningPlanGoto: null };
    case LearningPlanActionTypes.EMPLOYEE_OPTOUT_DATA_SUCCESS:
      return { ...state, employeeOptOut: action.payload };
    case LearningPlanActionTypes.EDIT_EVENT_SUCCESS:
      return { ...state, editMyEvent: action.payload };
    case LearningPlanActionTypes.REMOVE_DATA:
      return { ...state, LearningPlanData: state.LearningPlanData.filter(item => item.id !== action.payload.recordId) };
    default: {
      return state;
    }
  }
}

