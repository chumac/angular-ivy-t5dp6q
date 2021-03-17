import { initialProcessFormWizardState, IProcessFormWizardState } from './process-form-wizard.state';
import { ProcessFormWizardActions, ProcessFormWizardActionTypes } from './process-form-wizard.actions';

export function processFormWizardReducer(
  state = initialProcessFormWizardState,
  action: ProcessFormWizardActions
): IProcessFormWizardState {
  switch (action.type) {
    case ProcessFormWizardActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case ProcessFormWizardActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case ProcessFormWizardActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case ProcessFormWizardActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case ProcessFormWizardActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case ProcessFormWizardActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
      case ProcessFormWizardActionTypes.PROCESSING_MASTER:
        return { ...state, isProcessingMaster: true };
      case ProcessFormWizardActionTypes.NOT_PROCESSING_MASTER:
        return { ...state, isProcessingMaster: false };
      case ProcessFormWizardActionTypes.PROCESSING_DETAIL:
        return { ...state, isProcessingDetail: true };
      case ProcessFormWizardActionTypes.NOT_PROCESSING_DETAIL:
        return { ...state, isProcessingDetail: false };
    case ProcessFormWizardActionTypes.SAVING:
      return { ...state, isSaving: true };
    case ProcessFormWizardActionTypes.NOT_SAVING:
      return { ...state, isSaving: false };
    case ProcessFormWizardActionTypes.COMPLETING:
      return { ...state, isCompleting: true };
    case ProcessFormWizardActionTypes.NOT_COMPLETING:
      return { ...state, isCompleting: false };
    case ProcessFormWizardActionTypes.SUBMITTING:
      return { ...state, isSubmitting: true };
    case ProcessFormWizardActionTypes.NOT_SUBMITTING:
      return { ...state, isSubmitting: false };
    case ProcessFormWizardActionTypes.LOAD_MASTER_DATA:
      return { ...state, processMasterData: null };
    case ProcessFormWizardActionTypes.LOAD_MASTER_DATA_SUCCESS:
      return { ...state, processMasterData: action.payload };
    case ProcessFormWizardActionTypes.LOAD_DETAIL_DATA_SUCCESS:
      return { ...state, processDetailData: action.payload };
    case ProcessFormWizardActionTypes.LOAD_META_DATA_SUCCESS:
      return { ...state, wizardMetaData: action.payload, processMasterData: null, processDetailData: [] };
    default: {
      return state;
    }
  }
}

