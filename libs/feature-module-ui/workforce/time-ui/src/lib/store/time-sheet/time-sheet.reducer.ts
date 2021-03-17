import { initialTimeSheetState, ITimeSheetState } from './time-sheet.state';
import { TimeSheetActions, TimeSheetActionTypes, LoadWorkStreamDataTimeSheetSuccess, LoadingWorkStream, NotLoadingWorkStream } from './time-sheet.actions';
import { ITimeSheetData, IDayStreamData, IWorkStreamData, ITimeSheetProject } from '@nutela/models/workforce/time-sheet';

export function timeSheetReducer(
  state = initialTimeSheetState,
  action: TimeSheetActions
): ITimeSheetState {
  switch (action.type) {
    case TimeSheetActionTypes.LOAD_APPROVED_DATA_SUCCESS:
      return { ...state, approvedData: <ITimeSheetData[]>action.payload };
    case TimeSheetActionTypes.LOAD_AWAITING_APPROVAL_DATA_SUCCESS:
      return { ...state, awaitingApprovalData: <ITimeSheetData[]>action.payload };
    case TimeSheetActionTypes.LOAD_DAY_STREAM_DATA_SUCCESS:
      return { ...state, dayStreamData: <IDayStreamData[]>action.payload };
    case TimeSheetActionTypes.LOAD_WORK_STREAM_DATA_SUCCESS:
      const newState = updateDayStreamState(state, <LoadWorkStreamDataTimeSheetSuccess>action);
      return newState;
    case TimeSheetActionTypes.LOAD_PROJECTS_BY_ID:
      return { ...state, projects: [] };
    case TimeSheetActionTypes.LOAD_PROJECTS_BY_ID_SUCCESS:
      return { ...state, projects: <ITimeSheetProject[]>action.payload };
    case TimeSheetActionTypes.CLEAR_DAY_STREAM_DATA:
      return { ...state, dayStreamData: [] };
    case TimeSheetActionTypes.LOADING_TIME_SHEET:
      return { ...state, isLoading: true };
    case TimeSheetActionTypes.NOT_LOADING_TIME_SHEET:
      return { ...state, isLoading: false };
    case TimeSheetActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case TimeSheetActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case TimeSheetActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case TimeSheetActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case TimeSheetActionTypes.LOADING_WORK_STREAM:
      const newLoadingWorkStreamState = updateLoadingWorkStreamState(state, <LoadingWorkStream>action);
      return newLoadingWorkStreamState;
    case TimeSheetActionTypes.NOT_LOADING_WORK_STREAM:
      const newNotLoadingWorkStreamState = updateNotLoadingWorkStreamState(state, <NotLoadingWorkStream>action);
      return newNotLoadingWorkStreamState;
    default: {
      return state;
    }
  }
}

function updateDayStreamState(
  state: ITimeSheetState,
  action: LoadWorkStreamDataTimeSheetSuccess
): ITimeSheetState {
  const dayId = action.payload.dayId;
  const workStreamData = <IWorkStreamData[]>action.payload.workStreamData;

  const newState = Object.assign({}, state);

  const data = newState.dayStreamData.filter(val => val.day_id === dayId).shift();

  // console.log('dayId>> ', dayId);
  // console.log('workStreamData>> ', workStreamData);
  // console.log('updateDayStreamState>> ', data);

  if (data) {
    data.workStream = workStreamData || [];
  }

  return newState;
}

function updateLoadingWorkStreamState(
  state: ITimeSheetState,
  action: LoadingWorkStream
): ITimeSheetState {
  const dayId = action.payload;

  const newState = Object.assign({}, state);

  const data = newState.dayStreamData.filter(val => val.day_id === dayId).shift();

  if (data) {
    data.isLoadingWorkStream = true;
    // console.log('+++++++++', data);
  }

  // console.log('dayId-->> ', dayId);
  // console.log('updateLoadingWorkStreamState-->> ', data);

  return newState;
}

function updateNotLoadingWorkStreamState(
  state: ITimeSheetState,
  action: NotLoadingWorkStream
): ITimeSheetState {
  const dayId = action.payload;

  const newState = Object.assign({}, state);

  const data = newState.dayStreamData.filter(val => val.day_id === dayId).shift();

  if (data) {
    data.isLoadingWorkStream = false;
  }

  // console.log('dayId-->> ', dayId);
  // console.log('updateNotLoadingWorkStreamState-->> ', data);

  return newState;
}
