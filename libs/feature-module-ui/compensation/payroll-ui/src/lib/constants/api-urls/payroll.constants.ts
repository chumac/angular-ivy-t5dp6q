export const FIXED_ALLOWANCE_URLs = {
  getAll: '/api/payroll/fixedallowance-def/getall',
  update: '/api/payroll/fixedallowance/update',
  delete: '/api/payroll/fixedallowance/delete',
  archive: '/api/payroll/fixedallowance/Archive',
  deleteAwaiting: '/api/payroll/fixedallowance/deleteawaiting',
  create: '/api/payroll/fixedallowance/create',

  criteriaCheck: '/api/payroll/fixedallowance/criteria-configure-check/get',
  criteriaConfigData: '/api/payroll/fixedallowance/criteria/getall',
  createConfigure: '/api/payroll/fixedallowance/criteria-configure/create',
  updateConfigure: '/api/payroll/fixedallowance/criteria-configure/update',

  createRate: '/api/payroll/fixed-allowance-rates/create',
  updateRate: '/api/payroll/fixed-allowance-rates/update',
  deleteRate: '/api/payroll/fixed-allowance-rates/delete',
  deleteEmployeeRate: '/api/payroll/fixedallowance-rates/emp/delete',
  deletePaygroupRate: '/api/payroll/fixedallowance-rates/grp/delete',
  deleteGlobalRate: '/api/payroll/fixedallowance-rates/global/delete',
  paygroupRates: '/api/payroll/fixedallowance/group/getall',
  employeeRates: '/api/payroll/fixedallowance/emp/getall',
  globalRates: '/api/payroll/fixedallowance/global/getAll',
  checkEmployeeRates: '/api/payroll/fixedallowance-rate/get',
  checkPaygroupRates: '/api/payroll/fixedallowance-rate/get',

  currencyList: '/api/currency/getdefault/list',
  payFormularList: '/api/payroll/formula/getlist',
  payrollProfileList: '/api/payroll/profile/getlist',
  payItemTypes: '/api/payroll/fixedallowance/payment-item-type/getlist',
  payFrequencies: '/api/payroll/fixedallowance/frequency/getlist',
  months: '/api/payroll/fixedallowance/start-of-period/getlist',
  eligibilities: '/api/payroll/fixedallowance/eligibility/getlist',
  payrollTypes: '/api/payroll/fixedallowance/payroll-type/getlist',
  groupTypes: '/api/payroll/groupname/getlist',
  allowanceList: '/api/payroll/fixedallowance/getlist',
  prorationDateTypes: '/api/payroll/fixedallowance/proration-arrears-date-type/getlist',
  paygroupList: '/api/paygroup/getall',
  hrActiveProfile: '/api/payroll/active-payroll-profiles/hr/getAll'
};

