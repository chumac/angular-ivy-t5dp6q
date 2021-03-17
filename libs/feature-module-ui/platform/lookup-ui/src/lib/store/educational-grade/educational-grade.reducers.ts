import { initialEducationGradesState, IEducationGradesState } from './educational-grade.state';
import { EducationalGradeActions, EducationalGradeActionTypes } from './educational-grade.actions';

export function educationGradeReducer(
  state = initialEducationGradesState,
  action: EducationalGradeActions
): IEducationGradesState {
  switch (action.type) {
    case EducationalGradeActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case EducationalGradeActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case EducationalGradeActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case EducationalGradeActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case EducationalGradeActionTypes.LOAD_GRADE_DATA_SUCCESS:
      return { ...state, gradeData: action.payload };
    default: {
      return state;
    }
  }
}
