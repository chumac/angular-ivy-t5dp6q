import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IProcessFormWizardState } from './process-form-wizard.state';
import { getProcessesState, IProcessesState } from '../../root/processes.state';

export const getProcessFormWizardState = createSelector(
  getProcessesState,
  (state: IProcessesState) => state.processFormWizard
);

export const isProcessingProcessFormWizard = createSelector(
  getProcessFormWizardState,
  (state: IProcessFormWizardState) => state.isProcessing
);

export const isProcessingMasterProcessFormWizard = createSelector(
  getProcessFormWizardState,
  (state: IProcessFormWizardState) => state.isProcessingMaster
);

export const isProcessingDetailProcessFormWizard = createSelector(
  getProcessFormWizardState,
  (state: IProcessFormWizardState) => state.isProcessingDetail
);

export const isSavingProcessFormWizard = createSelector(
  getProcessFormWizardState,
  (state: IProcessFormWizardState) => state.isSaving
);

export const isCompletingProcessFormWizard = createSelector(
  getProcessFormWizardState,
  (state: IProcessFormWizardState) => state.isCompleting
);

export const isSubmittingProcessFormWizard = createSelector(
  getProcessFormWizardState,
  (state: IProcessFormWizardState) => state.isSubmitting
);

export const showEditorProcessFormWizard = createSelector(
  getProcessFormWizardState,
  (state: IProcessFormWizardState) => state.showEditor
);

export const showViewerProcessFormWizard = createSelector(
  getProcessFormWizardState,
  (state: IProcessFormWizardState) => state.showViewer
);

export const getProcessFormWizardMasterData = createSelector(
  getProcessFormWizardState,
  (state: IProcessFormWizardState) => state.processMasterData
);

export const getProcessFormWizardDetailData = createSelector(
  getProcessFormWizardState,
  (state: IProcessFormWizardState) => state.processDetailData
);


export const getProcessFormWizardMetaData = createSelector(
  getProcessFormWizardState,
  (state: IProcessFormWizardState) => state.wizardMetaData
);

