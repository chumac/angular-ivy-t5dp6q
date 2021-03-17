import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IEmailState } from './email.state';
import { IHRFoundationState } from '../root';

const getState = createFeatureSelector<IHRFoundationState>('hr-foundations');
const getEmailState = createSelector(getState, (state: IHRFoundationState) => state.email);

export const getEmailData = createSelector(
  getEmailState,
  (state: IEmailState) => state.emailData
);


