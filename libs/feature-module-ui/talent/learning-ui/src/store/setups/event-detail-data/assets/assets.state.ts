
import { IEventDetailAssets, IEventDetailAssetAvaiability, IEventDetailAssetType } from '@nutela/models/talent/learning';

export interface IAssetsState {
  AssetsData: IEventDetailAssets[];
  assetsAvailableData: IEventDetailAssetAvaiability[];
  assetsType: IEventDetailAssetType[];
  document: any;
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

export const initialAssetsState: IAssetsState = {
  AssetsData: [],
  assetsAvailableData: [],
  assetsType: [],
  document: null,
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
