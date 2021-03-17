import { ICalendar, IProfile, IProfileCalendar } from "@nutela/models/compensation/payroll";
import { ISelectOption } from "@nutela/models/core-data";



export interface ICalendarState {
  allData: ICalendar[];
  groupData: ICalendar[];
  globalData: ICalendar[];
  personalData: ICalendar[];
  singleData: IProfileCalendar[];
  showEditor:boolean;
  showViewer:boolean;
  showProfileEditor:boolean;
  isProcessing: boolean;
  isLoading:boolean;
  payProfiles:IProfile[];
  payProfileList:ISelectOption[];
  allowanceList:ISelectOption[];
  deductionList:ISelectOption[];
  paygroupList:ISelectOption[];

}

export const initialCalendarState: ICalendarState = {
  allData: [],
  globalData: [],
  groupData: [],
  personalData: [],
  singleData: [],
  showEditor: false,
  showViewer: false,
  showProfileEditor: false,
  isProcessing: false,
  isLoading:false,
  payProfiles:[],
  payProfileList:null,
  deductionList:null,
  allowanceList:null,
  paygroupList:null,
}

