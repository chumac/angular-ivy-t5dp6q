export const LEAVE_URLs = {
  getLeaveEntitlements: '/api/my-leave-entitlement/getsummary',
  getleaveEntitlement: '/api/my-leave-entitlement/get',
  getLeaveContactInfo: '/api/leave/my/contact-address/get',
  getProxyLeaveEntitlement: '/api/leave-entitlement/get',
  getLeaveApplyDates: '/api/utilities/get-leave-dates',
  getLeaveTypes: '/api/leave-type/list',
  getLeaveForWorkflowApproval: '/api/leave-requests/workflow/get/',
  getMyAllowanceEligibility: '/api/leave-requests/my-allowance-eligibility',
  getHrAllowanceEligibility:'/api/leave-requests/hr/allowance-eligibility',
  approvedData: '/api/my-leave-record/getall',
  awaitingApprovalData: '/api/my-leave-requests/getall',

  getHourlyLeaveTypes: '/api/leave-type-list/hourly/get',
  getHourlyLeaveEntitlement: '/api/my-leave-requests/get-available-leave-hours',

  getDailyLeaveTypes: '/api/leave-type-list/daily/get',
  getDailyLeaveEntitlement: '/api/my-leave-requests/get-available-leave-hours',

  hourlyApprovedData: '/api/my-leave-requests/hourly/get',
  hourlyAwaitingApprovalData: '/api/my-leave-requests/hourly/getawaiting',

  saveHourlyApply: '/api/my-leave-requests/hourly/create',
  saveCancelHourlyApproved: '/api/my-leave-requests/hourly/cancel',
  saveCancelHourlyAwaitingApproval: '/api/my-leave-requests/hourly/deleteawaiting/',
  saveApply: '/api/my-leave-requests/create',
  saveRecall: '/api/my-leave-requests/save-recall',
  saveReschedule: '/api/my-leave-record/reschedule',
  saveReturn: '/api/my-leave-record/return',
  saveCancelApproved: '/api/my-leave-record/cancel',
  saveCancelAwaitingApproval: '/api/my-leave-request/cancel',
  saveLeaveEditForWorkflowApproval: '/api/leave-requests/workflow/update/',

  saveProxyApply: '/api/leave-requests/hr/proxy-leave/create',
  getApprovedLeaveDetail: '/api/leave-record/hr/approved-leave-details/get',
  getUnApprovedLeaveDetail: '/api/leave-record/hr/unapproved-leave-details/get',
  approvedProxyData: '/api/leave-record/hr/approved-leave-details/get',
  awaitingApprovalProxyData: '/api/leave-record/hr/unapproved-leave-details/get',
  invalidateLeave: '/api/leave-record/hr/invalidate-leave-details/delete',

  saveHistoricalLeave: '/api/leave-requests/hr/historical-leave/create',

  saveProxyReset: '/api/leave-requests/hr/proxy-leave/reset',
  deleteProxyApply: '/api/leave-requests/hr/proxy-leave/delete',
};

export const LEAVE_PLAN_URLs = {
  leavePlanTypes: '/api/leave-type/leave-plan/get',
  planApprovedData: '/api/leaveplan/my/getall/approved',
  planAwaitingApprovalData: '/api/leaveplan/my/getall/awaitingApproval',
  planSubmitted: '/api/leaveplan/my/submitted/getall',
  planPendingSubmit: '/api/leaveplan/my/pending-submit/get',
  addPlanApply: '/api/leaveplan/my/final-submit',
  savePlanApply: '/api/leaveplan/my/final-update',
  addPlanDetail: '/api/leaveplan/details/add',
  savePlanDetail: '/api/leaveplan/my/details/update',
  getPlanLeaveIdentity: '/api/leaveplan/my/create',
  deletePlanDetail: '/api/leaveplan/my/details/delete',
  deletePlan: '/api/leaveplan/my/delete',
  cancelPlan: '/api/leaveplan/my/cancel',
  reviewPlan: '/api/leaveplan/my/review'
};

export const LEAVE_STAGGERED_URLs = {
  staggeredLeaveTypes: '/api/leave-type/staggered-leave/get',
  ApprovedData: '/api/staggered-leave/my/awaiting-approval/getall',
  AwaitingApprovalData: '/api/staggered-leave/my/pending-submit/getall',
  add: '/api/staggered-leave/my/final-submit',
  save: '/api/staggered-leave/my/final-update',
  addDetail: '/api/staggered-leave/detail/my/add',
  saveDetail: '/api/staggered-leave/details/my/update',
  getIdentity: '/api/staggered-leave/my/create',
  getCurrencyList: '/api/currency/getdefault/list',
  deleteDetail: '/api/staggered-leave/details/my/delete',
  delete: '/api/staggered-leave/my/delete',
  cancel: '/api/staggered-leave/my/cancel',
  review: '/api/staggered-leave/my/review'
};

export const HOLIDAY_MANAGEMENT_URLs = {
  holidayData:'/api/public-holiday/getAll',
  add:'/api/public-holiday/create',
  update:'/api/public-holiday/update',
  delete:'/api/public-holiday/delete',
};

export const LEAVE_DEFINITION_URLs = {
  definitionData:'/api/leave/information/approved/getAll',
  add:'/api/leave/information/create',
  update:'/api/leave/information/update',
  delete:'/api/leave/information/deactivate',
};

export const LEAVE_LIMIT_URLs = {
limitData:'/api/leave/limits/getAll',
leave:'/api/leave/information/approved/getAll',
grade:'/api/grade/getall',
add:'/api/leave/limits/create',
update:'/api/leave/limits/update',
delete:'/api/leave/limits/delete',
};

export const LEAVE_DAYS_URLs = {
daysData:'/api/leave/days/getAll',
update:'/api/leave/days/update',
};

export const LEAVE_PRORATE_URLs = {
  prorateData:'/api/leave/prorate/getAll',
  build:'/api/leave/prorate/build',
  update:'/api/leave/prorate/update',
  reset:'/api/leave/prorate/reset',
};

export const VALID_LOCATION_URLs = {
  validLocationData:'/api/time-and-attendance/check-in-locations/getall',
  add:'/api/time-and-attendance/hr/check-in-location/create',
  update:'/api/time-and-attendance/hr/check-in-locations/update',
  delete:'/api/time-and-attendance/hr/check-in-locations/delete',
};

export const TIME_ATTENDANCE_URLs = {
  timeAttendanceData:'/api/time-and-attendance/employee-data/getall',
  timeAttendanceStatusList:'/api/time-and-attendance/employee-status-types/list',
  update:'/api/time-and-attendance/hr/employee-data/update',
  delete:'/api/time-and-attendance/hr/employee-data/delete',
};

export const LEAVE_RETURN_REASON_CONSTANTs: { value: number, label: string }[] = [
  {value: 0, label:'Leave Completed'},
  {value: 1, label:'Recalled'},
 ];

 export const LEAVE_APPROVAL_STATUS = {
  awaiting_processing: 1,
  processed: 2
};

