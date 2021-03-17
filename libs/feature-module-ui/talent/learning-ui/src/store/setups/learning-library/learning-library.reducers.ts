import { initialLearningLibraryState, ILearningLibraryState } from './learning-library.state';
import { LearningLibraryActions, LearningLibraryActionTypes } from './learning-library.actions';

export function LearningLibraryReducer(
  state = initialLearningLibraryState,
  action: LearningLibraryActions
): ILearningLibraryState {
  switch (action.type) {
    case LearningLibraryActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case LearningLibraryActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case LearningLibraryActionTypes.SHOW_ENROLL_EDITOR:
      return { ...state, showEnrollEditor: true };
    case LearningLibraryActionTypes.HIDE_ENROLL_EDITOR:
      return { ...state, showEnrollEditor: false };
    case LearningLibraryActionTypes.SHOW_APPLY_EDITOR:
      return { ...state, showApplyEditor: true };
    case LearningLibraryActionTypes.HIDE_APPLY_EDITOR:
      return { ...state, showApplyEditor: false };
    case LearningLibraryActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, LearningLibraryData: action.payload };
    case LearningLibraryActionTypes.CREATE_APPLY_SUCCESS:
      return { ...state, createApply: action.payload };
    case LearningLibraryActionTypes.CREATE_ENROLL_SUCCESS:
      return { ...state, createEnroll: action.payload };
    default: {
      return state;
    }
  }
}

