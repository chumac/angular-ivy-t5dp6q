import { initialOrganizationState, IOrganizationState } from './organization.state';
import { OrganizationActions, OrganizationActionTypes } from './organization.actions';

export function organizationReducer(
  state = initialOrganizationState,
  action: OrganizationActions
): IOrganizationState {
  switch (action.type) {
    case OrganizationActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case OrganizationActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case OrganizationActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case OrganizationActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case OrganizationActionTypes.LOAD_ORGANIZATION_DATA_SUCCESS:
      return { ...state, organizationData: action.payload }
    case OrganizationActionTypes.LOAD_STATES_READY:
      return { ...state, stateList: action.payload.stateList, cityList: []};
    case OrganizationActionTypes.LOAD_CITIES_READY:
      return { ...state, cityList: action.payload.cityList };
    default: {
      return state;
    }
  }
}
