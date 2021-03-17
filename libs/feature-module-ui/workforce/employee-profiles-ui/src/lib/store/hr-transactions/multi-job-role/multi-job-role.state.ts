
import { IMultiRoleJob } from '@nutela/models/workforce/employee-profiles';
import { ISelectOption } from '@nutela/models/core-data';

export interface IMultiJobRoleTransactionState {
  data: IMultiRoleJob[];
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
  isLoading: boolean;
  employeeList:ISelectOption[];
  positionList :ISelectOption[];
}

export const initialMultiJobRoleTransactionState: IMultiJobRoleTransactionState = {
  data: [],
  isProcessing: false,
  showEditor: false,
  showViewer: false,
  isLoading: false,
  employeeList: [],
  positionList: [],
};
