
import { IEventDetail, IEventDetailData, IEventDetailType, IEventDetailFaculty, IEventEmployee } from '@nutela/models/talent/learning';
import { IEventAllParticiants } from 'libs/models/talent/learning/src/lib/interfaces/event-detail-participants.interface';

export interface IEventDetailState {
  EventDetailData: IEventDetail[];
  getEventData: IEventDetailData[];
  getEventType: IEventDetailType[];
  getEventFaculty: IEventDetailFaculty[];
  getEventParticipants: IEventAllParticiants[];
  getEventEmployee: IEventEmployee[];
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
  showCloseEditor: boolean;
  showNominationEditor: boolean;
}

export const initialEventDetailState: IEventDetailState = {
  EventDetailData: [],
  getEventData: [],
  getEventType: [],
  getEventFaculty: [],
  getEventParticipants: [],
  getEventEmployee: [],

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
  showCloseEditor: false,
  showNominationEditor: false,
}
