import { initialDocumentTagsState, IDocumentTagsState } from './document-tags.state';
import { DocumentTagsActions, DocumentTagsActionTypes } from './document-tags.actions';

export function documentTagsReducer(
  state = initialDocumentTagsState,
  action: DocumentTagsActions
): IDocumentTagsState {
  switch (action.type) {
    case DocumentTagsActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case DocumentTagsActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case DocumentTagsActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case DocumentTagsActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case DocumentTagsActionTypes.LOAD_DOCUMENT_TAGS_DATA_SUCCESS:
      return { ...state, documentTagData: action.payload };
    default: {
      return state;
    }
  }
}
