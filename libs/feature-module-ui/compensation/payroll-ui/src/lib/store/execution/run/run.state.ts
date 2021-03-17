import { ISelectOption } from "@nutela/models/core-data";
import { IPayrollProfile } from "@nutela/models/compensation/payment";



export interface IRunState {
  payrollProfiles: IPayrollProfile[];
  showEditor: boolean;
  isProcessing: boolean;
  isLoading: boolean;
  canRun: any;
  payrollGroupSelectOption: ISelectOption[];
  employeeSelectOption: ISelectOption[];
  paygroupSelectOption: ISelectOption[];
  gradeSelectOption: ISelectOption[];
  showRecoverEditor: any;
  possibleReturns: any;
}

export const initialRunState: IRunState = {
  payrollProfiles: [],
  showEditor: false,
  showRecoverEditor: false,
  isProcessing: false,
  isLoading: false,
  canRun: null,
  payrollGroupSelectOption: null,
  employeeSelectOption: null,
  paygroupSelectOption: null,
  gradeSelectOption: null,
  possibleReturns: null,
}

