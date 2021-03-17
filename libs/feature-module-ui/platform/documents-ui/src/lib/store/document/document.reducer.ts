import { DocumentActions, DocumentActionTypes } from './document.actions';
import { initialDocumentState, IDocumentState } from './document.state';

export function documentReducer(
  state = initialDocumentState,
  action: DocumentActions
): IDocumentState {
  switch (action.type) {
    case DocumentActionTypes.LOAD_DATA:
      return { ...state, documentData: [] };
    case DocumentActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, documentData: action.payload };
    case DocumentActionTypes.LOAD_DOCUMENT_TYPE_SUCCESS: 
      return { ...state, documentType: action.payload };
    case DocumentActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case DocumentActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };

    case DocumentActionTypes.LOADING_DOCUMENT:
      return { ...state, isLoading: true };
    case DocumentActionTypes.NOT_LOADING_DOCUMENT:
      return { ...state, isLoading: false };

    default: {
      return state;
    }
  }
}
