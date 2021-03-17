import { initialDisbursementsState, IDisbursementsState } from "./disbursements.state";
import { DisbursementsActions, DisbursementsActionTypes } from "./disbursements.actions";

export function disbursementsReducer(
  state = initialDisbursementsState,
  action: DisbursementsActions
): IDisbursementsState {
  switch (action.type) {
    case DisbursementsActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case DisbursementsActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };

    case DisbursementsActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case DisbursementsActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };

    case DisbursementsActionTypes.PROCESSING_DISBURSEMENTS:
      return { ...state, isProcessing: true };
    case DisbursementsActionTypes.NOT_PROCESSING_DISBURSEMENTS:
      return { ...state, isProcessing: false };

    case DisbursementsActionTypes.LOADING_DISBURSEMENTS:
      return { ...state, isLoading: true };
    case DisbursementsActionTypes.NOT_LOADING_DISBURSEMENTS:
      return { ...state, isLoading: false };

    case DisbursementsActionTypes.LOAD_DATA_LOAN_DISBURSEMENTS_SUCCESS:
      return { ...state, disbursementsData: action.payload
      };

    case DisbursementsActionTypes.LOAD_DATA_LOAN_DISBURSED_SUCCESS:
      return { ...state, disbursedData: action.payload };


    case DisbursementsActionTypes.LOAD_DATA_LOAN_DEFINITIONS_SUCCESS:
      return { ...state, loanDefinitions: action.payload };
    default: {
      return state;
    }
  }
}
