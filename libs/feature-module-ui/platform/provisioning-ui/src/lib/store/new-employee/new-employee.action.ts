import { Action } from '@ngrx/store';
import { ISelectOption } from '@nutela/models/core-data';
import { IRolesTransform, IRoles, IProvisioning, IEnterpriseStructureType, IStaffCategory, IAnalysisDetail } from '../../models/interfaces';


export enum NewEmployeeActionTypes {
  SHOW_EDITOR = '[HR PROVISIONING DATA - EMPLOYEE DETAIL] Show Editor',
  HIDE_EDITOR = '[HR PROVISIONING DATA - EMPLOYEE DETAIL] Hide Editor',

  SHOW_TREE = '[HR PROVISIONING DATA - EMPLOYEE DETAIL] Show Tree',
  HIDE_TREE = '[HR PROVISIONING DATA - EMPLOYEE DETAIL] Hide Tree',

  SHOW_PROVISIONED_EDITOR = '[HR PROVISIONING DATA - EMPLOYEE DETAIL] Show Provisioned Editor',
  HIDE_PROVISIONED_EDITOR = '[HR PROVISIONING DATA - EMPLOYEE DETAIL] Hide Provisioned Editor',

  LOAD_ROLE_DATA = '[HR PROVISIONING - EMPLOYEE ROLE DETAIL] Load Role Data',
  LOAD_ROLE_DATA_SUCCESS = '[HR PROVISIONING - EMPLOYEE ROLE DETAIL] Load Role Data Success',

  SHOW_ROLE_SELECT_EDITOR = '[HR PROVISIONING DATA - EMPLOYEE DETAIL] Show Role Select Editor',
  HIDE_ROLE_SELECT_EDITOR = '[HR PROVISIONING DATA - EMPLOYEE DETAIL] Hide Role Select Editor',

  SHOW_VIEWER = '[HR PROVISIONING DATA - EMPLOYEE DETAIL] Show Viewer',
  HIDE_VIEWER = '[HR PROVISIONING DATA - EMPLOYEE DETAIL] Hide Viewer',

  PROCESSING = '[HR PROVISIONING DATA - EMPLOYEE DETAIL] Processing',
  NOT_PROCESSING = '[HR PROVISIONING DATA - EMPLOYEE DETAIL] Not Processing',

  LOADING = '[HR PROVISIONING DATA - EMPLOYEE DETAIL] Loading',
  NOT_LOADING = '[HR PROVISIONING DATA - EMPLOYEE DETAIL] Not Loading',

  LOAD_SELECTED_ROLES_DATA = '[HR PROVISIONING DATA - EMPLOYEE DETAIL] Load Selected Roles Data',
  LOAD_SELECTED_ROLES_DATA_SUCCESS = '[HR PROVISIONING DATA - EMPLOYEE DETAIL] Load Selected Roles Data Success',

  LOAD_PROVISIONED_DATA = '[HR PROVISIONING DATA - EMPLOYEE DETAIL] Load Employee Data',
  LOAD_PROVISIONED_DATA_SUCCESS = '[HR PROVISIONING DATA - EMPLOYEE DETAIL] Load Employee Data Success',

  LOAD_RECORD_CATEGORIES = '[HR PROVISIONING DATA - EMPLOYEE DETAIL] Load Record Categories',
  LOAD_RECORD_CATEGORIES_SUCCESS = '[HR PROVISIONING DATA - EMPLOYEE DETAIL] Load Record Categories Success',

  LOAD_EMAILS_TO = '[HR PROVISIONING DATA - EMPLOYEE DETAIL] Load Emails To',
  LOAD_EMAILS_TO_SUCCESS = '[HR PROVISIONING DATA - EMPLOYEE DETAIL] Load Emails To Success',

  LOAD_USER_TYPES = '[HR PROVISIONING DATA - EMPLOYEE DETAIL] Load User Types',
  LOAD_USER_TYPES_SUCCESS = '[HR PROVISIONING DATA - EMPLOYEE DETAIL] Load User Types Success',

  LOAD_STAFF_CATEGORIES = '[HR PROVISIONING DATA - EMPLOYEE DETAIL] Load Staff Categories',
  LOAD_STAFF_CATEGORIES_SUCCESS = '[HR PROVISIONING DATA - EMPLOYEE DETAIL] Load Staff Categories Success',

