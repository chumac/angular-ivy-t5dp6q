import { initialEducationalInstitutionState, IEducationalInstitutionState } from './educational-institution.state';
import { EducationalInstitutionActions, EducationalInstitutionActionTypes } from './educational-institution.actions';

export function educationalInstitutionReducer(
  state = initialEducationalInstitutionState,
  action: EducationalInstitutionActions
): IEducationalInstitutionState {
  switch (action.type) {
    case EducationalInstitutionActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case EducationalInstitutionActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case EducationalInstitutionActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case EducationalInstitutionActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case EducationalInstitutionActionTypes.LOAD_EDUCATIONAL_INSTITUTION_DATA_SUCCESS:
      return { ...state, institutionData: action.payload };
    case EducationalInstitutionActionTypes.LOAD_PROFESSIONAL_INSTITUTION_DATA_SUCCESS:
      return { ...state, professionalData: action.payload };
    case EducationalInstitutionActionTypes.LOAD_NATIONALITY_DATA_SUCCESS:
      return { ...state, nationality: action.payload};
    case EducationalInstitutionActionTypes.LOAD_STATE_DATA_SUCCESS:
      return { ...state, stateData:action.payload };
    default: {
      return state;
    }
  }
}
