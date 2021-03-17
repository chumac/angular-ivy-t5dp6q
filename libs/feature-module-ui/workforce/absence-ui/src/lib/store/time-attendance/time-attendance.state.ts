import { ITimeAttendance, ITimeAttendanceStatus } from "@nutela/models/workforce/leave";

export interface ITimeAttendanceState {
  timeAttendanceData: ITimeAttendance[];
  attendanceStatuslist: ITimeAttendanceStatus[];
  isProcessing: boolean;
  isLoading: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialTimeAttendanceState: ITimeAttendanceState = {
  timeAttendanceData: [],
  attendanceStatuslist: [],
  isProcessing: false,
  isLoading: false,
  showEditor: false,
  showViewer: false,
}