  LOAD_DESIGNATIONS = '[HR PROVISIONING DATA - EMPLOYEE DETAIL] Load Designations',
  LOAD_DESIGNATIONS_SUCCESS = '[HR PROVISIONING DATA - EMPLOYEE DETAIL] Load Designation Success',

  LOAD_EMPLOYEES = '[HR PROVISIONING DATA - EMPLOYEE DETAIL] Load Employees',
  LOAD_EMPLOYEES_SUCCESS = '[HR PROVISIONING DATA - EMPLOYEE DETAIL] Load Employees Success',

  LOAD_ENTERPRISE_STRUCTURE_TYPES = '[HR PROVISIONING DATA - EMPLOYEE DETAIL] Load Enterprise Structure Types',
  LOAD_ENTERPRISE_STRUCTURE_TYPES_SUCCESS = '[HR PROVISIONING DATA - EMPLOYEE DETAIL] Load Enterprise Structure Types Success',

  LOAD_ENTERPRISE_STRUCTURE_DETAILS = '[HR PROVISIONING DATA - EMPLOYEE DETAIL] Load Enterprise Structure Details',
  LOAD_ENTERPRISE_STRUCTURE_DETAILS_SUCCESS = '[HR PROVISIONING DATA - EMPLOYEE DETAIL] Load Enterprise Structure Details Success',

  LOAD_COST_CENTERS = '[HR PROVISIONING DATA - EMPLOYEE DETAIL] Load Cost Centers',
  LOAD_COST_CENTERS_SUCCESS = '[HR PROVISIONING DATA - EMPLOYEE DETAIL] Load Cost Centers Success',

  LOAD_POSITIONS = '[HR PROVISIONING DATA - EMPLOYEE DETAIL] Load Positions',
  LOAD_POSITIONS_SUCCESS = '[HR PROVISIONING DATA - EMPLOYEE DETAIL] Load Positions Success',

  LOAD_PAYGROUPS = '[HR PROVISIONING DATA - EMPLOYEE DETAIL] Load Paygroups',
  LOAD_PAYGROUPS_SUCCESS = '[HR PROVISIONING DATA - EMPLOYEE DETAIL] Load Paygroups Success',

  LOAD_PAYGADES = '[HR PROVISIONING DATA - EMPLOYEE DETAIL] Load Paygrades',
  LOAD_PAYGRADES_SUCCESS = '[HR PROVISIONING DATA - EMPLOYEE DETAIL] Load Paygrades Success',

  LOAD_USERNAME = '[HR PROVISIONING DATA - EMPLOYEE DETAIL] Load Username',
  LOAD_USERNAME_SUCCESS = '[HR PROVISIONING DATA - EMPLOYEE DETAIL] Load Username Success',

  LOAD_STAFF_NUMBER = '[HR PROVISIONING DATA - EMPLOYEE DETAIL] Load Staff Number',
  LOAD_STAFF_NUMBER_SUCCESS = '[HR PROVISIONING DATA - EMPLOYEE DETAIL] Load Staff Number Success',

  SAVE = '[HR PROVISIONING DATA - EMPLOYEE DETAIL] Save',
  SAVE_SUCCESS = '[HR PROVISIONING DATA - EMPLOYEE DETAIL] Save Success',

  SAVE_UPDATED_EMPLOYEE = '[HR PROVISIONING DATA - EMPLOYEE DETAIL] Save Updated Employee',
  SAVE_UPDATED_EMPLOYEE_SUCCESS = '[HR PROVISIONING DATA - EMPLOYEE DETAIL] Save Updated Employee Success',

}

export class ShowEditorNewEmployee implements Action {
  readonly type = NewEmployeeActionTypes.SHOW_EDITOR;
}

export class HideEditorNewEmployee implements Action {
  readonly type = NewEmployeeActionTypes.HIDE_EDITOR;
}

export class ShowTreeNewEmployee implements Action {
  readonly type = NewEmployeeActionTypes.SHOW_TREE;
}

export class HideTreeNewEmployee implements Action {
  readonly type = NewEmployeeActionTypes.HIDE_TREE;
}

export class ShowEditorProvisionedEmployee implements Action {
  readonly type = NewEmployeeActionTypes.SHOW_PROVISIONED_EDITOR;
}

export class HideEditorProvisionedEmployee implements Action {
  readonly type = NewEmployeeActionTypes.HIDE_PROVISIONED_EDITOR;
}

export class LoadRoleData implements Action {
  readonly type = NewEmployeeActionTypes.LOAD_ROLE_DATA;
}

