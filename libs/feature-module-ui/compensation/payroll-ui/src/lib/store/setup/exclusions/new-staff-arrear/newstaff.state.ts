import { ISelectOption } from "@nutela/models/core-data";
import { IGetPayrollProfile, IstaffEmployeeList ,IstaffEmployeePayrollProfile} from "@nutela/models/compensation/payroll";



export interface IStaffState {
  staffemployeeList: IstaffEmployeeList[];
  showEditor: boolean;
  isProcessing: boolean;
  isLoading: boolean;
  canRun: any;
  employeeGroupSelectOption : ISelectOption[];
  gradeSelectOption: ISelectOption[];
  showRecoverEditor: any;
  possibleReturns: any;
  employeePayrollProfile: IstaffEmployeePayrollProfile[];
  getPayrollProfile : IGetPayrollProfile[];
}

export const initialStaffState: IStaffState = {
  staffemployeeList:[],
  employeeGroupSelectOption : null,
  employeePayrollProfile : [],
  getPayrollProfile:[],
  showEditor: false,
  showRecoverEditor: false,
  isProcessing: false,
  isLoading: false,
  canRun: null,
  gradeSelectOption: null,
  possibleReturns: null,
}

