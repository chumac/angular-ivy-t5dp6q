
export const SCHEDULE_DATA_URLs = {
  new: '/api/payment/schedule/new/getall',
  getAll: '/api/payment/schedule/getall',
  awaitingSubmission: '/api/payment/schedule/awaiting-submission/getall',
  getById: '/api/payment/schedule/get',
  create: '/api/payment/schedule/create',
  getAwaiting: '/api/payment/schedule/get-awaiting/getall',
  getApproved: '/api/payment/schedule/get-approved/getall',
  getClosed: '/api/payment/schedule/closed-lists/getall',
  getCompleted: '/api/payment/schedule/completed-lists/getall',
  getProcessing: '/api/payment/schedule/processing-lists/getall',
  getPayrollProfile: '/api/payroll/profile/getlist',
  getCurrency: '/api/currency/getdefault/list',
  getAccountType: '/api/payment/bank-account-type/getall',
  getPaymentSource: '/api/payment/payment-type-sources/getall',
  getPayrollSource: '/api/payment/payroll-sources/getall',
  getPaymentDate: '/api/payment/payroll-dates/get',
  validate: '/api/payment/schedule/validate',
  delete: '/api/payment/schedule/delete',
  abandon: '/api/payment/schedule/abandon',
  platform: '/api/payment/platform/getall',
  submit: '/api/payment/schedule-details/submit',
  requeue: '/api/payment/schedule/re-queue',
  pay: '/api/payment/process-payment/get'
};

export const SCHEDULE_DETAIL_DATA_URLs = {
  update: '/api/payment/schedule-details/update',
  getAll: '/api/payment/schedule-details/getall',
  upload: '/api/payment/schedule-details/upload',
  reset: '/api/payment/schedule-details/reset',
  validateUpload: '/api/payment/schedule-details/validate',
  validatePayment: '/api/payment/schedule/validate',
  requeue: '/api/payment/schedule/re-queue',
  submit: '/api/payment/schedule-details/submit',
  processPayroll: '/api/payment/schedule/process-payroll/get'
};

export const PAY_DESK_DATA_URLs = {
  getAll: '/api/payment/paydesk/getall',
  create: '/api/payment/paydesk/create',
  getPlatforms: '/api/payment/platform/getall',
};
