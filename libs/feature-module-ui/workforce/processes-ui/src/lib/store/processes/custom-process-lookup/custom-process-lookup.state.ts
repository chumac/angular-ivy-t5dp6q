import { ISelectOption } from '@nutela/models/core-data';
import { IProcessFormDefinition, IProcessMetaData } from '@nutela/models/workforce/employee-profiles';

export interface ICustomProcessLookupState {
  customProcessLookupData: IProcessFormDefinition[];
  userMetaData: IProcessMetaData;
  currentMasterId: number;
  teamMembers: ISelectOption[];
  isProcessing: boolean;
  isInitiating: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialCustomProcessLookupState: ICustomProcessLookupState = {
  customProcessLookupData: [],
  userMetaData: null,
  currentMasterId: null,
  teamMembers: null,
  isProcessing: false,
  isInitiating: false,
  showEditor: false,
  showViewer: false,
}

