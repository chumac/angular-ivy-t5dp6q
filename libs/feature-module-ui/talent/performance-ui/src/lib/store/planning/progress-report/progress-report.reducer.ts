import { initialProgressReportState, IProgressReportState } from './progress-report.state';
import {
  ProgressReportActionTypes,
  ProgressReportActions,
  LoadProgressTransactionInfoSuccess
} from './progress-report.actions';
import { IProgressDefinition } from '@nutela/models/talent/performance';
import { IImageCache } from '../../../interfaces';

export function progressReportReducer(
  state = initialProgressReportState,
  action: ProgressReportActions
): IProgressReportState {
  switch (action.type) {
    case ProgressReportActionTypes.SHOW_PROGRESS_DEFINITION_EDITOR:
      return { ...state, showProgressDefinitionEditor: true };
    case ProgressReportActionTypes.HIDE_PROGRESS_DEFINITION_EDITOR:
      return { ...state, showProgressDefinitionEditor: false };

    case ProgressReportActionTypes.SHOW_PROGRESS_TRANSACTION_EDITOR:
      return { ...state, showProgressTransactionEditor: true };
    case ProgressReportActionTypes.HIDE_PROGRESS_TRANSACTION_EDITOR:
      return { ...state, showProgressTransactionEditor: false };

    case ProgressReportActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case ProgressReportActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };

    case ProgressReportActionTypes.LOAD_PROGRESS_DEFINITION_INFO_SUCCESS:
      return { ...state, progressDefinitionInfo: action.payload };

    case ProgressReportActionTypes.LOAD_SINGLE_PROGRESS_DEFINITION_INFO_SUCCESS:
      return { ...state, singleProgressDefinitionInfo: action.payload };

    // case ProgressReportActionTypes.LOAD_PROGRESS_TRANSACTION_INFO_SUCCESS:
    // const newState = updateState(state, <LoadProgressTransactionInfoSuccess>action);
    // return newState;
      // return { ...state, progressTransactionInfo: action.payload, progressDefinitionInfo: updateState(state, <LoadProgressTransactionInfoSuccess>action).progressDefinitionInfo };

    case ProgressReportActionTypes.LOAD_PROGRESS_OBJECTIVE_INFO_SUCCESS:
      return { ...state, objectiveDataById: action.payload };

    case ProgressReportActionTypes.LOAD_IMAGE_CACHE_SUCCESS:
      return { ...state, imageCache: action.payload };
        
    case ProgressReportActionTypes.SET_LM_STATUS:
      return { ...state, isLineManager: action.payload.status };

    case ProgressReportActionTypes.RESET_COMPONENT:
      return { ...state, progressDefinitionInfo: [] };

    default: {
      return state;
    }
  }
}

function updateImageCache(payload: IImageCache): IImageCache[] {
  const newState = null;
  return newState;
}

function updateState(
  state: IProgressReportState,
  action: LoadProgressTransactionInfoSuccess
): IProgressReportState {
  const data = action.payload;
  const newState = Object.assign({}, state);
  // console.log('new state', newState);
  // const resultset = newState.progressDefinitionInfo.filter(index => index.id === data[0].progressDefDto.id);
  // console.log('resultset', resultset);
 

  for(let i= 0; i < newState.progressDefinitionInfo.length; i++){
    console.log('progerss repoert index', newState.progressDefinitionInfo[i].id, 'compared with: ', data);
    // newState.progressDefinitionInfo[i][newState.progressDefinitionInfo.findIndex(x => x.id == data[0].progressDefDto.id)].transactions = data;
    if(newState.progressDefinitionInfo[i].id === data[0].progressDefDto.id){
      newState.progressDefinitionInfo[i].transactions = data;
    }
  }
  
  // newState.progressDefinitionInfo.forEach((value: IProgressDefinition) => {
  //   console.log('array value', value);
  // });
  // newState.progressDefinitionInfo[newState.progressDefinitionInfo.findIndex(x => x.id == data[0].progressDefDto.id)].transactions = data;
  console.log('retrieve filtered new state', newState);
  return newState;
}
