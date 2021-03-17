
import { IBeneficiary } from '@nutela/models/workforce/employee-profiles';
import { IStateSelectOption, ISelectOption } from '@nutela/models/core-data';

export interface IHRBeneficiaryState {
  approvedData: IBeneficiary[];
  awaitingApprovalData: IBeneficiary[];
  approvedDataMap: {[key: number]: IBeneficiary};
  approvedPhoto: any;
  awaitingApprovalPhoto: any;
  stateList: IStateSelectOption[];
  cityList: ISelectOption[];
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialHRBeneficiaryState: IHRBeneficiaryState = {
  approvedData: [],
  awaitingApprovalData: [],
  approvedDataMap: {},
  approvedPhoto: null,
  awaitingApprovalPhoto: null,
  stateList: [],
  cityList: [],
  isProcessing: false,
  showEditor: false,
  showViewer: false
}

