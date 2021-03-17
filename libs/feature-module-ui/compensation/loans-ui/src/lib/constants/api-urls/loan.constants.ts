
export const LOAN_APPLICATIONS_DATA_URLs = {
  apply: '/api/loan/application/my/create',
  getAll: '/api/loan/application/my/getall',
  getApproved: '/api/loan/application/my/getallapproved',
  getAwaiting: '/api/loan/application/my/getawaiting',
  getSchedule: '/api/loan/schedule/my/get',
  getGenericSchedule: '/api/loan/generic-loan-schedule/get',
  getMonthlyDeduction: '/api/loan/monthly-deduction-amount',
  deleteAwaiting: '/api/loan/application/my/deleteawaiting',
  getPaymentsSchedule: '/api/loan/payments/my/getall',
  getPaymentsScheduleHR: '/api/loan/payments/hr/getall',
  documentApproved: 'api/loan/application/my/document/approved',
  documentAwaiting: '/api/loan/application/my/document/getawaiting'
};

export const LOAN_REPAYMENTS_DATA_URLs = {
  create: '/api/loan/repayment/hr/create',
  getAll: '/api/loan/repayments/my/getAll',
  getAwaiting: '/api/loan/repayments/my/awaiting-approval/getAll',
  getById: '/api/loan/repayments/my/get',
  getByDetailId: '/api/loan/repayments/my/getall',
  getTypes: '/api/loan/repayment-type/get',
  getPaymentInstruments: '/api/loan/payment-instrument/get',
  getRepaymentInterest: '/api/loan/repayment-interest/get',
  getRepaymentScheduleHR: '/api/loan/repayments/hr/getall'
};

export const LOAN_DISBURSEMENTS_DATA_URLs = {
  getUnDisbursed: '/api/loan/undisbursed-list/hr/get',
  create: '/api/loan/disbursement/hr/create',
  getDisbursed: '/api/loan/disburse-list/hr/get',
};

export const LOAN_DEFINITIONS_DATA_URLs = {
  create: '/api/loan/definition/hr/create',
  getAll: '/api/loan/definition/getAll',
  getById: '/api/loan/definition/hr/get',
  update: '/api/loan/definition/hr/update',
  achive: '/api/loan/definition/hr/archive',
  getAmortizationRule: '/api/loan/amortization-rule/get',
  getPayrollProfiles: '/api/payroll/profile/getAll',
  payrollProfileList: '/api/payroll/profile/getlist',
  getDeductionRules: '/api/loan/deduction-rule/get',
  getDeductionAllowances: '/api/payroll/fixedallowance/getAll',
  getAllowances: '/api/payroll/fixedallowance/getbypayrollprofile',
  getGroupNames: '/api/group-name/getAll',
};

export const LOAN_TRANSACTIONS_DATA_URLs = {
  getAll: '/api/loan/transaction/hr/getAll',
  getSingle: '/api/loan/transaction/hr/get',
  create: '/api/loan/transaction/hr/create',
  update: '/api/loan/transaction/hr/update',
  delete: '/api/loan/transaction/hr/delete',
  getAwaiting: '/api/loan/transaction/hr/getawaiting/getAll',
  documentApproved: 'api/loan/transaction/hr/document/approved',
  documentAwaiting: '/api/loan/transaction/hr/document/getawaiting'
};

export const PROXY_APPLICATIONS_DATA_URLs = {
  getAll: '/api/loan/proxy-transaction/hr/getAll',
  getSingle: '/api/loan/proxy-transaction/hr/get',
  create: '/api/loan/proxy-transaction/create',
  update: '/api/loan/proxy-transaction/hr/update',
  delete: '/api/loan/proxy-transaction/hr/delete',
  getAwaiting: '/api/loan/proxy-transaction/hr/get-awaiting/getall',
  getDocumentUrl: '/api/document/download',
  documentApproved: 'api/loan/proxy-transaction/hr/document/approved',
  documentAwaiting: '/api/loan/proxy-transaction/hr/document/getawaiting'
};

export const LOAN_CURRENCY_DATA_URLs = {
  getDefault: '/api/currency/getdefault/list',
  getGeneric: '/api/currency/generic/list',
  getPayment: '/api/currency/paymentcurrency/list',
};

export const LOAN_CLOSURE_DATA_URLs = {
  create: '/api/loan/closure/hr/create',
  update: '/api/loan/close/hr/update',
  getClosed: '/api/loan/closed/hr/getall',
  getAwaiting: '/api/loan/closure-awaiting/hr/getall',
};
