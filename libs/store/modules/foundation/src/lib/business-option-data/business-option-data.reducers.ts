
import { initialBusinessOptionDataState, IBusinessOptionDataState } from './business-option-data.state';
import {
  BusinessOptionDataActions,
  BusinessOptionDataActionTypes
} from './business-option-data.actions';

export function businessOptionReducer(
  state = initialBusinessOptionDataState,
  action: BusinessOptionDataActions
): IBusinessOptionDataState {
  switch (action.type) {
    case BusinessOptionDataActionTypes.LOAD_SUCCESS:
      return { ...state, options: action.payload.options };
    default: {
      return state;
    }
  }
}
