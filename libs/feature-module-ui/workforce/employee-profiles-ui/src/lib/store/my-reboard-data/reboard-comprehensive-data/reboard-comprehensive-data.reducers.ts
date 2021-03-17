
import {
  ReboardComprehensiveDataActionTypes,
  ReboardComprehensiveDataActions
} from './reboard-comprehensive-data.actions';
import {
  initialReboardComprehensiveDataState,
  IReboardComprehensiveDataState
} from './reboard-comprehensive-data.state';
import { IComprehensiveData } from '@nutela/models/workforce/employee-profiles';

export function reboardComprehensiveDataReducer(
  state = initialReboardComprehensiveDataState,
  action: ReboardComprehensiveDataActions
): IReboardComprehensiveDataState {
  switch (action.type) {
    case ReboardComprehensiveDataActionTypes.LOAD_DATA_SUCCESS:
      return Object.assign({}, <IComprehensiveData>action.payload);
    case ReboardComprehensiveDataActionTypes.RESET_DATA:
      return {}
    default: {
      return state;
    }
  }
}
