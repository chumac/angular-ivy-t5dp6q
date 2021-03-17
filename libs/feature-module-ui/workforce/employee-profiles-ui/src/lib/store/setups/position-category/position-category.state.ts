import { IPositionCategorySetup } from "@nutela/models/workforce/employee-profiles";

export interface IPositionCategorySetupState {
  data: IPositionCategorySetup[];
  document: any;
  isProcessing: boolean;
  isLoading: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialPositionCategorySetupState: IPositionCategorySetupState = {
  data: [],
  document: null,
  isProcessing: false,
  showEditor: false,
  showViewer: false,
  isLoading: false,
}

