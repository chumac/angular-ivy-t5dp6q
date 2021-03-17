
import {
  HrReboardComprehensiveDataActionTypes,
  HrReboardComprehensiveDataActions
} from './hr-reboard-comprehensive-data.actions';
import {
  initialHrReboardComprehensiveDataState,
  IHrReboardComprehensiveDataState
} from './hr-reboard-comprehensive-data.state';
import { IComprehensiveData } from '@nutela/models/workforce/employee-profiles';

export function hrReboardComprehensiveDataReducer(
  state = initialHrReboardComprehensiveDataState,
  action: HrReboardComprehensiveDataActions
): IHrReboardComprehensiveDataState {
  switch (action.type) {
    case HrReboardComprehensiveDataActionTypes.LOAD_DATA_SUCCESS:
      return Object.assign({}, <IComprehensiveData>action.payload);
    case HrReboardComprehensiveDataActionTypes.RESET_DATA:
      return {}
    default: {
      return state;
    }
  }
}
