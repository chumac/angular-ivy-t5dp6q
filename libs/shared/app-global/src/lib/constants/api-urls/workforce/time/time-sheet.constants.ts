export const TIME_SHEET_URLs = {
  approvedData: '/api/timesheet/my-timesheet/approved/get',
  awaitingApprovalData: '/api/timesheet/my-timesheet/awaiting/get',
  save: '/api/timesheet/my-timesheet/create',
  dayStreamData: '/api/timesheet/my-daystream/get-by-timesheet',
  loadProjectsById: '/api/timesheet/my-timesheet/projects/list',
  workStreamData: '/api/timesheet/my-workstream/get-by-day',
  delete: '/api/timesheet/my-workstream/deleteawaiting',
  reset: '/api/timesheet/my-timesheet/reset',
  recall: '/api/timesheet/my-timesheet/recall',
  submit_recall: '/api/timesheet/my-timesheet/submit-recall',
  submit: '/api/timesheet/my-timesheet/submit',
  archive: '/api/timesheet/my-timesheet/archive'
};

export const AWAITING_TIME_SHEET_TYPES_CONSTANTs: { value: string, label: string }[] = [
  {value: 'description', label:'Description'},
 ];

 export enum timeSheetStatus {
   UN_SUBMITTED,
   AWAITING_APPROVAL
 }



