
import { IEcosystem360, IPlan } from '@nutela/models/talent/performance';
import { IPersonal } from '@nutela/models/workforce/employee-profiles';

export interface IEcosystem360State {
  ecosystem360Data: IEcosystem360[];
  employeeList: IPersonal[];
  planList: IPlan[];
  document: any;
  isProcessing: boolean;
  isProcessingGrid: boolean;
  isProcessingUpload: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialEcosystem360State: IEcosystem360State = {
  ecosystem360Data: [],
  employeeList: [],
  planList: [],
  document: null,
  isProcessing: false,
  isProcessingGrid: false,
  isProcessingUpload: false,
  showEditor: false,
  showViewer: false
}

