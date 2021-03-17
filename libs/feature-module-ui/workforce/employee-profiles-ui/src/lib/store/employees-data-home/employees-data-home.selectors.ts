import { createSelector } from '@ngrx/store';
import { IEmployeesDataHomeState } from './employees-data-home.state';
import { getEmployeesProfileState, IEmployeesProfileState } from '../root';

export const getEmployeesDataHomeState = createSelector(
  getEmployeesProfileState,
  (state: IEmployeesProfileState) => state.employeesDataHome
);

export const getEmployeesChartData = createSelector(
  getEmployeesDataHomeState,
  (state: IEmployeesDataHomeState) => state.chartData
  );

export const getActiveEmployeesData = createSelector(
  getEmployeesDataHomeState,
  (state: IEmployeesDataHomeState) => state.activeEmployees
);

export const getActiveReboardEmployeesData = createSelector(
  getEmployeesDataHomeState,
  (state: IEmployeesDataHomeState) => state.activeReboardEmployees
);

export const getInactiveEmployeesData = createSelector(
  getEmployeesDataHomeState,
  (state: IEmployeesDataHomeState) => state.inactiveEmployees
);

export const getMyReboardDetails = createSelector(
  getEmployeesDataHomeState,
  (state: IEmployeesDataHomeState) => state.myReboardDetails
);

export const getReboardEmployeeDetails = createSelector(
  getEmployeesDataHomeState,
  (state: IEmployeesDataHomeState) => state.employeeReboardDetails
);

export const getReboardWorkflowMessage = createSelector(
  getEmployeesDataHomeState,
  (state: IEmployeesDataHomeState) => state.reboardWorkflowMessage
);

export const isLoadingEmployeeData = createSelector(
  getEmployeesDataHomeState,
  (state: IEmployeesDataHomeState) => state.isLoading
);

export const isProcessingRetrieve = createSelector(
  getEmployeesDataHomeState,
  (state: IEmployeesDataHomeState) => state.isProcessingRetrieve
);

export const isProcessingStart = createSelector(
  getEmployeesDataHomeState,
  (state: IEmployeesDataHomeState) => state.isProcessingStart
);

export const isProcessingCancel = createSelector(
  getEmployeesDataHomeState,
  (state: IEmployeesDataHomeState) => state.isProcessingCancel
);

export const isProcessingMyCancel = createSelector(
  getEmployeesDataHomeState,
  (state: IEmployeesDataHomeState) => state.isProcessingMyCancel
);

export const isProcessingDecline = createSelector(
  getEmployeesDataHomeState,
  (state: IEmployeesDataHomeState) => state.isProcessingDecline
);

export const getSelectedEmployeeDataSummary = createSelector(
  getEmployeesDataHomeState,
  (state: IEmployeesDataHomeState) => state.selectedEmployeeSummary
);

export const getSelectedEmployeeProfilePicture = createSelector(
  getEmployeesDataHomeState,
  (state: IEmployeesDataHomeState) => state.selectedEmployeeProfilePicture
);

export const showViewerEmployeeDataSummary = createSelector(
  getEmployeesDataHomeState,
  (state: IEmployeesDataHomeState) => state.showViewer
);
