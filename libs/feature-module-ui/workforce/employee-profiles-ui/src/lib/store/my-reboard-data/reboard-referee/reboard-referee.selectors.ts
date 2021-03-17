import { createSelector } from '@ngrx/store';
import { IReboardRefereeState } from './reboard-referee.state';
import { getEmployeesProfileState, IEmployeesProfileState } from 'libs/feature-module-ui/workforce/employee-profiles-ui/src/lib/store/root/employees-profile.state';

export const getReboardRefereeState = createSelector(
  getEmployeesProfileState,
  (state: IEmployeesProfileState) => state.reboardReferee
);

export const isProcessingReboardReferee = createSelector(
  getReboardRefereeState,
  (state: IReboardRefereeState) => state.isProcessing
);

export const showEditorReboardReferee = createSelector(
  getReboardRefereeState,
  (state: IReboardRefereeState) => state.showEditor
);

export const showViewerReboardReferee = createSelector(
  getReboardRefereeState,
  (state: IReboardRefereeState) => state.showViewer
);

export const getReboardRefereeData = createSelector(
  getReboardRefereeState,
  (state: IReboardRefereeState) => state.data
);

export const getReboardRefereeDocument = createSelector(
  getReboardRefereeState,
  (state: IReboardRefereeState) => state.document
);

export const getReboardRefereeInlineDocument = createSelector(
  getReboardRefereeState,
  (state: IReboardRefereeState) => state.inlineDocument
);

export const getReboardRefereePhoto = createSelector(
  getReboardRefereeState,
  (state: IReboardRefereeState) => state.photo
);
