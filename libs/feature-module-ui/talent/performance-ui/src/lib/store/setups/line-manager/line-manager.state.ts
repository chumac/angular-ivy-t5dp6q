
import { ILineManager, IPlan } from '@nutela/models/talent/performance';
import { IPersonal } from '@nutela/models/workforce/employee-profiles';

export interface ILineManagerState {
  lineManagerData: ILineManager[];
  employeeList: IPersonal[];
  planList: IPlan[];
  document: any;
  isProcessing: boolean;
  isProcessingGrid: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialLineManagerState: ILineManagerState = {
  lineManagerData: [],
  employeeList: [],
  planList: [],
  document: null,
  isProcessing: false,
  isProcessingGrid: false,
  showEditor: false,
  showViewer: false
}

