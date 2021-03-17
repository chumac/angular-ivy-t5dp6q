
import { ICustomUserGroup, ICustomUserGroupSetup } from '@nutela/models/workforce/employee-profiles';
import { ISelectOption } from '@nutela/models/core-data';

export interface ICustomUserGroupState {
  approvedData: ICustomUserGroup[];
  awaitingApprovalData: ICustomUserGroup[];
  customGroups: ICustomUserGroupSetup[];
  values: ISelectOption[];
  document: any;
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialCustomUserGroupState: ICustomUserGroupState = {
  approvedData: [],
  awaitingApprovalData: [],
  customGroups: [],
  values: [],
  document: null,
  isProcessing: false,
  showEditor: false,
  showViewer: false,
};
