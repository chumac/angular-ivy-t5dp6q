import { initialTeamProcessTransactionState, ITeamProcessTransactionState } from './team-process-transaction.state';
import { TeamProcessTransactionActions, TeamProcessTransactionActionTypes } from './team-process-transaction.actions';

export function teamProcessTransactionReducer(
  state = initialTeamProcessTransactionState,
  action: TeamProcessTransactionActions
): ITeamProcessTransactionState {
  switch (action.type) {
    case TeamProcessTransactionActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case TeamProcessTransactionActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case TeamProcessTransactionActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case TeamProcessTransactionActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case TeamProcessTransactionActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case TeamProcessTransactionActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case TeamProcessTransactionActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, teamProcessTransactionData: action.payload };
    case TeamProcessTransactionActionTypes.LOAD_AREA_SUCCESS:
      return { ...state, area: action.payload };
    case TeamProcessTransactionActionTypes.REMOVE_DATA:
      return { ...state, teamProcessTransactionData: state.teamProcessTransactionData.filter(item => item.id !== action.payload.recordId) };
    default: {
      return state;
    }
  }
}

