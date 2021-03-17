
import {
  ComprehensiveDataActionTypes,
  ComprehensiveDataActions,
  ComprehensiveDataLoadSuccess
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
    case ComprehensiveDataActionTypes.LOAD_SUCCESS:
      return Object.assign({}, <IComprehensiveData>action.payload);
    case ComprehensiveDataActionTypes.LOAD_FAILURE:
      return state;
    default: {
      return state;
    }
  }
}
