import { ITransferTransaction, ITransferImportTransaction, ICurrentJob, ICurrentLocation } from "@nutela/models/workforce/employee-profiles";
import { ISelectOption } from "@nutela/models/core-data";


export interface ITransferState {
  approvedDirect: ITransferTransaction[];
  awaitingDirect: ITransferTransaction[];
  import: ITransferImportTransaction[];
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
  isLoading: boolean;
  batch:ISelectOption[];
  status:ISelectOption[];
  position:ISelectOption[];
  designation:ISelectOption[];
  location:ICurrentLocation;
  specificType:ISelectOption[];
  specificStructure:ISelectOption[];
  costCenter:ISelectOption[];
  getStructure:any[];
  currentJob:ICurrentJob;
  treeRoot: any[];
  treeDetails: any[];
  picked: any;
}

export const initialTransferState: ITransferState = {
  approvedDirect: [],
  awaitingDirect: [],
  import: [],
  isProcessing: false,
  showEditor: false,
  showViewer: false,
  isLoading: false,
  batch :[],
  status:[],
  position:[],
  designation:[],
  location:null,
  specificType:[],
  specificStructure:[],
  costCenter:[],
  getStructure: [],
  currentJob:null,
  treeRoot: [],
  treeDetails: [],
  picked: null,
};