// By Shuaib
// GET /api/payroll/fixeddeduction/getall/{employeeID}/{payroll_profile}
export const FIXED_DEDUCTION_URLs = {

  getAll: '/api/payroll/hr/fixeddeduction/getAll',
  getById: '/api/payroll/fixeddeduction/get',
  update: '/api/payroll/fixeddeduction/update',
  delete: '/api/payroll/fixeddeduction/delete',
  archive: '/api/payroll/fixeddeduction/archive',
  create: '/api/payroll/fixeddeduction/create',

  criteriaCheck: '/api/payroll/fixeddeduction/criteria/configure-check',
  criteriaConfigData: '/api/payroll/fixeddeduction/criteria/getall',
  createConfigure: '/api/payroll/fixeddeduction/criteria/create',
  updateConfigure: '/api/payroll/fixeddeduction/criteria/update',

  createRate: '/api/payroll/fixed-deduction-rates/create',
  updateRate: '/api/payroll/fixed-deduction-rates/update',
  deleteRate: '/api/payroll/fixed-deduction-rates/delete',
  deleteEmployeeRate: '/api/payroll/fixeddeduction-rates/emp/delete',
  deletePaygroupRate: '/api/payroll/fixeddeduction-rates/group/delete',
  paygroupRates: '/api/payroll/fixeddeduction/group/getall',
  employeeRates: '/api/payroll/fixeddeduction/emp/getall',
  globalRates: '/api/payroll/fixeddeduction/global/getAll',
  checkEmployeeRates: '/api/payroll/fixeddeduction-rate/get',
  checkPaygroupRates: '/api/payroll/fixeddeduction-rate/get',

  currencyList: '/api/currency/getdefault/list',
  payFormularList: '/api/payroll/formula/getlist',
  payrollProfileList: '/api/payroll/profile/getlist',
  payItemTypes: '/api/payroll/fixeddeduction/item-type/getlist',
  payFrequencies: '/api/payroll/fixeddeduction/frequency/getlist',
  months: '/api/payroll/fixeddeduction/start-of-period/getlist',
  eligibilities: '/api/payroll/fixeddeduction/eligibility/getlist',
  payrollTypes: '/api/payroll/fixeddeduction/payroll-type/getlist',
  groupTypes: '/api/payroll/groupname/getlist',
  deductionList: '/api/payroll/fixeddeduction/getlist',
  prorationDateTypes: '/api/payroll/fixedallowance/proration-arrears-date-type/getlist',
  paygroupList: '/api/paygroup/getall'
};

export const VARIABLE_ALLOWANCE_URLs = {
  currencyList: '/api/currency/getdefault/list',
  payFormulaList: '/api/payroll/formula/getlist',

  deleteRate: '/api/payroll/variableallowance-rates/group/delete', // PUT {master_rec_id}
  createRate: '/api/payroll/variable-allowance-rates/create', // POST
  updateRate: '/api/payroll/variable-allowance-rates/update', // POST {master_rec_id}
  getRates: '/api/payroll/varallowance/group/getAll',

  getArchived: '/api/payroll/varallowancedefinition/archived/get', //{allowanceDefID}
  getAllArchived: '/api/payroll/varallowancedefinition/archived/getall',
  getAllAwaiting: '/api/payroll/varallowancedefinition/getallawaiting',
  restore: '/api/payroll/varallowancedefinition/restore', // PUT {allowanceDefID}
  deleteAwaiting: '/api/payroll/varallowancedefinition/deleteawaiting', // DELETE {allowanceDefID}
  getAll: '/api/payroll/varallowance-def/getall',
  getById: '/api/payroll/varallowance-def/get',

  create: '/api/payroll/varallowancedefinition/create',
  delete: '/api/payroll/varallowancedefinition/delete', //  PUT {allowanceDefID}
  update: '/api/payroll/varallowancedefinition/update',

  payrollProfileList: '/api/payroll/profile/getlist',
  transactionUnitList: '/api/payroll/varallowancedefinition/transaction-unit/getlist',
  groupList: '/api/payroll/groupname/getlist',
  paygroupList: '/api/paygroup/getall',

};

export const VARIABLE_ALLOWANCE_TRANSACTION_URLs = {
  currencyList: '/api/payroll/payment-currency/getAll',
  payFormularList: '/api/payroll/formula/getlist',

  create: '/api/payroll/varallowancetransaction/create',
  updateAwaiting: '/api/payroll/varallowancetransaction/updateawaiting',
  update: '/api/payroll/varallowancetransaction/update',
  archive: '/api/payroll/varallowancetransaction/archive',
  restore: '/api/payroll/varallowancetransaction/restore',
  getAllArchivedTransactions: '/api/payroll/varallowanctransaction/archived/getAll',
  getSingleArchivedTranaction: '/api/payroll/varallowanctransaction/archived/get',
  data: '/api/payroll/varallowanctransaction/getAll',
  getById: '/api/payroll/varallowancetransaction/get',
  getAwaiting: '/api/payroll/varallowancetransaction/getawaiting',
  getAllAwaiting: '/api/payroll/varallowancetransaction/getallawaiting',
  deleteAwaiting: '/api/payroll/varallowancetransaction/deleteawaiting',

  payrollProfileList: '/api/payroll/profile/getlist',
  transactionUnitList: '/api/payroll/varallowancedefinition/transaction-unit/getlist',
  groupList: '/api/payroll/groupname/getlist',
  vallowanceList: '/api/payroll/varallowance-def/getlist'
};

