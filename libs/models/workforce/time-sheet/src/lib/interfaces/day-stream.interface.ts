import { ITimeSheetData } from "./time-sheet.interface";
import { IWorkStreamData } from "./work-stream.interface";

export interface IDayStreamData {
  day_id: number;
  day_date: Date;
  day_label: string;
  day_name: string;
  TimeSheet: ITimeSheetData;
  workStream: IWorkStreamData[];
  isLoadingWorkStream: boolean;
  approval_status: number;
}
