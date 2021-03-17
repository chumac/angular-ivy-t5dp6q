
import { IFamily, IHrFamily } from '@nutela/models/workforce/employee-profiles';
import { ISelectOption, IStateSelectOption } from '@nutela/models/core-data';

export interface IFamilyState {
  approvedData: IHrFamily[];
  awaitingApprovalData: IHrFamily[];
  approvedDataMap: {[key: number]: IFamily};
  document: any;
  inlineDocument: any;
  stateList: IStateSelectOption[];
  cityList: ISelectOption[];
  approvedPhoto: any;
  awaitingApprovalPhoto: any;
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialFamilyState: IFamilyState = {
  approvedData: [],
  awaitingApprovalData: [],
  approvedDataMap: {},
  document: null,
  inlineDocument: null,
  stateList: [],
  cityList: [],
  approvedPhoto: null,
  awaitingApprovalPhoto: null,
  isProcessing: false,
  showEditor: false,
  showViewer: false
}

