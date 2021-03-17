import { initialFormTemplateDetailState, IFormTemplateDetailState } from './form-template-detail.state';
import { FormTemplateDetailActions, FormTemplateDetailActionTypes } from './form-template-detail.actions';

export function formTemplateDetailReducer(
  state = initialFormTemplateDetailState,
  action: FormTemplateDetailActions
): IFormTemplateDetailState {
  switch (action.type) {
    case FormTemplateDetailActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case FormTemplateDetailActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case FormTemplateDetailActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case FormTemplateDetailActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case FormTemplateDetailActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case FormTemplateDetailActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case FormTemplateDetailActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, formTemplateDetailData: action.payload };
    case FormTemplateDetailActionTypes.LOAD_FORM_TEMPLATE_DATA_SUCCESS:
      return { ...state, formTemplateList: action.payload };
    case FormTemplateDetailActionTypes.LOAD_PAGE_LIST_SUCCESS:
      return { ...state, pageList: action.payload };
    case FormTemplateDetailActionTypes.LOAD_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    case FormTemplateDetailActionTypes.REMOVE_DATA:
      return { ...state, formTemplateDetailData: state.formTemplateDetailData.filter(item => item.id !== action.payload.recordId) };
    case FormTemplateDetailActionTypes.CLEAR_DOCUMENT:
      return { ...state, document: null };
    default: {
      return state;
    }
  }
}

