import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IEducationalInstitutionState } from './educational-institution.state';
import { ILookupState } from '../../store';


const getState = createFeatureSelector<ILookupState>('hr-lookup');
const getEducationalInstitutionState = createSelector(getState, (state: ILookupState) => state.educationalInstitution);

export const getEducationalInstitution= createSelector(
  getEducationalInstitutionState,
  (state: IEducationalInstitutionState) => state.institutionData
);

export const getProfessionalInstitution= createSelector(
  getEducationalInstitutionState,
  (state: IEducationalInstitutionState) => state.professionalData
);

export const isProcessingEducationalInstitution = createSelector(
  getEducationalInstitutionState,
  (state: IEducationalInstitutionState) => state.isProcessing
);
export const showEditorEducationalInstitution= createSelector(
  getEducationalInstitutionState,
  (state: IEducationalInstitutionState) => state.showEditor
);

export const getNationEducationalInstitution = createSelector(
  getEducationalInstitutionState,
  (state: IEducationalInstitutionState) => state.nationality
);

export const getStateEducationalInstitution= createSelector(
  getEducationalInstitutionState,
  (state: IEducationalInstitutionState) => state.stateData
);

