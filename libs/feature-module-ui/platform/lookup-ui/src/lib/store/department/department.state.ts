import { IDepartment } from "@nutela/models/platform/lookup";

export interface IDepartmentState {
  departmentData: IDepartment[];
  showEditor:boolean;
  isProcessing: boolean;
  isLoading:boolean;

}

export const initialDepartmentState: IDepartmentState = {
  departmentData: [],
  showEditor: false,
  isProcessing: false,
  isLoading:false,
}

