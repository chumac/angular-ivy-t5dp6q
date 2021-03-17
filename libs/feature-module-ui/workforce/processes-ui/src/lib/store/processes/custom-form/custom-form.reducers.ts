import { initialCustomFormState, ICustomFormState } from './custom-form.state';
import { CustomFormActions, CustomFormActionTypes } from './custom-form.actions';

export function customFormReducer(
  state = initialCustomFormState,
  action: CustomFormActions
): ICustomFormState {
  switch (action.type) {
    case CustomFormActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case CustomFormActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case CustomFormActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case CustomFormActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case CustomFormActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case CustomFormActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case CustomFormActionTypes.LOAD_DATA_SET_TYPE_SUCCESS:
      return { ...state, dataSetTypes: action.payload };
    case CustomFormActionTypes.LOAD_CASCADE_DATA_SET_TYPE_SUCCESS:
      return { ...state, cascadeDataSetTypes: action.payload };
    case CustomFormActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, customFormData: action.payload };
    case CustomFormActionTypes.LOAD_TYPE_LIST_SUCCESS:
      return { ...state, typeList: action.payload };
    case CustomFormActionTypes.LOAD_SCOPE_LIST_SUCCESS:
      return { ...state, scopeList: action.payload };
    case CustomFormActionTypes.LOAD_AREA_LIST_SUCCESS:
      return { ...state, areaList: action.payload };
    case CustomFormActionTypes.LOAD_ELIGIBILITY_SUCCESS:
      return { ...state, eligibilityList: action.payload };  
    case CustomFormActionTypes.LOAD_WORKFLOW_LIST_SUCCESS:
      return { ...state, workFlowList: action.payload };     
    case CustomFormActionTypes.REMOVE_DATA:
      return { ...state, customFormData: state.customFormData.filter(item => item.id !== action.payload.recordId) };
    default: {
      return state;
    }
  }
}

