import { ISelectOption } from '@nutela/models/core-data';
import { IProvisioning, IStaffCategory, IEnterpriseStructureType, IAnalysisDetail, IRolesTransform, IRoles } from '../../models/interfaces';

export interface INewEmployeeState {
  provisionedData: IProvisioning[];
  staffCategoryList: IStaffCategory[];
  designationList: ISelectOption[];
  positionList: ISelectOption[];
  structureTypeList: IEnterpriseStructureType[];
  structureDetailsList: IAnalysisDetail[];
  costCentersList: ISelectOption[];
  paygroupList: ISelectOption[];
  paygradeList: ISelectOption[];
  username: string;
  staffNumber: string;
  isProcessing: boolean;
  isLoading: boolean;
  showEditor: boolean;
  showTree: boolean;
  showProvisionedEditor: boolean;
  showViewer: boolean;
  showRoleSelect: boolean;
  rolesList: IRolesTransform[];
  selectedRoles: IRoles[];
  userTypes: ISelectOption[];
  sendEmailTo: ISelectOption[];
  recordCategories: ISelectOption[];
}

export const initialNewEmployeeState: INewEmployeeState = {
  provisionedData: [],
  staffCategoryList: [],
  designationList: [],
  positionList: [],
  structureTypeList: [],
  structureDetailsList: [],
  costCentersList: [],
  paygroupList: [],
  paygradeList: [],
  username: null,
  staffNumber: null,
  isProcessing: false,
  isLoading: false,
  showEditor: false,
  showTree: false,
  showProvisionedEditor: false,
  showViewer: false,
  showRoleSelect: false,
  rolesList: [],
  selectedRoles: [],
  userTypes: [],
  sendEmailTo: [],
  recordCategories: []
}

