
import { IReInstate } from '@nutela/models/workforce/employee-profiles';
import { ISelectOption } from '@nutela/models/core-data';

export interface IReInstateTransactionState {
  data: IReInstate[];
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
  isLoading: boolean;
  employeeList:ISelectOption[];
  recordCategory :ISelectOption[];
}

export const initialReInstateTransactionState: IReInstateTransactionState = {
  data: [],
  isProcessing: false,
  showEditor: false,
  showViewer: false,
  isLoading: false,
  employeeList: [],
  recordCategory: [],
};
