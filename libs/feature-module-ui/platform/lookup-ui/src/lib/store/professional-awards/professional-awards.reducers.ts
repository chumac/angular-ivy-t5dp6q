import { initialProfessionalAwardsState, IProfessionalAwardsState } from './professional-awards.state';
import { ProfessionalAwardsActions, ProfessionalAwardsActionTypes } from './professional-awards.actions';

export function professionalAwardsReducer(
  state = initialProfessionalAwardsState,
  action: ProfessionalAwardsActions
): IProfessionalAwardsState {
  switch (action.type) {
    case ProfessionalAwardsActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case ProfessionalAwardsActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case ProfessionalAwardsActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case ProfessionalAwardsActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case ProfessionalAwardsActionTypes.LOAD_AWARD_DATA_SUCCESS:
      return { ...state, awardData: action.payload };
    default: {
      return state;
    }
  }
}
