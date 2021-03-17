import { IDesignationDefinition } from "@nutela/models/workforce/employee-profiles";
import { ISelectOption } from "@nutela/models/core-data";

export interface IDesignationSetupState {
  data: IDesignationDefinition[];
  awaitingData: IDesignationDefinition[];
  document: any;
  isProcessing: boolean;
  isLoading: boolean;
  showEditor: boolean;
  showViewer: boolean;
  positions: ISelectOption[];
}

export const initialDesignationSetupState: IDesignationSetupState = {
  data: [],
  awaitingData: [],
  document: null,
  isProcessing: false,
  isLoading: false,
  showEditor: false,
  showViewer: false,
  positions: []
}

