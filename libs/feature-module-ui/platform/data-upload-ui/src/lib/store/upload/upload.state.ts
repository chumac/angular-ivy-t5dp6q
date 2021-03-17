import { IUpload, ITemplateImport, IUploadStatus } from "@nutela/models/platform/data-upload";
import { ISelectOption } from "@nutela/models/core-data";


export interface IUploadState {
  dataUpload: IUpload[];
  showEditor:boolean;
  showViewer:boolean;
  isProcessing: boolean;
  isLoading:boolean;
  status:ISelectOption[];
  destination:ISelectOption[];
  templateData:ITemplateImport[];
  uploadStatus:IUploadStatus[];
  currentStatus:any;
}

export const initialUploadState: IUploadState = {
  dataUpload: [],
  showEditor: false,
  showViewer: false,
  isProcessing: false,
  isLoading:false,
  status:[],
  destination:[],
  templateData:[],
  uploadStatus: [],
  currentStatus:null,
}

