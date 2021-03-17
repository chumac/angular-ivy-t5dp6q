import { createSelector, createFeatureSelector } from '@ngrx/store';

import { INewEmployeeState } from './new-employee.state';
import { IProvisioningState } from '../root';

const getRootState = createFeatureSelector<IProvisioningState>('provisioning');
const getProvisioningState = createSelector(getRootState, (state: IProvisioningState) => state.newEmployee);


export const isProcessingNewEmployee = createSelector(
  getProvisioningState,
  (state: INewEmployeeState) => state.isProcessing
);

export const isLoadingNewEmployee = createSelector(
  getProvisioningState,
  (state: INewEmployeeState) => state.isLoading
);

export const showEditorNewEmployee = createSelector(
  getProvisioningState,
  (state: INewEmployeeState) => state.showEditor
);

export const showEditorProvisionedEmployee = createSelector(
  getProvisioningState,
  (state: INewEmployeeState) => state.showProvisionedEditor
);

export const showTreeNewEmployee = createSelector(
  getProvisioningState,
  (state: INewEmployeeState) => state.showTree
);

export const showViewerNewEmployee = createSelector(
  getProvisioningState,
  (state: INewEmployeeState) => state.showViewer
);

export const getProvisionedData = createSelector(
  getProvisioningState,
  (state: INewEmployeeState) => state.provisionedData
);

export const getStaffCategories = createSelector(
  getProvisioningState,
  (state: INewEmployeeState) => state.staffCategoryList
);

export const getDesignations = createSelector(
  getProvisioningState,
  (state: INewEmployeeState) => state.designationList
);

export const getPositions = createSelector(
  getProvisioningState,
  (state: INewEmployeeState) => state.positionList
);
export const getRecordCategories = createSelector(
  getProvisioningState,
  (state: INewEmployeeState) => state.recordCategories
);
export const getEmailsTo = createSelector(
  getProvisioningState,
  (state: INewEmployeeState) => state.sendEmailTo
);
export const getUserTypes = createSelector(
  getProvisioningState,
  (state: INewEmployeeState) => state.userTypes
);

export const getEnterpriseStructureTypes = createSelector(
  getProvisioningState,
  (state: INewEmployeeState) => state.structureTypeList
);

export const getEnterpriseStructureDetails = createSelector(
  getProvisioningState,
  (state: INewEmployeeState) => state.structureDetailsList
);

export const getCostCenters = createSelector(
  getProvisioningState,
  (state: INewEmployeeState) => state.costCentersList
);

export const getUsername = createSelector(
  getProvisioningState,
  (state: INewEmployeeState) => state.username
);

export const getStaffNumber = createSelector(
  getProvisioningState,
  (state: INewEmployeeState) => state.staffNumber
);

export const getPayGroup = createSelector(
  getProvisioningState,
  (state: INewEmployeeState) => state.paygroupList
);

export const getPaygrade = createSelector(
  getProvisioningState,
  (state: INewEmployeeState) => state.paygradeList
);

export const showEditorRoleSelect = createSelector(
  getProvisioningState,
  (state: INewEmployeeState) => state.showRoleSelect
);

export const getRoleData = createSelector(
  getProvisioningState,
  (state: INewEmployeeState) => state.rolesList
);

export const getSelectedRoles = createSelector(
  getProvisioningState,
  (state: INewEmployeeState) => state.selectedRoles
);