export class LoadRoleDataSuccess implements Action {
  readonly type = NewEmployeeActionTypes.LOAD_ROLE_DATA_SUCCESS;

  constructor(public payload: IRolesTransform[]) {}
}

export class ShowEditorRoleSelect implements Action {
  readonly type = NewEmployeeActionTypes.SHOW_ROLE_SELECT_EDITOR;
}

export class HideEditorRoleSelect implements Action {
  readonly type = NewEmployeeActionTypes.HIDE_ROLE_SELECT_EDITOR;
}

export class ShowViewerNewEmployee implements Action {
  readonly type = NewEmployeeActionTypes.SHOW_VIEWER;
}

export class HideViewerNewEmployee implements Action {
  readonly type = NewEmployeeActionTypes.HIDE_VIEWER;
}

export class ProcessingNewEmployee implements Action {
  readonly type = NewEmployeeActionTypes.PROCESSING;
}

export class NotProcessingNewEmployee implements Action {
  readonly type = NewEmployeeActionTypes.NOT_PROCESSING;
}

export class LoadingNewEmployee implements Action {
  readonly type = NewEmployeeActionTypes.LOADING;
}

export class NotLoadingNewEmployee implements Action {
  readonly type = NewEmployeeActionTypes.NOT_LOADING;
}

export class LoadSelectedRoles implements Action {
  readonly type = NewEmployeeActionTypes.LOAD_SELECTED_ROLES_DATA;

  constructor(public payload: IRoles[]) {}
}

export class LoadSelectedRolesSuccess implements Action {
  readonly type = NewEmployeeActionTypes.LOAD_SELECTED_ROLES_DATA_SUCCESS;

  constructor(public payload: IRoles[]) {}
}

export class LoadProvisionedDataNewEmployee implements Action {
  readonly type = NewEmployeeActionTypes.LOAD_PROVISIONED_DATA;
}

export class LoadProvisionedDataNewEmployeeSuccess implements Action {
  readonly type = NewEmployeeActionTypes.LOAD_PROVISIONED_DATA_SUCCESS;

  constructor(public payload: IProvisioning[]) {}
}

export class SaveNewEmployee implements Action {
  readonly type = NewEmployeeActionTypes.SAVE;

  constructor(public payload: {data: IProvisioning }) {}
}

export class SaveUpdatedEmployee implements Action {
  readonly type = NewEmployeeActionTypes.SAVE_UPDATED_EMPLOYEE;

  constructor(public payload: {data: IProvisioning, provId: number }) {}
}

export class LoadStaffCategories implements Action {
  readonly type = NewEmployeeActionTypes.LOAD_STAFF_CATEGORIES;
}

export class LoadStaffCategoriesSuccess implements Action {
  readonly type = NewEmployeeActionTypes.LOAD_STAFF_CATEGORIES_SUCCESS;

  constructor(public payload: IStaffCategory[]) {}
}

export class LoadDesignations implements Action {
  readonly type = NewEmployeeActionTypes.LOAD_DESIGNATIONS;
}

export class LoadDesignationsSuccess implements Action {
  readonly type = NewEmployeeActionTypes.LOAD_DESIGNATIONS_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}

export class LoadUserTypes implements Action {
  readonly type = NewEmployeeActionTypes.LOAD_USER_TYPES;
}

export class LoadUserTypesSuccess implements Action {
  readonly type = NewEmployeeActionTypes.LOAD_USER_TYPES_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}

export class LoadEmailsTo implements Action {
  readonly type = NewEmployeeActionTypes.LOAD_EMAILS_TO;
}

export class LoadEmailsToSuccess implements Action {
  readonly type = NewEmployeeActionTypes.LOAD_EMAILS_TO_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}

export class LoadRecordCategories implements Action {
  readonly type = NewEmployeeActionTypes.LOAD_RECORD_CATEGORIES;
}

export class LoadRecordCategoriesSuccess implements Action {
  readonly type = NewEmployeeActionTypes.LOAD_RECORD_CATEGORIES_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}

export class LoadPositions implements Action {
  readonly type = NewEmployeeActionTypes.LOAD_POSITIONS;

  constructor(public payload: {designationId: number}) {}
}

export class LoadPositionsSuccess implements Action {
  readonly type = NewEmployeeActionTypes.LOAD_POSITIONS_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}

export class LoadPaygrades implements Action {
  readonly type = NewEmployeeActionTypes.LOAD_PAYGADES;
}

