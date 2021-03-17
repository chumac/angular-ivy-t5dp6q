import { initialSystemState, ISystemState } from './system.state';
import { SystemActions, SystemActionTypes } from './system.actions';

export function systemReducer(
  state = initialSystemState,
  action: SystemActions
): ISystemState {
  switch (action.type) {
    case SystemActionTypes.LOAD_SYSTEM_DATA_SUCCESS:
      return { ...state, systemData: action.payload };
    case SystemActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case SystemActionTypes.NOT_PROCESSING:
        return { ...state, isProcessing: false };
    default: {
      return state;
    }
  }
}
