import { initialPerspectiveRatingState, IPerspectiveRatingState } from './perspective-rating.state';
import { PerspectiveRatingActions, PerspectiveRatingActionTypes } from './perspective-rating.actions';

export function perspectiveRatingReducer(
  state = initialPerspectiveRatingState,
  action: PerspectiveRatingActions
): IPerspectiveRatingState {
  switch (action.type) {
    case PerspectiveRatingActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case PerspectiveRatingActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case PerspectiveRatingActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case PerspectiveRatingActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case PerspectiveRatingActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case PerspectiveRatingActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case PerspectiveRatingActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, perspectiveRatingData: action.payload.map(data => Object.assign({}, data, {
        perspective_description: data.PerspectivesInfo.description,
      }))
    };
      case PerspectiveRatingActionTypes.LOAD_PERSPECTIVE_LIST_SUCCESS:
      return { ...state, perspectiveList: action.payload };
    case PerspectiveRatingActionTypes.LOAD_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    case PerspectiveRatingActionTypes.REMOVE_DATA:
      return { ...state, perspectiveRatingData: state.perspectiveRatingData.filter(item => item.id !== action.payload.recordId)};
    case PerspectiveRatingActionTypes.CLEAR_DOCUMENT:
      return { ...state, document: null };
      case PerspectiveRatingActionTypes.LOAD_ANALYSIS_LIST_SUCCESS:
      return { ...state, analysisList: action.payload };
    case PerspectiveRatingActionTypes.LOAD_ANALYSIS_DETAIL_LIST_SUCCESS:
      return { ...state, analysisDetList: action.payload };
    case PerspectiveRatingActionTypes.LOAD_POSITION_LIST_SUCCESS:
      return { ...state, positionList: action.payload };
    case PerspectiveRatingActionTypes.LOAD_DESIGNATION_LIST_SUCCESS:
      return { ...state, designationList: action.payload };
    case PerspectiveRatingActionTypes.LOAD_GRADE_LIST_SUCCESS:
      return { ...state, gradeList: action.payload };
    case PerspectiveRatingActionTypes.LOAD_EMPLOYEE_LIST_SUCCESS:
      return { ...state, employeeList: action.payload };
    default: {
      return state;
    }
  }
}

