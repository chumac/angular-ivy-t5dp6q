import { initialFormTemplateState, IFormTemplateState } from './form-template.state';
import { FormTemplateActions, FormTemplateActionTypes } from './form-template.actions';

export function formTemplateReducer(
  state = initialFormTemplateState,
  action: FormTemplateActions
): IFormTemplateState {
  switch (action.type) {
    case FormTemplateActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case FormTemplateActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case FormTemplateActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case FormTemplateActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case FormTemplateActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case FormTemplateActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case FormTemplateActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, formTemplateData: action.payload };
    case FormTemplateActionTypes.LOAD_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    case FormTemplateActionTypes.REMOVE_DATA:
      return { ...state, formTemplateData: state.formTemplateData.filter(item => item.id !== action.payload.recordId) };
    case FormTemplateActionTypes.CLEAR_DOCUMENT:
      return { ...state, document: null };
    case FormTemplateActionTypes.LOAD_ANALYSIS_LIST_SUCCESS:
      return { ...state, analysisList: action.payload };
    case FormTemplateActionTypes.LOAD_ANALYSIS_DETAIL_LIST_SUCCESS:
      return { ...state, analysisDetList: action.payload };
    case FormTemplateActionTypes.LOAD_POSITION_LIST_SUCCESS:
      return { ...state, positionList: action.payload };
    case FormTemplateActionTypes.LOAD_DESIGNATION_LIST_SUCCESS:
      return { ...state, designationList: action.payload };
    case FormTemplateActionTypes.LOAD_GRADE_LIST_SUCCESS:
      return { ...state, gradeList: action.payload };
    case FormTemplateActionTypes.LOAD_EMPLOYEE_LIST_SUCCESS:
      return { ...state, employeeList: action.payload };
    default: {
      return state;
    }
  }
}

