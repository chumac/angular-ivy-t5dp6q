import { initialEducationalCoursesState, IEducationalCoursesState } from './educational-courses.state';
import { educationalCourseActions, educationalCourseActionTypes } from './educational-courses.actions';

export function educationalCoursesReducer(
  state = initialEducationalCoursesState,
  action: educationalCourseActions
): IEducationalCoursesState {
  switch (action.type) {
    case educationalCourseActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case educationalCourseActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case educationalCourseActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case educationalCourseActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case educationalCourseActionTypes.LOAD_COURSE_DATA_SUCCESS:
      return { ...state, educationalCoursesData: action.payload };
    case educationalCourseActionTypes.LOAD_CATEGORY_SUCCESS:
      return { ...state, category: action.payload };
    default: {
      return state;
    }
  }
}
