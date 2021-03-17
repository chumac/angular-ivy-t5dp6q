import { ITeam } from "@nutela/models/workforce/employee-profiles";

export interface ITeamState {
  approvedData: ITeam[];
  awaitingApprovalData: ITeam[];
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialTeamState: ITeamState = {
  approvedData: null,
  awaitingApprovalData: null,
  isProcessing: false,
  showEditor: false,
  showViewer: false
}