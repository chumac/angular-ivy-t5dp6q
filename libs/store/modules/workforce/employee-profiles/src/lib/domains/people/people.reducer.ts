import { PeopleActions, PeopleActionTypes } from './people.actions';
import { initialPeopleState, IPeopleState } from './people.state';

export function peopleReducer(
  state = initialPeopleState,
  action: PeopleActions
): IPeopleState {
  switch (action.type) {
    case PeopleActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, peopleData: action.payload };
    case PeopleActionTypes.SHOW_VIEWER_PEOPLE:
      return { ...state, showViewer: true };
    case PeopleActionTypes.HIDE_VIEWER_PEOPLE:
      return { ...state, showViewer: false };

    case PeopleActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case PeopleActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };

    case PeopleActionTypes.LOADING_DATA_PEOPLE:
      return { ...state, isLoading: true };
    case PeopleActionTypes.NOT_LOADING_DATA_PEOPLE:
      return { ...state, isLoading: false };

    case PeopleActionTypes.RESET_PEOPLE:
      return { ...state, peopleData: [] };

    default: {
      return state;
    }
  }
}
