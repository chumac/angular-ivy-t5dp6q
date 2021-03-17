
import { IReport } from '@nutela/models/foundation';
import { ISelectOption } from '@nutela/models/core-data';


export interface IReportState {
  standardReport: IReport[];
  reportPermission: IReport[];
  isProcessing: boolean;
  isLoading: boolean;
  showEditor: boolean;
  showViewer:boolean;
  role:ISelectOption[];
}

export const initialReportState: IReportState = {
  standardReport: [],
  reportPermission: [],
  isLoading: false,
  isProcessing: false,
  showEditor: false,
  showViewer: false,
  role:[],
}

