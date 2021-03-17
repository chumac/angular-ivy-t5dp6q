import {
  IProgressDefinition, IObjectiveMasterDto, IProgressTransaction
} from '@nutela/models/talent/performance';
import { IImageCache } from '../../../interfaces';


export interface IProgressReportState {
  showProgressDefinitionEditor: boolean;
  showProgressTransactionEditor: boolean;
  progressDefinitionInfo: IProgressDefinition[];
  singleProgressDefinitionInfo: IProgressDefinition;
  progressTransactionInfo: IProgressTransaction[];
  objectiveDataById: IObjectiveMasterDto;
  isProcessing: boolean;
  isLineManager: boolean;
  imageCache: IImageCache[];
}

export const initialProgressReportState: IProgressReportState = {
  showProgressDefinitionEditor: false,
  showProgressTransactionEditor: false,
  progressDefinitionInfo: [],
  singleProgressDefinitionInfo: null,
  progressTransactionInfo: [],
  objectiveDataById: null,
  isProcessing: false,
  isLineManager: null,
  imageCache: []
};
