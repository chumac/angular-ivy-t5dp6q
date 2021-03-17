
import { ISecurity } from '@nutela/models/foundation';
import { ISelectOption } from '@nutela/models/core-data';
import { IEmployee } from '@nutela/models/compensation/loans';


export interface ISecurityState {
  processedData: ISecurity[];
  waitingData: ISecurity[];
  isProcessing: boolean;
  isLoading: boolean;
  isLoadingDropdown: boolean;
  showEditor: boolean;
  showTreeView: boolean;
  showBulkEditor: boolean;
  showViewer:boolean;
  role:ISelectOption[];
  individual:ISelectOption[];
  specificType:ISelectOption[];
  specificStructure:ISelectOption[];
  users:IEmployee[];
  singleAction:ISelectOption[];
  bulkAction:ISelectOption[];
}

export const initialSecurityState: ISecurityState = {
  processedData: [],
  waitingData:[],
  isProcessing: false,
  isLoading: false,
  isLoadingDropdown: false,
  showEditor: false,
  showTreeView: false,
  showBulkEditor: false,
  showViewer: false,
  role:[],
  individual:[],
  specificType:[],
  specificStructure:[],
  users:[],
  singleAction:[],
  bulkAction:[],
}

