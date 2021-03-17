import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IEcosystem360State } from './ecosystem360.state';
import { IEcosystem360 } from '@nutela/models/talent/performance';
import { getPerformanceState, IPerformanceState } from '../../root/performance.state';

export const getEcosystem360State = createSelector(
  getPerformanceState,
  (state: IPerformanceState) => state.ecosystem360Setup
);

export const isProcessingEcosystem360 = createSelector(
  getEcosystem360State,
  (state: IEcosystem360State) => state.isProcessing
);

export const isProcessingGridEcosystem360 = createSelector(
  getEcosystem360State,
  (state: IEcosystem360State) => state.isProcessingGrid
);

export const isProcessingUploadEcosystem360 = createSelector(
  getEcosystem360State,
  (state: IEcosystem360State) => state.isProcessingUpload
);

export const showEditorEcosystem360 = createSelector(
  getEcosystem360State,
  (state: IEcosystem360State) => state.showEditor
);

export const showViewerEcosystem360 = createSelector(
  getEcosystem360State,
  (state: IEcosystem360State) => state.showViewer
);

export const getEcosystem360Data = createSelector(
  getEcosystem360State,
  (state: IEcosystem360State) => state.ecosystem360Data
);

export const getEcosystem360Document = createSelector(
  getEcosystem360State,
  (state: IEcosystem360State) => state.document
);

export const getEcosystem360PlanList = createSelector(
  getEcosystem360State,
  (state: IEcosystem360State) => state.planList
);

export const getEcosystem360EmployeeList = createSelector(
  getEcosystem360State,
  (state: IEcosystem360State) => state.employeeList
);