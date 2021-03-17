import { IReligions } from "@nutela/models/platform/lookup";

export interface IReligionsState {
  religionData: IReligions[];
  showEditor:boolean;
  isProcessing: boolean;
 
}

export const initialReligionsState: IReligionsState = {
  religionData: [],
  showEditor: false,
  isProcessing: false,
}

