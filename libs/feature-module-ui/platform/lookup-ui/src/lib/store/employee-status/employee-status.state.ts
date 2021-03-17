import { IEmployeeStatus } from "@nutela/models/platform/lookup";

export interface IEmployeeStatusState {
  statusData: IEmployeeStatus[];
  showEditor:boolean;
  isProcessing: boolean;
 
}

export const initialEmployeeStatusState: IEmployeeStatusState = {
  statusData: [],
  showEditor: false,
  isProcessing: false,
}

