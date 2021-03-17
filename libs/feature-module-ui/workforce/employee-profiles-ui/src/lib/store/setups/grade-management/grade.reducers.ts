import { initialGradeManagementState, IGradeManagementState } from './grade.state';
import { GradeManagementActions, GradeManagementActionTypes } from './grade.actions';

export function gradeManagementReducer(
  state = initialGradeManagementState,
  action: GradeManagementActions
): IGradeManagementState {
  switch (action.type) {
    case GradeManagementActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case GradeManagementActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case GradeManagementActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case GradeManagementActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case GradeManagementActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case GradeManagementActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case GradeManagementActionTypes.LOADING:
      return { ...state, isLoading: false };
    case GradeManagementActionTypes.NOT_LOADING:
      return { ...state, isLoading: true };
    case GradeManagementActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, data: action.payload };
    default: {
      return state;
    }
  }
}

