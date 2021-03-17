import { IEventParticiantCriteriaEmployee, IEventParticiantCriteriaKey, IEventParticiantCriteriaKeyItems, IEventParticiantEmployee, IEventParticiantGrade, IEventParticiantSchedule, IEventParticiantSource, IEventParticiantStructureType, IEventParticipants } from '@nutela/models/talent/learning';

export interface IEventParticipantsState {
  isProcessing: boolean;
  isLoading: boolean;
  eventParticipants: IEventParticipants[];
  showEventParticipantsEditor : boolean;
  showEventParticipantsView : boolean;
  eventParticipantSource: IEventParticiantSource[];
  eventParticipantEmployee: IEventParticiantEmployee[];
  eventParticipantSchedule: IEventParticiantSchedule[];
  showEventParticipantCriteria : boolean;
  eventParticipantGrade: IEventParticiantGrade[];
  eventParticipantStructureType: IEventParticiantStructureType[];
  eventParticipantCriteriaEmployee: IEventParticiantCriteriaEmployee[];
  eventParticipantCriteriaKey: IEventParticiantCriteriaKey[];
  eventParticipantCriteriaKeyItems: IEventParticiantCriteriaKeyItems[];
}

export const initialEventParticipantsState: IEventParticipantsState = {
  isProcessing: false,
  isLoading: false,
  eventParticipants: [],
  showEventParticipantsEditor : false,
  showEventParticipantsView : false,
  eventParticipantSource : [],
  eventParticipantEmployee : [],
  eventParticipantSchedule : [],
  showEventParticipantCriteria : false,
  eventParticipantGrade : [],
  eventParticipantStructureType : [],
  eventParticipantCriteriaEmployee : [],
  eventParticipantCriteriaKey : [],
  eventParticipantCriteriaKeyItems : []
}
