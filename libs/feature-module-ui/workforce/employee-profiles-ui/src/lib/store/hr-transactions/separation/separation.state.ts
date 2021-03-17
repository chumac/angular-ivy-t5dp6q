
import { ISeparation } from '@nutela/models/workforce/employee-profiles';
import { ISelectOption } from 'dist/libs/models/core-data';

export interface ISeparationTransactionState {
  data: ISeparation[];
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
  isLoading: boolean;
  employeeList:ISelectOption[];
  status:ISelectOption[];
  reasons:ISelectOption[];
  allowance:ISelectOption[];
  currency:ISelectOption[];
}

export const initialSeparationTransactionState: ISeparationTransactionState = {
  data: [],
  isProcessing: false,
  showEditor: false,
  showViewer: false,
  isLoading: false,
  employeeList:[],
  status:[],
  reasons:[],
  allowance:[],
  currency:[],
};