export const VARIABLE_DEDUCTION_URLs = {

  getByIdOnPaygroup: '/api/payroll/vardeductiondefinition/paygroup/get',
  create: '/api/payroll/vardeductiondefinition/create',
  update: '/api/payroll/vardeductiondefinition/update',
  archive: '/api/payroll/vardeductiondefinition/archive',
  delete: '/api/payroll/vardeductiondefinition/delete',

  data: '/api/payroll/vardeductiondefinition/getAll',
  getById: '/api/payroll/vardeductiondefinition/get',
  getAllAwaiting: '/api/payroll/vardeductiondefinition/getallawaiting',
  getAwaitingById: '/api/payroll/vardeductiondefinition/getawaiting',

  paygroupRates: '/api/payroll/vardeduction/group/getAll',
  deletePaygroupRate: '/api/payroll/variablededuction-rates/group/delete', // PUT {master_rec_id}
  saveRate: '/api/payroll/variable-deduction-rates/create', // POST
  updateRate: '/api/payroll/variable-deduction-rates/update', // POST {master_rec_id}

  payrollProfileList: '/api/payroll/profile/getlist',
  transactionUnitList: '/api/payroll/varallowancedefinition/transaction-unit/getlist',
  groupList: '/api/payroll/groupname/getlist',
  paygroupList: '/api/paygroup/getall',

  currencyList: '/api/currency/getdefault/list',
  formulaList: '/api/payroll/formula/getlist',
  deductionItemTypes: '',
  deductionFrequency: '',
  startPeriod: '',
  maxDeduction: '',
  eligibility: '',
  getSelectOptions: '/api/payroll/fixeddeduction/getlist',
};

export const VARIABLE_DEDUCTION_TRANSACTION_URLs = {
  getByIdOnPaygroup: '/api/payroll/vardeductiondefinition/paygroup/get',
  create: '/api/payroll/vardeductiontransaction/create',
  update: '/api/payroll/vardeductiontransaction/update',
  archive: '/api/payroll/vardeductiontransaction/archive',
  delete: '/api/payroll/vardeductiontransaction/delete',

  data: '/api/payroll/vardeductiontransaction/getAll',
  getById: '/api/payroll/vardeductiontransaction/get',
  getAllAwaiting: '/api/payroll/vardeductiontransaction/getallawaiting',
  getAwaitingById: '/api/payroll/vardeductiontransaction/getawaiting',

  getCurrencies: '/api/payroll/payment-currency/getAll',
  getFormula: '/api/payroll/formula/getlist',
  payrollProfile: '/api/payroll/profile/getlist',
  deductionItemTypes: '',
  deductionFrequency: '',
  startPeriod: '',
  maxDeduction: '',
  payrollType: '',
  groupName: '',
  eligibility: '',
  getSelectOptions: '/api/payroll/fixeddeduction/getlist',
  vdeductionList: '/api/payroll/vardeductiondefinition/getlist'
};

export const CALENDAR_URLs = {
  data: '/api/payroll/calendar/getAll',
  update: '/api/payroll/calendar/update',
  delete: '/api/options/custom-set/delete',
  reset: '',
  payrollProfiles: '/api/payroll/profile/getAll',
  payrollProfileList: '/api/payroll/profile/getlist',
  allowanceList: '/api/payroll/fixedallowance/getlist',
  deductionList: '/api/payroll/fixeddeduction/getlist',
  paygroupList: '/api/payroll/paygroup/getall',
  singleData: '/api/payroll/calendar/get-single',
  group: '/api/payroll/calendar/payroll-group',
  global: '/api/payroll/calendar/global',
  personal: '/api/payroll/calendar/employee'
};

