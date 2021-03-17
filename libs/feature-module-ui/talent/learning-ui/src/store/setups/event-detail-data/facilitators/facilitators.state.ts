
import { IEventDetailFacilitators, IEventDetailFacilitatorsType } from '@nutela/models/talent/learning';

export interface IFacilitatorsState {
  FacilitatorsData: IEventDetailFacilitators[];
  FacilitatorsTypeData: IEventDetailFacilitatorsType[];
  document: any;
  image:any;
  showEditor: boolean;
  showViewer: boolean;
  showRecall: boolean;
  isProcessing: boolean;
  isProcessingDataGrid: boolean;
  addBtn: boolean;
  recallBtn: boolean;
  submitBtn: boolean;
  editBtn: boolean;
  viewBtn: boolean;
  deleteBtn: boolean;
  progressBtn: boolean;
  resetBtn: boolean;
}

export const initialFacilitatorsState: IFacilitatorsState = {
  FacilitatorsData: [],
  FacilitatorsTypeData:[],
  document: null,
  image:null,
  isProcessing: false,
  showEditor: false,
  showViewer: false,
  showRecall: false,
  isProcessingDataGrid: false,
  addBtn: false,
  recallBtn: false,
  submitBtn: false,
  editBtn: false,
  viewBtn: false,
  deleteBtn: false,
  progressBtn: false,
  resetBtn: false,
}
