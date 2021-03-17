import { INationality } from "@nutela/models/platform/lookup";

export interface INationalityState {
  nationalityData: INationality[];
  showEditor:boolean;
  isProcessing: boolean;
 
}

export const initialNationalityState: INationalityState = {
  nationalityData: [],
  showEditor: false,
  isProcessing: false,
}