export const SALARY_URLs = {
  planData: '/api/payroll/salary-review/getall',
  updatePlan: '/api/payroll/salary-review/update',
  addPlan: '/api/payroll/salary-review/create',
  deletePlan: '/api/payroll/salary-review/delete',
  removePlan: '/api/payroll/salary-review/remove',
  reversePlan: '/api/payroll/salary-review/reverse',
  executePlan: '/api/payroll/salary-review/execute',

  getAllPlanDetail: '/api/payroll/salary-review-detail/getall',
  getPlanDetail: '/api/payroll/salary-review-detail/get',
  addPlanDetail: '/api/payroll/salary-review-detail/create',
  updatePlanDetail: '/api/payroll/salary-review-detail/update',
  deletePlanDetail: '/api/payroll/salary-review-detail/delete',

  groupData: '/api/payroll/salary-review-group/getall',
  updateGroup: '/api/payroll/salary-review-group/update',
  addGroup: '/api/payroll/salary-review-group/create',
  executeGroup: '/api/payroll/salary-review-group/execute',
  reverseGroup: '/api/payroll/salary-review-group/reverse',
  removeGroup: '/api/payroll/salary-review-group/remove',
  deleteGroup: '/api/payroll/salary-review-group/delete',

  statusList: '/api/payroll/salary-review/filter-by-option/getall',
  payrollProfileList: '/api/payroll/profile/getlist',
  allowanceList: '/api/payroll/fixedallowance/getlist',
  allowanceAffectedList: '/api/payroll/salary-review/allowances-affected/getall',
  allowanceRuleList: '/api/payroll/salary-review/allowances-review-rule/getall',
  deductionList: '/api/payroll/fixeddeduction/getlist',
  itemTypeList: '/api/payroll/fixeddeduction/getlist',
  deductionAffectedList: '/api/payroll/salary-review/deduction-affected/getall',
  deductionRuleList: '/api/payroll/salary-review/decution-review-rule/getall',
  eligibilityRuleList: '/api/payroll/salary-review/eligibility-rule/getall',
  paygroupList: '/api/payroll/paygroup/getall',
  reviewRuleList: '/api/payroll/paygroup/getall',
};

export const BANK_URLs = {
  Data: '/api/payroll/bank/getAll',
  update: '/api/payroll/bank/update',
  create: '/api/payroll/bank/create',
  delete: '/api/payroll/banks/archive',
  nationalityData: '/api/country/getAllCountries',
  stateData: '/api/state/getall',
};

export const PFA_URLs = {
  data: '/api/payroll/set-up-pfa/getAll',
  update: '/api/payroll/set-up-pfa/update',
  delete: '/api/pfa/archive',
  add: '/api/pfa/create',
  nationalityData: '/api/country/getAllCountries',
  stateData: '/api/state/getall',
  cityData: '/api/city/getall',
};

export const PAYMENT_CURRENCY_URLs = {
  Data: '/api/payroll/payment-currency/getAll',
  update: '/api/payroll/payment-currency/update',
  delete: '/api/payroll/payment-currency/delete',
  add: '/api/payroll/payment-currency/create',
};

export const PROFILE_URLs = {
  Data: '/api/payroll/profile/getAll',
  update: '/api/payroll/payment-currency/update',
  delete: '/api/payroll/payment-currency/delete',
  add: '/api/payroll/payment-currency/create',
};

export const GRADE_URLs = {
  Data: '/api/payroll/grade/getAll',
  update: '/api/payroll/grade/update',
  delete: '/api/payroll/grade/delete',
  add: '/api/payroll/grade/create',
};

export const PAY_ELEMENTS_URLs = {
  groupItem: '/api/group-name/getAll',
};

