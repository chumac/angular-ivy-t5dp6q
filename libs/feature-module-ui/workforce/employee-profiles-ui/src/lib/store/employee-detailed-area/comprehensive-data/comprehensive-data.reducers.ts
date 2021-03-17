
import {
  ComprehensiveDataActionTypes,
  ComprehensiveDataActions,
  LoadComprehensiveDataSuccess
} from './comprehensive-data.actions';
import {
  initialComprehensiveDataState,
  IComprehensiveDataState
} from './comprehensive-data.state';
import { IComprehensiveData } from '@nutela/models/workforce/employee-profiles';

export function comprehensiveDataReducer(
  state = initialComprehensiveDataState,
  action: ComprehensiveDataActions
): IComprehensiveDataState {
  switch (action.type) {
    case ComprehensiveDataActionTypes.HR_LOAD_SUCCESS:
      return Object.assign({}, <IComprehensiveData>action.payload);
    case ComprehensiveDataActionTypes.HR_RESET_DATA:
      return {}
    default: {
      return state;
    }
  }
}
