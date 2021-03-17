import { initialCourseState, ICourseState } from './course.state';
import { CourseActions, CourseActionTypes } from './course.actions';

export function CourseReducer(
  state = initialCourseState,
  action: CourseActions
): ICourseState {
  switch (action.type) {
    case CourseActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case CourseActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case CourseActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case CourseActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case CourseActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case CourseActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case CourseActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, CourseData: action.payload };
    case CourseActionTypes.LOAD_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    case CourseActionTypes.REMOVE_DATA:
      return { ...state, CourseData: state.CourseData.filter(item => item.course_id !== action.payload.recordId)};
    case CourseActionTypes.CLEAR_DOCUMENT:
      return { ...state, document: null };
    default: {
      return state;
    }
  }
}

