import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IWorkDetailsState } from './work-details.state';
import { IHRFoundationState } from '../root';

const getState = createFeatureSelector<IHRFoundationState>('hr-foundations');
const getWorkDetailsState = createSelector(getState, (state: IHRFoundationState) => state.workDetails);




export const isProcessingWorkDetails = createSelector(
  getWorkDetailsState,
  (state: IWorkDetailsState) => state.isProcessing
);

export const isLoadingWorkDetails = createSelector(
  getWorkDetailsState,
  (state: IWorkDetailsState) => state.isLoading
);

export const showEditorWorkDetails = createSelector(
  getWorkDetailsState,
  (state: IWorkDetailsState) => state.showEditor
);

export const showViewerWorkDetails = createSelector(
  getWorkDetailsState,
  (state: IWorkDetailsState) => state.showViewer
);


export const getWorkDetailsData = createSelector(
  getWorkDetailsState,
  (state: IWorkDetailsState) => state.workDetailsData
);

export const getProcessingRule = createSelector(
  getWorkDetailsState,
  (state: IWorkDetailsState) => state.processingRule
);

