import { IDashboardChart, IEmployeeSummary, IComprehensiveData, IProfilePicture } from "@nutela/models/workforce/employee-profiles";
import { IWorkflowMessage } from "@nutela/models/foundation";

export interface IEmployeesDataHomeState {
  chartData: IDashboardChart;
  activeEmployees: IEmployeeSummary[];
  inactiveEmployees: IEmployeeSummary[];
  activeReboardEmployees: IEmployeeSummary[];
  selectedEmployeeSummary: IComprehensiveData;
  selectedEmployeeProfilePicture: IProfilePicture;
  myReboardDetails: IEmployeeSummary;
  reboardWorkflowMessage: IWorkflowMessage;
  employeeReboardDetails: IEmployeeSummary;
  showViewer: boolean;
  isLoading: boolean;
  isProcessingStart: boolean;
  isProcessingCancel: boolean;
  isProcessingMyCancel: boolean;
  isProcessingDecline: boolean;
  isProcessingRetrieve: boolean;
 }

export const initialEmployeesDataHomeState: IEmployeesDataHomeState = {
  chartData: null,
  activeEmployees: [],
  inactiveEmployees: [],
  activeReboardEmployees: [],
  selectedEmployeeSummary: null,
  selectedEmployeeProfilePicture: null,
  myReboardDetails: null,
  reboardWorkflowMessage: null,
  employeeReboardDetails: null,
  showViewer: false,
  isLoading: false,
  isProcessingStart: false,
  isProcessingCancel: false,
  isProcessingRetrieve: false,
  isProcessingMyCancel: false,
  isProcessingDecline: false
};

