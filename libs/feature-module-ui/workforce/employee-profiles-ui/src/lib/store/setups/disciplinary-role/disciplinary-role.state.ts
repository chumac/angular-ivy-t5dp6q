import { IDisciplinaryRoleDefinition } from "@nutela/models/workforce/employee-profiles";

export interface IDisciplinaryRoleSetupState {
  data: IDisciplinaryRoleDefinition[];
  document: any;
  isProcessing: boolean;
  isLoading: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialDisciplinaryRoleSetupState: IDisciplinaryRoleSetupState = {
  data: [],
  document: null,
  isProcessing: false,
  isLoading: false,
  showEditor: false,
  showViewer: false
}

