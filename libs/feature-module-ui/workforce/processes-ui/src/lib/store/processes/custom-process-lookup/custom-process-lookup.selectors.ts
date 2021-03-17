import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ICustomProcessLookupState } from './custom-process-lookup.state';
import { getProcessesState, IProcessesState } from '../../root/processes.state';

export const getCustomProcessLookupState = createSelector(
  getProcessesState,
  (state: IProcessesState) => state.customProcessLookup
);

export const isProcessingCustomProcessLookup = createSelector(
  getCustomProcessLookupState,
  (state: ICustomProcessLookupState) => state.isProcessing
);

export const isInitiatingCustomProcessLookup = createSelector(
  getCustomProcessLookupState,
  (state: ICustomProcessLookupState) => state.isInitiating
);

export const showEditorCustomProcessLookup = createSelector(
  getCustomProcessLookupState,
  (state: ICustomProcessLookupState) => state.showEditor
);

export const showViewerCustomProcessLookup = createSelector(
  getCustomProcessLookupState,
  (state: ICustomProcessLookupState) => state.showViewer
);

export const getCustomProcessLookupData = createSelector(
  getCustomProcessLookupState,
  (state: ICustomProcessLookupState) => state.customProcessLookupData
);

export const getCustomProcessLookupMasterId = createSelector(
  getCustomProcessLookupState,
  (state: ICustomProcessLookupState) => state.currentMasterId
);

export const getCustomProcessLookupUserMetaData = createSelector(
  getCustomProcessLookupState,
  (state: ICustomProcessLookupState) => state.userMetaData
);

export const getCustomProcessLookupTeamMembers = createSelector(
  getCustomProcessLookupState,
  (state: ICustomProcessLookupState) => state.teamMembers
);

