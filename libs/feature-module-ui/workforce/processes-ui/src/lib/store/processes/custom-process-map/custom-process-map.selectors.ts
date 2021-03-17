import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ICustomProcessMapState } from './custom-process-map.state';
import { getProcessesState, IProcessesState } from '../../root/processes.state';

export const getCustomProcessMapState = createSelector(
  getProcessesState,
  (state: IProcessesState) => state.customProcessMap
);

export const isProcessingCustomProcessMap = createSelector(
  getCustomProcessMapState,
  (state: ICustomProcessMapState) => state.isProcessing
);

export const showEditorCustomProcessMap = createSelector(
  getCustomProcessMapState,
  (state: ICustomProcessMapState) => state.showEditor
);

export const showViewerCustomProcessMap = createSelector(
  getCustomProcessMapState,
  (state: ICustomProcessMapState) => state.showViewer
);

export const getCustomProcessMapData = createSelector(
  getCustomProcessMapState,
  (state: ICustomProcessMapState) => state.customProcessMapData
);

export const getProcessFormRoles = createSelector(
  getCustomProcessMapState,
  (state: ICustomProcessMapState) => state.roles
);

export const getProcessFormEmpPermissions = createSelector(
  getCustomProcessMapState,
  (state: ICustomProcessMapState) => state.empPermissions
);

export const getProcessFormCustomFormList = createSelector(
  getCustomProcessMapState,
  (state: ICustomProcessMapState) => state.customFormList
);
