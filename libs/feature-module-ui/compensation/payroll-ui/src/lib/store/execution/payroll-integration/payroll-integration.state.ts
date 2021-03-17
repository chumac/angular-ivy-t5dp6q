import { ISelectOption } from "@nutela/models/core-data";
import { IPayrollProfile } from "@nutela/models/compensation/payment";



export interface IPayrollIntegrationState {
  data: any[];
  showEditor: boolean;
  showViewer: boolean;
  isProcessing: boolean;
  isLoading: boolean;

  formatList: ISelectOption[];
  monthList: ISelectOption[];
  yearList: ISelectOption[];
  sourceList: ISelectOption[];
  payrollProfileList: ISelectOption[];
}

export const initialIntegrationState: IPayrollIntegrationState = {
  data: [],
  showEditor: false,
  showViewer: false,
  isProcessing: false,
  isLoading: false,

  formatList: null,
  monthList: null,
  yearList: null,
  sourceList: null,
  payrollProfileList: null,
}

