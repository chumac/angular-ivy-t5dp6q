
export interface IImageState {
  employeePhoto: any,
  employeeFilePhoto: any,
  awaitingApprovalEmployeePhoto: any,
  reportsToEmployeePhoto: any,
  signature: any,
  isProcessing: boolean,
  showEditor: boolean;
  showViewer: boolean;
}

export const initialImageState: IImageState = {
  employeePhoto: null,
  employeeFilePhoto: null,
  awaitingApprovalEmployeePhoto: null,
  reportsToEmployeePhoto: null,
  signature: null,
  isProcessing: false,
  showEditor: false,
  showViewer: false
};
