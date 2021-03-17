
import { INationality } from '@nutela/models/platform/lookup';
import { ISelectOption } from '@nutela/models/core-data';
import { IEducation } from '@nutela/models/workforce/employee-profiles';

export interface IEducationState {
  approvedData: IEducation[];
  awaitingApprovalData: IEducation[];
  approvedDataMap: {[key: number]: IEducation};
  document: any;
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
  institutionsList: INationality[];
  countryList: ISelectOption[];
}

export const initialEducationState: IEducationState = {
  approvedData: [],
  awaitingApprovalData: [],
  approvedDataMap: {},
  document: null,
  isProcessing: false,
  showEditor: false,
  showViewer: false,
  institutionsList: [],
  countryList: [],
}

