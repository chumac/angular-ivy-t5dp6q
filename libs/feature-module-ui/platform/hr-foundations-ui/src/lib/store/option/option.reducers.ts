import { initialOptionsState, IOptionsState } from './option.state';
import { OptionActions, OptionActionTypes } from './option.actions';

export function optionReducer(
  state = initialOptionsState,
  action: OptionActions
): IOptionsState {
  switch (action.type) {
    case OptionActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case OptionActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case OptionActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case OptionActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case OptionActionTypes.LOAD_CUSTOM_APPROVED_DATA_SUCCESS:
      return { ...state, customData: action.payload };
      case OptionActionTypes.LOAD_GLOBAL_APPROVED_DATA_SUCCESS:
      return { ...state, globalData: action.payload };
    default: {
      return state;
    }
  }
}
