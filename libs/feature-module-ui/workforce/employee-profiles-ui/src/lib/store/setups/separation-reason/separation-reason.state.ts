import { ISeparationReasons } from "@nutela/models/workforce/employee-profiles";

export interface ISeparationReasonSetupState {
  data: ISeparationReasons[];
  isLoading: boolean;
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialSeparationReasonSetupState: ISeparationReasonSetupState = {
  data: [],
  isLoading: false,
  isProcessing: false,
  showEditor: false,
  showViewer: false
}

