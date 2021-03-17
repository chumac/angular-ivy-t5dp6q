
import { ILeaveTimeline } from "@nutela/models/workforce/leave";

export interface ITeamLeaveCardState {
  viewType: string;
  data: ILeaveTimeline[];
}

export const initialTeamLeaveCardState: ITeamLeaveCardState = {
  viewType: 'Daily',
  data: null,
}

