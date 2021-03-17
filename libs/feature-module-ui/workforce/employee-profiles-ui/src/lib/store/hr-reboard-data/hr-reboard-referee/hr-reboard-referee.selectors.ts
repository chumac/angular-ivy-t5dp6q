import { createSelector } from '@ngrx/store';
import { IHrReboardRefereeState } from './hr-reboard-referee.state';
import { getEmployeesProfileState, IEmployeesProfileState } from 'libs/feature-module-ui/workforce/employee-profiles-ui/src/lib/store/root/employees-profile.state';

export const getHrReboardRefereeState = createSelector(
  getEmployeesProfileState,
  (state: IEmployeesProfileState) => state.hrReboardReferee
);

export const isProcessingHrReboardReferee = createSelector(
  getHrReboardRefereeState,
  (state: IHrReboardRefereeState) => state.isProcessing
);

export const showEditorHrReboardReferee = createSelector(
  getHrReboardRefereeState,
  (state: IHrReboardRefereeState) => state.showEditor
);

export const showViewerHrReboardReferee = createSelector(
  getHrReboardRefereeState,
  (state: IHrReboardRefereeState) => state.showViewer
);

export const getHrReboardRefereeData = createSelector(
  getHrReboardRefereeState,
  (state: IHrReboardRefereeState) => state.data
);

export const getHrReboardRefereeDocument = createSelector(
  getHrReboardRefereeState,
  (state: IHrReboardRefereeState) => state.document
);

export const getHrReboardRefereeInlineDocument = createSelector(
  getHrReboardRefereeState,
  (state: IHrReboardRefereeState) => state.inlineDocument
);

export const getHrReboardRefereePhoto = createSelector(
  getHrReboardRefereeState,
  (state: IHrReboardRefereeState) => state.photo
);
