import { initialSectionState, ISectionState } from './section.state';
import { SectionActions, SectionActionTypes } from './section.actions';

export function sectionReducer(
  state = initialSectionState,
  action: SectionActions
): ISectionState {
  switch (action.type) {
    case SectionActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case SectionActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case SectionActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case SectionActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case SectionActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case SectionActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case SectionActionTypes.PROCESSING_GRID:
      return { ...state, isProcessingGrid: true };
    case SectionActionTypes.NOT_PROCESSING_GRID:
      return { ...state, isProcessingGrid: false };
    case SectionActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, sectionData: action.payload };
    case SectionActionTypes.LOAD_CUSTOM_PAGE_LIST_SUCCESS:
      return { ...state, customPagesList: action.payload };
    case SectionActionTypes.LOAD_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    case SectionActionTypes.REMOVE_DATA:
      return { ...state, sectionData: state.sectionData.filter(item => item.id !== action.payload.recordId) };
    case SectionActionTypes.CLEAR_DOCUMENT:
      return { ...state, document: null };
    default: {
      return state;
    }
  }
}

