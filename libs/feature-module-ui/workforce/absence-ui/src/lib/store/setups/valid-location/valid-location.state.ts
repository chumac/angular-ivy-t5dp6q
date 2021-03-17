import { IValidLocation } from "@nutela/models/workforce/leave";

export interface IValidLocationState {
  validLocationData: IValidLocation[];
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialValidLocationState: IValidLocationState = {
  validLocationData: [],
  isProcessing: false,
  showEditor: false,
  showViewer: false,
}

