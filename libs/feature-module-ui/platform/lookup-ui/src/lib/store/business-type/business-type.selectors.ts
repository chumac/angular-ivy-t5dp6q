import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IBusinessTypeState } from './business-type.state';
import { ILookupState } from '../../store';


const getState = createFeatureSelector<ILookupState>('hr-lookup');
const getBusinessTypeState = createSelector(getState, (state: ILookupState) => state.businessType);

export const getBusinessType = createSelector(
  getBusinessTypeState,
  (state: IBusinessTypeState) => state.businessData
);


export const showEditorBusinessType = createSelector(
  getBusinessTypeState,
  (state: IBusinessTypeState) => state.showEditor
);


export const isProcessingBusinessType = createSelector(
  getBusinessTypeState,
  (state: IBusinessTypeState) => state.isProcessing
);