export const FORMULA_URLs = {
  getAll: '/api/payroll/formula/list-my-formula/getall',
  getAllFormulas: '/api/payroll/formula/list/getAll',
  getDropdown: '/api/payroll/formula/list-my-formula/getAll',
  approvedData: '/api/payroll/',
  getAwaiting: '/api/payroll/formula/getawaiting',
  approvedFormulaByRole: '/api/payroll/formula/approved/getAll',
  list: '/api/payroll/formula/getlist',
  getById: '/api/payroll/formula/get',
  getArchived: '/api/payroll/formula/archive/getAll',
  update: '/api/payroll/formula/update',
  delete: '/api/payroll/formula/delete',
  restore: '/api/payroll/formula/restore',
  deleteAwating: '/api/payroll/formula/deleteawaiting',
  create: '/api/payroll/formula/create',
  getCurrencies: '/api/payroll/payment-currency/getAll',
  payrollProfile: '/api/payroll/profile/getlist',
  deductionItemTypes: '',
  deductionFrequency: '',
  startPeriod: '',
  maxDeduction: '',
  payrollType: '',
  groupName: '',
  eligibility: '',
};

export const PAYROLL_PROFILE_URLs = {
  getById: '/api/payroll/profile/get',
  getArchived: '/api/payroll/profile/archive/getAll',
  update: '/api/payroll/profile/update',
  delete: '/api/payroll/profile/delete',
  restore: '/api/payroll/profile/restore',
  create: '/api/payroll/profile/create',

  getlist: '/api/payroll/profile/getlist',
  data: '/api/payroll/profile/list/getall',
  canEditSecurityGroup: '',


  // Known types
  profileTypes: '/api/payroll/profile/getlist',
  days: '/api/payroll/profile/payment-runday/getlist',
  taxOptions: '/api/payroll/profile/tax-option/getlist',
  taxMode: '/api/payroll/profile/tax-mode/getlist',
  allowNegativePay: '/api/payroll/profile/allow-negative-pay/getlist',
  taxRule: '/api/payroll/profile/tax-rule/getlist',
  runCycle: '/api/payroll/profile/Run-cycle/getlist',
  payPeriod: '/api/payroll/profile/payment-period-covered/getlist',
  enterpriseStructure: '/api/enterprise-structure/hr/get-all',
  structureDetails: '/api/enterprise-structure/details/hr/get-by-analysis_id',
  costCenter: '/api/structure-detail/cost-center-code',
  securityRoles: '/api/securityrole/get-roles',
  fixedDeduction: '/api/payroll/fixeddeduction/getlist',
  coinageRounding: '/api/payroll/profile/coinage-rounding/getlist',
  upfrontTreatment: '/api/payroll/profile/upfront-treatment/getlist',
  periodicProration: '/api/payroll/fixedallowance/proration-arrears-date-type/getlist',
  getCurrencies: '/api/payroll/payment-currency/getlist',
  getFormula: '/api/payroll/formula-all/getlist',



};

export const PAYGROUP_URLs = {
  getById: '/api/payroll/paygroup/get',
  getArchived: '/api/payroll/paygroup/archive/getAll',
  update: '/api/payroll/paygroup/update',
  updateRate: '',
  delete: '/api/payroll/paygroup/delete',
  archive: '/api/payroll/paygroup/archive',
  restore: '/api/payroll/paygroup/restore',
  create: '/api/payroll/paygroup/create',
  getCurrencies: '/api/payroll/payment-currency/getAll',
  getFormula: '/api/payroll/formula/getlist',
  awaitingData: '/api/payroll/paygroup/awaiting-approval/getall',
  getAll: '/api/payroll/paygroup/getAll',
  confirmationStatus: '/api/payroll/paygroup/confirmation-status/getlist',
  grade: '/api/grade/getlist',
  approved: '/api/payroll/paygroup/approved/getall',
  roles: '/api/securityrole/get-roles',
};

