import { createSelector} from '@ngrx/store';
import { IEmployeesProfileState, getEmployeesProfileState } from '../../root/employees-profile.state';


import { IDependantState } from './dependant.state';



export const getDependantsState = createSelector(
  getEmployeesProfileState,
  (state: IEmployeesProfileState) => state.dependants
);

export const isProcessingDependant = createSelector(
  getDependantsState,
  (state: IDependantState) => state.isProcessing
);

export const showEditorDependant = createSelector(
  getDependantsState,
  (state: IDependantState) => state.showEditor
);

export const showViewerDependant = createSelector(
  getDependantsState,
  (state: IDependantState) => state.showViewer
);

export const getDependantStateList = createSelector(
  getDependantsState,
  (state: IDependantState) => state.stateList
);

export const getDependantCityList = createSelector(
  getDependantsState,
  (state: IDependantState) => state.cityList
);

export const getDependantApprovedData = createSelector(
  getDependantsState,
  (state: IDependantState) => state.approvedData
);

export const getDependantAwaitingApprovalData = createSelector(
  getDependantsState,
  (state: IDependantState) => state.awaitingApprovalData
);

export const getDependantApprovedDataMap = createSelector(getDependantsState, (state: IDependantState) => state.approvedDataMap);

export const getDependantApprovedPhoto = createSelector(
  getDependantsState,
  (state: IDependantState) => state.approvedPhoto
);

export const getDependantAwaitingApprovalPhoto = createSelector(
  getDependantsState,
  (state: IDependantState) => state.awaitingApprovalPhoto
);
