import { initialCourseCategoryState, ICourseCategoryState } from './course-category.state';
import { CourseCategoryActions, CourseCategoryActionTypes } from './course-category.actions';

export function courseCategoryReducer(
  state = initialCourseCategoryState,
  action: CourseCategoryActions
): ICourseCategoryState {
  switch (action.type) {
    case CourseCategoryActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case CourseCategoryActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case CourseCategoryActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case CourseCategoryActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case CourseCategoryActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case CourseCategoryActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case CourseCategoryActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, courseCategoryData: action.payload };
    case CourseCategoryActionTypes.LOAD_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    case CourseCategoryActionTypes.REMOVE_DATA:
      return { ...state, courseCategoryData: state.courseCategoryData.filter(item => item.category_id !== action.payload.recordId) };
    case CourseCategoryActionTypes.CLEAR_DOCUMENT:
      return { ...state, document: null };
    default: {
      return state;
    }
  }
}

