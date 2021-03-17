
import { ICustomUserGroupSetup } from '@nutela/models/workforce/employee-profiles';
import { ISelectOption } from '@nutela/models/core-data';

export interface ICustomUserGroupSetupState {
  data: ICustomUserGroupSetup[];
  document: any;
  isProcessing: boolean;
  isLoading: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialCustomUserGroupSetupState: ICustomUserGroupSetupState = {
  data: [],
  document: null,
  isProcessing: false,
  isLoading: false,
  showEditor: false,
  showViewer: false,
};
