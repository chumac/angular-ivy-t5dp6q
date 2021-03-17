import { initialProcessFormDefinitionState, IProcessFormDefinitionState } from './process-form-definition.state';
import { ProcessFormDefinitionActions, ProcessFormDefinitionActionTypes } from './process-form-definition.actions';

export function processFormDefinitionReducer(
  state = initialProcessFormDefinitionState,
  action: ProcessFormDefinitionActions
): IProcessFormDefinitionState {
  switch (action.type) {
    case ProcessFormDefinitionActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case ProcessFormDefinitionActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case ProcessFormDefinitionActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case ProcessFormDefinitionActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case ProcessFormDefinitionActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case ProcessFormDefinitionActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case ProcessFormDefinitionActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, processFormDefinitionData: action.payload };
    case ProcessFormDefinitionActionTypes.LOAD_AREA_SUCCESS:
      return { ...state, area: action.payload };
    case ProcessFormDefinitionActionTypes.REMOVE_DATA:
      return { ...state, processFormDefinitionData: state.processFormDefinitionData.filter(item => item.id !== action.payload.recordId) };
    default: {
      return state;
    }
  }
}

