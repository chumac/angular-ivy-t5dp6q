
import { IDependant, IHrDependant } from '@nutela/models/workforce/employee-profiles';
import { IStateSelectOption, ISelectOption } from '@nutela/models/core-data';

export interface IDependantState {
  approvedData: IHrDependant[];
  awaitingApprovalData: IHrDependant[];
  approvedDataMap: {[key: number]: IDependant};
  approvedPhoto: any;
  awaitingApprovalPhoto: any;
  stateList: IStateSelectOption[];
  cityList: ISelectOption[];
  photo: any,
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialDependantsState: IDependantState = {
  approvedData: [],
  awaitingApprovalData: [],
  approvedDataMap: {},
  approvedPhoto: null,
  awaitingApprovalPhoto: null,
  stateList: [],
  cityList: [],
  photo: null,
  isProcessing: false,
  showEditor: false,
  showViewer: false
}

