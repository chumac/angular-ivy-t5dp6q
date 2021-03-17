import { IGradeManagement } from "@nutela/models/workforce/employee-profiles";

export interface IGradeManagementState {
  data: IGradeManagement[];
  isProcessing: boolean;
  isLoading: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialGradeManagementState: IGradeManagementState = {
  data: [],
  isLoading: false,
  isProcessing: false,
  showEditor: false,
  showViewer: false
}

