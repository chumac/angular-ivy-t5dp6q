import { initialContractPageDefinitionState, IContractPageDefinitionState } from './contract-page-definition.state';
import { ContractPageDefinitionActions, ContractPageDefinitionActionTypes } from './contract-page-definition.actions';

export function contractPageDefinitionReducer(
  state = initialContractPageDefinitionState,
  action: ContractPageDefinitionActions
): IContractPageDefinitionState {
  switch (action.type) {
    case ContractPageDefinitionActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case ContractPageDefinitionActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case ContractPageDefinitionActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case ContractPageDefinitionActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case ContractPageDefinitionActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case ContractPageDefinitionActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case ContractPageDefinitionActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, contractPageDefinitionData: action.payload };
    case ContractPageDefinitionActionTypes.LOAD_CONTRACT_PAGE_LIST_SUCCESS:
      return { ...state, contractPagesList: action.payload };
    case ContractPageDefinitionActionTypes.LOAD_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    case ContractPageDefinitionActionTypes.REMOVE_DATA:
      return { ...state, contractPageDefinitionData: state.contractPageDefinitionData.filter(item => item.id !== action.payload.recordId) };
    case ContractPageDefinitionActionTypes.CLEAR_DOCUMENT:
      return { ...state, document: null };
    default: {
      return state;
    }
  }
}

