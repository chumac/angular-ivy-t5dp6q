import { initialPageState, IPageState } from './page.state';
import { PageActions, PageActionTypes } from './page.actions';

export function pageReducer(
  state = initialPageState,
  action: PageActions
): IPageState {
  switch (action.type) {
    case PageActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case PageActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case PageActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case PageActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case PageActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case PageActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case PageActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, pageData: action.payload };
    case PageActionTypes.LOAD_PAGE_TYPE_SUCCESS:
      return { ...state, pageType: action.payload };
    case PageActionTypes.LOAD_COMPLETED_PAGE_DATA_SUCCESS:
      return { ...state, completedPageData: action.payload };
    case PageActionTypes.LOAD_UNCOMPLETED_PAGE_DATA_SUCCESS:
      return { ...state, uncompletedPageData: action.payload };
    case PageActionTypes.LOAD_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    case PageActionTypes.REMOVE_DATA:
      return { ...state, pageData: state.pageData.filter(item => item.id !== action.payload.recordId) };
    case PageActionTypes.CLEAR_DOCUMENT:
      return { ...state, document: null };
    default: {
      return state;
    }
  }
}

