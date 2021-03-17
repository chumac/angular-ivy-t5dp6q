import { initialTrainingRoomsState, ITrainingRoomsState } from './training-rooms.state';
import { TrainingRoomsActions, TrainingRoomsActionTypes } from './training-rooms.actions';

export function TrainingRoomsReducer(
  state = initialTrainingRoomsState,
  action: TrainingRoomsActions
): ITrainingRoomsState {
  switch (action.type) {
    case TrainingRoomsActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case TrainingRoomsActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case TrainingRoomsActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case TrainingRoomsActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case TrainingRoomsActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case TrainingRoomsActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case TrainingRoomsActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, TrainingRoomsData: action.payload };
    case TrainingRoomsActionTypes.LOAD_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    case TrainingRoomsActionTypes.REMOVE_DATA:
      return { ...state, TrainingRoomsData: state.TrainingRoomsData.filter(item => item.id !== action.payload.recordId)};
    case TrainingRoomsActionTypes.CLEAR_DOCUMENT:
      return { ...state, document: null };
    default: {
      return state;
    }
  }
}