export const DEFAULT_CURRENCY_URLs = {
  update: '/api/currency/update',
  deactivate: '/api/currency/deactivate',
  getAll: '/api/currency/active/getall',
};

export const EXECUTION_URLs = {
  run: '/api/payroll/run/create',
  payrollProfiles: '/api/payroll/profile/runable/getAll',
  lastRunItems: '/api/payroll/run/lastrun-list',
  singleProfile: '/api/payroll/profile/get',
  employee: '/api/payroll/run/employee-list',
  paygroup: '/api/paygroup/getall',
  lastRunItemStatus: '/api/payroll/run/lastrun-status-list',
  payrollGroup: '/api/payroll/run/get-list-group-run',
  grade: '/api/grade/getlist',
  cancel: '/api/payroll/run/cancel',
  sendForApproval: '/api/payroll/run/approve',
  recover: '/api/payroll/run/recover',
  payslip: '/api/payroll/run/employee-payslip-list',
  finalize: '/api/payroll/run/finalize',
  reportUrl: '/api/payroll/run/status-report-url',
  possibleReturns: '/api/payroll/run/lastrun-list-possible-returns',
  canRun: '/api/payroll/run/check',
  approvalMessage: '/api/payroll/run/check',
};

export const INTEGRATION_URLs = {
  getAll: '/api/payroll/integration-dataset/getAll',
  create: '/api/payroll/integration-dataset/create',
  update: '/api/payroll/integration-dataset/update',
  delete: '/api/payroll/integration-dataset/delete',
  payrollProfileList: '/api/payroll/profile/getlist',
  monthList: '/api/payroll/integration-dataset/monthlist',
  yearList: '/api/payroll/integration-dataset/yearslist',
  sourceList: '/api/payroll/integration-dataset/sourcelist',
  statusList: '/api/payroll/integration-dataset/getstatuslist',
  formatList: '/api/payroll/integration-dataset/formatlist'
};

export const NEWSTAFF_URLs = {
  staffEmployee : '/api/employees/hr-staff-list/get',
  getAllEmployee : '/api/payroll/exclusion/employee-lists/getall',
  getEmployeePayrollProfile : '/api/payroll/payroll/my/active-payroll-profiles/get',
  savePayrollProfile : '/api/payroll/exclusion/create',
  loadPayrollProfile :  '/api/payroll/exclusion/employee/get',
  removePayrollProfile :  '/api/payroll/exclusion/archive/',
  approvalMessage: '/api/payroll/run/check',
};


export const EXCLUSION_TRANSACTION_URLs = {
  exclusionTransaction: '/api/payroll/exclusion-transaction/getall',
  exclusionTransactionScopeData: '/api/payroll/exclusion-type/getlist',
  exclusionTransactionActiveEmployeeData: '/api/employees/active',
  exclusionTransactionReasonData: '/api/payroll/exclusion-reason/getlist',
  configureTransactionData: '/api/payroll/exclusion-transaction/configure/getall',
  exclusionTransactionTypeData: '/api/payroll/exclusion-type-detail/getlist',
  exclusionTransactionItemTypeData: '/api/payroll/exclusion-type-detail/getlist',
  configureCreate: '/api/payroll/exclusion-transaction/configure/create',
  getConfigureData: '/api/payroll/exclusion-transaction/configure/get',
  saveClose: '/api/payroll/exclusion-transaction/close',
  deleteTransactionConfigure: '/api/payroll/exclusion-transaction/configure/delete',
  saveexclusionTransactionData: '/api/payroll/exclusion-transaction/create',
  getexclusionTransactionData: '/api/payroll/exclusion-transaction/get',
  updateexclusionTransactionData: '/api/payroll/exclusion-transaction/update',
  updateConfigureData: '/api/payroll/exclusion-transaction/configure/update',
};

