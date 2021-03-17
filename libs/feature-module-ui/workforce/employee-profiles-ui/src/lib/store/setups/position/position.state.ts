import { IPositionSetup } from "@nutela/models/workforce/employee-profiles";
import { ISelectOption } from "@nutela/models/core-data";

export interface IPositionSetupState {
  approvedData: IPositionSetup[];
  awaitingData: IPositionSetup[];
  document: any;
  isProcessing: boolean;
  isLoading: boolean;
  showEditor: boolean;
  showViewer: boolean;
  specificType:ISelectOption[];
  specificStructure:ISelectOption[];
  costCenter:ISelectOption[];
  getStructure:any[];
  positionList:ISelectOption[];
  gradeList:ISelectOption[];
  positionCategory:ISelectOption[];
}

export const initialPositionSetupState: IPositionSetupState = {
  approvedData: [],
  awaitingData:[],
  document: null,
  isProcessing: false,
  showEditor: false,
  showViewer: false,
  isLoading:false,
  specificType:[],
  specificStructure:[],
  costCenter:[],
  positionList:[],
  gradeList:[],
  positionCategory:[],
  getStructure:[],
}