export class LoadPaygradesSuccess implements Action {
  readonly type = NewEmployeeActionTypes.LOAD_PAYGRADES_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}

export class LoadPaygroups implements Action {
  readonly type = NewEmployeeActionTypes.LOAD_PAYGROUPS;

  constructor(public payload: {recordId: number}) {}
}

export class LoadPaygroupsSuccess implements Action {
  readonly type = NewEmployeeActionTypes.LOAD_PAYGROUPS_SUCCESS;

  constructor(public payload:  ISelectOption[]) {}
}

export class LoadUsername implements Action {
  readonly type = NewEmployeeActionTypes.LOAD_USERNAME;

  constructor(public payload: { firstname: string, surname: string, middlename: string }) {}
}

export class LoadUsernameSuccess implements Action {
  readonly type = NewEmployeeActionTypes.LOAD_USERNAME_SUCCESS;

  constructor(public payload: string) {}

}

export class LoadEnterpriseStructurTypes implements Action {
  readonly type = NewEmployeeActionTypes.LOAD_ENTERPRISE_STRUCTURE_TYPES;
}

export class LoadEnterpriseStructurTypesSuccess implements Action {
  readonly type = NewEmployeeActionTypes.LOAD_ENTERPRISE_STRUCTURE_TYPES_SUCCESS;

  constructor(public payload: IEnterpriseStructureType[]) {}

}

export class LoadEnterpriseStructureDetails implements Action {
  readonly type = NewEmployeeActionTypes.LOAD_ENTERPRISE_STRUCTURE_DETAILS;

  constructor(public payload: {recordId: number}) {}
}

export class LoadEnterpriseStructureDetailsSuccess implements Action {
  readonly type = NewEmployeeActionTypes.LOAD_ENTERPRISE_STRUCTURE_DETAILS_SUCCESS;

  constructor(public payload: {structureDetailsList: IAnalysisDetail[]}) {}
}

export class LoadCostCenters implements Action {
  readonly type = NewEmployeeActionTypes.LOAD_COST_CENTERS;

  constructor(public payload: {recordId: number}) {}
}

export class LoadCostCentersSuccess implements Action {
  readonly type = NewEmployeeActionTypes.LOAD_COST_CENTERS_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}

export class LoadStaffNumber implements Action {
  readonly type = NewEmployeeActionTypes.LOAD_STAFF_NUMBER;

  constructor(public payload: { scheme: string }) { }
}

export class LoadStaffNumberSuccess implements Action {
  readonly type = NewEmployeeActionTypes.LOAD_STAFF_NUMBER_SUCCESS;

  constructor(public payload: string) {}
}

export type NewEmployeeActions =
  | ShowEditorNewEmployee
  | HideEditorNewEmployee
  | ShowTreeNewEmployee
  | HideTreeNewEmployee
  | ShowEditorProvisionedEmployee
  | HideEditorProvisionedEmployee
  | ShowViewerNewEmployee
  | HideViewerNewEmployee
  | ProcessingNewEmployee
  | NotProcessingNewEmployee
  | LoadingNewEmployee
  | NotLoadingNewEmployee
  | SaveNewEmployee
  | SaveUpdatedEmployee
  | LoadRoleData
  | LoadRoleDataSuccess
  | LoadSelectedRoles
  | LoadSelectedRolesSuccess
  | LoadProvisionedDataNewEmployee
  | LoadProvisionedDataNewEmployeeSuccess
  | LoadStaffCategories
  | LoadStaffCategoriesSuccess
  | LoadDesignations
  | LoadDesignationsSuccess
  | LoadPositions
  | LoadPositionsSuccess
  | LoadPaygroups
  | LoadPaygroupsSuccess
  | LoadUserTypes
  | LoadUserTypesSuccess
  | LoadEmailsTo
  | LoadEmailsToSuccess
  | LoadRecordCategories
  | LoadRecordCategoriesSuccess
  | LoadPaygrades
  | LoadPaygradesSuccess
  | LoadEnterpriseStructurTypes
  | LoadEnterpriseStructurTypesSuccess
  | LoadEnterpriseStructureDetails
  | LoadEnterpriseStructureDetailsSuccess
  | LoadCostCenters
  | LoadCostCentersSuccess
  | LoadUsername
  | LoadUsernameSuccess
  | LoadStaffNumber
  | LoadStaffNumberSuccess