export const RELIEFS_URLs = {
  relief : '/api/payroll/relief-management/payroll-profiles/getall',
  reliefProfile : '/api/payroll/relief-management/getall',
  saveReliefProfile : '/api/payroll/relief-management/create',
  getStatutoryData : '/api/payroll/relief-management/statutory-relief/getall',
  getReliefTypeData : '/api/payroll/relief-management/types/getall',
  getUseRuleData : '/api/payroll/relief-management/actions/getall',
  getReliefCurrencyData : '/api/currency/getdefault/list',
  saveReliefGlobalData : '/api/payroll/relief-management/grades/create',
  updateReliefGlobalData : '/api/payroll/relief-management/global/update',
  reliefGradeData : '/api/payroll/relief-management/grades/getall',
  payGroupGradeData : '/api/payroll/relief-management/paygroups/getall',
  employeeData : '/api/payroll/relief-management/employees/getall',
  saveReliefGradesData : '/api/payroll/relief-management/grades/create',
  updateReliefGradesData : '/api/payroll/relief-management/grades/update',
  updateReliefPayGroupData : '/api/payroll/relief-management/paygroups/update',
  updateReliefEmployeeData : '/api/payroll/relief-management/employees/update',
  getReliefGradesData : '/api/payroll/relief-management/grades/get',
  getPayGroupData : '/api/payroll/relief-management/paygroups/get',
  getEmployeeData : '/api/payroll/relief-management/employees/get',
  getReliefProfileData : '/api/payroll/relief-management/get',
  deleteRelief : '/api/payroll/relief-management/delete',
  updateReliefProfile : '/api/payroll/relief-management/update',
  getFixedDeductionData : '/api/payroll/tax-management/fixed-deductions/getall',
  updateFixedDeductionData : '/api/payroll/relief-management/active-fixed-deduction/update',
  saveReliefPayroll : '/api/payroll/relief-management/paygroups/create',
  saveReliefEmployeeData : '/api/payroll/relief-management/employees/create',
  saveReliefGradeData : '/api/payroll/relief-management/grades/create',
  getReliefGradeListData: '/api/grade/getlist',
  getReliefPayGroupListData : '/api/payroll/paygroup/getall',
  getReliefEmployeeListData : '/api/employees/active',
  deleteReliefEmployee : '/api/payroll/relief-management/employees/delete',
  deleteReliefPayGroup : '/api/payroll/relief-management/paygroups/delete',
  deleteReliefGrade : '/api/payroll/relief-management/grades/delete'
}

export const TAX_MANAGEMENT_URLs = {
  getTaxManagementData : '/api/payroll/profile/getlist',
  getTaxManagementProfileData : '/api/payroll/tax-management/getall',
  updateTaxManagementProfileData : '/api/payroll/tax-management/update',
  getTaxPercentageGrossData : '/api/payroll/tax-management/pay-groups/getall',
  updatePercentGrossData : '/api/payroll/tax-management/paygroup/update',
  getTaxStandard : '/api/payroll/tax-management/detail/getall',
  saveTaxStandard : '/api/payroll/tax-management/detail/create',
  updateTaxStandard : '/api/payroll/tax-management/detail/update',
  deleteTaxStandard : '/api/payroll/tax-management/detail/delete',
  getRangePercent : '/api/payroll/tax-management/percent/getall',
  deleteRangePercent : '/api/payroll/tax-management/percent/delete',
  saveRangePercent : '/api/payroll/tax-management/percent/create',
  updateRangePercent : '/api/payroll/tax-management/percent/update',
  getRangeValue : '/api/payroll/tax-management/amount/getall',
  deleteRangeValue : '/api/payroll/tax-management/amount/delete',
  saveRangeValue : '/api/payroll/tax-management/amount/create',
  updateRangeValue : '/api/payroll/tax-management/amount/update',
  getTaxFixedDeductionListData : '/api/payroll/tax-management/fixed-deductions/getall',
  updateTaxFixDeduction : '/api/payroll/tax-management/fixed-deductions/update',
  getTaxFixedDeductionData : '/api/payroll/profile/get',
};
