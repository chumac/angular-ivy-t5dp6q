import { IWorkDetails } from '@nutela/models/foundation';
import { ISelectOption } from '@nutela/models/core-data';



export interface IWorkDetailsState  {
  workDetailsData: IWorkDetails[];
  processingRule: ISelectOption[];
  isProcessing: boolean;
  isLoading: boolean;
  showEditor: boolean;
  showViewer:boolean;
}

export const initialWorkDetailsState: IWorkDetailsState = {
  workDetailsData: [],
  processingRule: [],
  isProcessing: false,
  showEditor: false,
  showViewer:false,
  isLoading: false,
}


