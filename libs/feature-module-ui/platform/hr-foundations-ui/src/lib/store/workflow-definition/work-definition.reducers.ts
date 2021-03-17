import { initialWorkDefinitionState, IWorkDefinitionState } from './work-definition.state';
import { WorkDefinitionActions, WorkDefinitionActionTypes } from './work-definition.actions';

export function workDefinitionReducer(
  state = initialWorkDefinitionState,
  action: WorkDefinitionActions
): IWorkDefinitionState {
  switch (action.type) {
    case WorkDefinitionActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case WorkDefinitionActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case WorkDefinitionActionTypes.SHOW_STEP:
      return { ...state, showStep: true };
    case WorkDefinitionActionTypes.HIDE_STEP:
      return { ...state, showStep: false };
    case WorkDefinitionActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case WorkDefinitionActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case WorkDefinitionActionTypes.LOADING:
      return { ...state, isLoading: true };
    case WorkDefinitionActionTypes.NOT_LOADING:
      return { ...state, isLoading: false };
    case WorkDefinitionActionTypes.LOAD_WORK_DEFINITION_DATA_SUCCESS:
      return { ...state, workDefinitionData: action.payload };
    case WorkDefinitionActionTypes.LOAD_POSITION_DATA_SUCCESS:
      return { ...state, position: action.payload };
    case WorkDefinitionActionTypes.LOAD_INDIVIDUAL_DATA_SUCCESS:
      return { ...state, individual: action.payload };
    case WorkDefinitionActionTypes.LOAD_ROLE_DATA_SUCCESS:
      return { ...state, role: action.payload };
    case WorkDefinitionActionTypes.SEND_DATA:
        return {...state, sendBack:action.payload}
    default: {
      return state;
    }
  }
}
