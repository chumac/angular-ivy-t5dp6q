import { initialResignState, IResignState } from './resign.state';
import { ResignActions, ResignActionTypes } from './resign.actions';

export function resignReducer(
  state = initialResignState,
  action: ResignActions
): IResignState {
  switch (action.type) {
    case ResignActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case ResignActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case ResignActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case ResignActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case ResignActionTypes.SHOW_PROCESS_TABLE_VIEWER:
      return { ...state, showViewerProcessTable: true };
    case ResignActionTypes.HIDE_PROCESS_TABLE_VIEWER:
      return { ...state, showViewerProcessTable: false };
    case ResignActionTypes.SHOW_CHECKLIST_VIEWER:
      return { ...state, showViewerChecklist: true };
    case ResignActionTypes.HIDE_CHECKLIST_VIEWER:
      return { ...state, showViewerChecklist: false };
    case ResignActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case ResignActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };

    case ResignActionTypes.LOAD_RESIGNATION_LETTER_SUCCESS:
      return { ...state, resignationLetter: action.payload };

    case ResignActionTypes.LOAD_REVIEW_CHECKLIST_DATA_SUCCESS:
      return { ...state, reviewChecklist: action.payload };
    case ResignActionTypes.LOAD_EXIT_COMPLETED_URL_DATA_SUCCESS:
      return { ...state, exitCompletedUrl: action.payload };

    case ResignActionTypes.LOAD_EXIT_INTERVIEW_STATUS_SUCCESS:
      return { ...state, exitInterviewStatus: action.payload };
    case ResignActionTypes.LOAD_PROCESS_TABLE_DATA_SUCCESS:
      return { ...state, processTableData: action.payload };

    default: {
      return state;
    }
  }
}
