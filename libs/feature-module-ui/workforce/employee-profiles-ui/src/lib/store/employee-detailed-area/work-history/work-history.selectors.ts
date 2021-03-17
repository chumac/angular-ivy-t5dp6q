import { createSelector} from '@ngrx/store';
import { IEmployeesProfileState, getEmployeesProfileState } from '../../root/employees-profile.state';


import { IHRWorkHistoryState } from './work-history.state';

export const getHRWorkHistoryState = createSelector(
  getEmployeesProfileState,
  (state: IEmployeesProfileState) => state.workHistory
);

export const isProcessingHRWorkHistory= createSelector(
  getHRWorkHistoryState,
  (state: IHRWorkHistoryState) => state.isProcessing
);

export const showEditorHRWorkHistory= createSelector(
  getHRWorkHistoryState,
  (state: IHRWorkHistoryState) => state.showEditor
);

export const showViewerHRWorkHistory= createSelector(
  getHRWorkHistoryState,
  (state: IHRWorkHistoryState) => state.showViewer
);

export const getHRWorkHistoryApprovedData = createSelector(
  getHRWorkHistoryState,
  (state: IHRWorkHistoryState) => state.approvedData
);

export const getHRWorkHistoryAwaitingApprovalData = createSelector(
  getHRWorkHistoryState,
  (state: IHRWorkHistoryState) => state.awaitingApprovalData
);

export const getHRWorkHistoryDocument = createSelector(
  getHRWorkHistoryState,
  (state: IHRWorkHistoryState) => state.document
);

// export const getWorkHistoryInlineDocument = createSelector(
//   getWorkHistoryState,
//   (state: IWorkHistoryState) => state.inlineDocument
// );
