import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IProfessionalAwardsState } from './professional-awards.state';
import { ILookupState } from '../../store';


const getState = createFeatureSelector<ILookupState>('hr-lookup');
const getProfessionalAwardsState = createSelector(getState, (state: ILookupState) => state.professionalAward);

export const getProfessionalAwards = createSelector(
  getProfessionalAwardsState,
  (state: IProfessionalAwardsState) => state.awardData
);

export const isProcessingProfessionalAwards = createSelector(
  getProfessionalAwardsState,
  (state: IProfessionalAwardsState) => state.isProcessing
);

export const showEditorProfessionalAwards = createSelector(
  getProfessionalAwardsState,
  (state: IProfessionalAwardsState) => state.showEditor
);


