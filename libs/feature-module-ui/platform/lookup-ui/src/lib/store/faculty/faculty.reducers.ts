import { initialFacultyState, IFacultyState } from './faculty.state';
import { FacultyActions, FacultyActionTypes } from './faculty.actions';

export function facultyReducer(
  state = initialFacultyState,
  action: FacultyActions
): IFacultyState {
  switch (action.type) {
    case FacultyActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case FacultyActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case FacultyActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case FacultyActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case FacultyActionTypes.LOADING:
      return { ...state, isLoading: true };
    case FacultyActionTypes.NOT_LOADING:
      return { ...state, isLoading: false };
    case FacultyActionTypes.LOAD_FACULTY_DATA_SUCCESS:
      return { ...state, facultyData: action.payload };
    default: {
      return state;
    }
  }
}
