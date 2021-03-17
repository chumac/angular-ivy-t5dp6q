import { IEducation } from '@nutela/models/workforce/employee-profiles';
import { IInstitution } from '@nutela/models/talent/learning';
import { INationality } from '@nutela/models/platform/lookup';
import { ISelectOption } from '@nutela/models/core-data';

export interface IEducationState {
  approvedData: IEducation[];
  awaitingApprovalData: IEducation[];
  approvedDataMap: {[key: number]: IEducation};
  institutionsList: INationality[];
  countryList: ISelectOption[];
  document: any;
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialEducationState: IEducationState = {
  approvedData: [],
  awaitingApprovalData: [],
  approvedDataMap: {},
  institutionsList: [],
  countryList: [],
  document: null,
  isProcessing: false,
  showEditor: false,
  showViewer: false
}

