import { IPersonal, IDisciplinaryActionDefinition } from "@nutela/models/workforce/employee-profiles";

export interface IDisciplinaryActionSetupState {
  data: IDisciplinaryActionDefinition[];
  isProcessing: boolean;
  isLoading: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialDisciplinaryActionSetupState: IDisciplinaryActionSetupState = {
  data: [],
  isLoading: false,
  isProcessing: false,
  showEditor: false,
  showViewer: false
}

