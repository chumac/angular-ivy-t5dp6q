import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IOptionsState } from './option.state';
import { IHRFoundationState } from '../root';

const getState = createFeatureSelector<IHRFoundationState>('hr-foundations');
const getOptionsState = createSelector(getState, (state: IHRFoundationState) => state.Options);

export const isProcessingOption = createSelector(
  getOptionsState,
  (state: IOptionsState) => state.isProcessing
);

export const showEditorOptions = createSelector(
  getOptionsState,
  (state: IOptionsState) => state.showEditor
);

export const getCustomOptionsData = createSelector(
  getOptionsState,
  (state: IOptionsState) => state.customData
);

export const getGlobalOptionsData = createSelector(
  getOptionsState,
  (state: IOptionsState) => state.globalData
);



