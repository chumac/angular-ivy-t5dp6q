export const COMMENDATIONS_URLs = {
    loadApprovedData: '/api/commendation/hr/approved/getall',
    loadAwaitingApprovalData: '/api/commendation/hr/awaiting-approval/getall',
    loadRoleTypes: '/api/disciplinary-roles/getlist',
    add: '/api/commendation/hr/create',
    update: '/api/commendation/hr/awaiting-approval/update',
    delete: '/api/commendation/hr/delete'
}

export const CONFIRMATIONS_URLs = {
    loadApprovedData: '/api/confirmation/hr/approved/getall',
    loadAwaitingApprovalData: '/api/confirmation/hr/awaiting-approval/getall',
    loadTransactionTypes: '/api/utilities/transaction-type/getlist',
    add: '/api/confirmation/hr/create',
    update: '/api/confirmation/hr/awaiting-approval/update',
    delete: '/api/confirmation/hr/delete'
}

export const CUSTOM_USER_GROUPS_URLs = {
  loadApprovedData: '/api/staff-custom-group-employee/hr/GetAll',
  loadAwaitingApprovalData: '',
  loadDataByGroupId: '/api/staff-custom-group-employee/hr/get',
  loadCustomGroup: '/api/staff-custom-group/hr/GetAll',
  loadValues: '/api/staff-custom-group/hr/restricted-values/list',
  add: '/api/staff-custom-group-employee/hr/create',
  update: '/api/staff-custom-group-employee/hr/update',
  delete: '/api/staff-custom-group-employee/hr/delete'
}

export const DISCIPLINARY_ACTIONS_URLs = {
  create: '/api/disciplinary-actions/hr/create',
  approvedData: '/api/disciplinary-actions/hr/approved/getall',
  approvedDataById: '/api/disciplinary-actions/hr/approved/get',
  awaitingData: '/api/disciplinary-actions/hr/awaiting-approval/getall',
  awaitingById: '/api/disciplinary-actions/hr/awaiting-approval/get',
  update: '/api/disciplinary-actions/hr/awaiting-approval/update',
  delete: '/api/disciplinary/hr/delete',
  takeActionTypes: '/api/utilities/disciplinary-take-action/getlist',
  recommendationsList: '/api/disciplinary-actions-list/getall',
  actionRoleTypes: '/api/disciplinary-roles/getlist',
  recommendation: '/api/disciplinary-recommendation/get',
}

export const PROMOTIONS_URLs = {
  import: '/api/promotion/hr/import',
  create: '/api/promotion/hr/create',
  getConfirmed: '/api/promotion/hr/confirmed/get',
	getUnconfirmed: '/api/promotion/hr/unconfirmed/get',
	getPromotionById: '/api/promotion/hr/single/get',
  updateApproved: '/api/promotion/hr/update-approved',
  updateUnsubmitted: 'api/promotion/hr/update-unsubmitted',
  reverse: '/api/promotion/hr/reverse',
  delete: '/api/promotion/hr/delete',
  deleteUnsubmitted: '',
  getUnsubmitted: '/api/promotion/hr/unsubmitted/getall',
  getApproved: '/api/promotion/hr/approved/getall',
  getAwaiting: '/api/promotion/hr/awaiting-approval/getall',
  paygrades: '/api/grade/getall',
  allPaygroups: '/api/paygroup/getall',
  paygroupsByGrade: '/api/paygroup/get-by-pay-grade',
  arrearStatus: '/api/utilities/promotion-arrear-status/getlist',
  actions: '/api/utilities/promotion-actions/getlist',
  submissionProcess: '/api/utilities/promotion-submittion-way/getlist',
  submitIndividual: '/api/promotion/hr/individual-submit',
  submitBatch: '/api/promotion/hr/batch-submit',
  currentGradeAndPaygroup: '/api/promotion/employee-current-grade-paygroup/get'
}

export const DISCIPLINARY_ROLES_URLs = {
  create: '/api/disciplinary-roles/hr/create',
  getAll: '/api/disciplinary-roles/hr/getall',
  getById: 'api/disciplinary-roles/hr/get',
  update: '/api/disciplinary-roles/hr/update',
  delete: 'api/disciplinary-roles/hr/delete'
}

export const REINSTATE_URLs = {
  create: '/api/separation/hr/re-instate',
  getAll: '/api/separation/hr/separation-can-reinstate-list/get',
  update: '/api/disciplinary-roles/hr/update',
  delete: 'api/disciplinary-roles/hr/delete',
  employeeList:'/api/employees/inactive',
  recordCategory:'/api/utilities/get-record-categories',
}

export const SEPARATIONS_URLs = {
  allData:'/api/separation/hr/getall',
  add:'/api/separation/hr/create',
  update:'/api/separation/hr/update',
  processed:'/api/separation/hr/processed/get',
  unProcessed:'api/separation/hr/un-processed/get',
  payrollProcessed:'api/separation/hr/processed-with-payroll/get',
  reactivate:'/api/separation/hr/reactivate/{employeeID}/{separationID}',
  delete:'/api/separation/hr/delete',

  ///drop downs

  employeeList:'/api/employees/hr-staff-list/get',
  status:'/api/utilities/separation-status/getlist',
  reasons:'/api/employeestatus/getAll',
  allowance:'/api/payroll/fixedallowance/getlist',
  currency:'/api/currency/getdefault/list',

}

export const TRANSFERS_URLs = {
  process: '/api/transfer/hr/import/process',
  import:'/api/transfer/hr/import',
  all:'/api/transfer/hr/import/getall',
  new:'/api/transfer/hr/import/get-new',
  status:'/api/utilities/transfer-import-status/getlist',
  failed:'/api/transfer/hr/import/get-failed',
  single:'/api/transfer/hr/import/get-single/{id}',
  staff:'/api/transfer/hr/import/get-by-staffnumber/{staffNumber}',
  batch:'/api/transfer/import/get-batch-identifier',
  designation:'/api/designation/list',
  Position:'/api/position/list',
  location:'/api/transfer/employee-current-location-code/get',
  specificType:'/api/structuretype/list',
  specificStructure:'/api/structure-detail/get-by-analysis-id',
  costCenter:'/api/structure-detail/cost-center-code',
  currentJob:'/api/transfer/employee-current-designation-position/get',
  // getStructure:'/api/transfer/cost-centre-parent/get',
  getStructure:'/api/enterprise-structure/cost-centre-parent/get',


  add:'/api/transfer/hr/create',
  approved:'/api/transfer/hr/approved/getall',
  unApproved:'/api/transfer/hr/awaiting-approval/getall',
  update:'/api/transfer/hr/awaiting-approval/update',
  delete:'/api/transfer/hr/delete',
  reverse:'/api/transfer/hr/reverse/{transferID}',


  treeRoot:'/api/enterprise-structure/tree/hr/get',
}

export const MUlTIJOBROLE_URL = {
  create: '/api/multirole/hr/create',
  getAll: '/api/multirole/hr/get',
  update: '/api/multirole/hr/update',
  delete: '/api/multirole/hr/delete',
  employeeList:'/api/employees/hr-staff-list/get',
  positionList:'/api/position/list',
}

export const CUSTOM_FORM_URLs = {
  formBulderPage: '/d/workforce/employee-profiles/admin/custom-form-builder',
  loadCustomForms: '/api/custom/custom-forms/getall',
  loadDataSetTypes: '/api/custom/form/standard-datasets/list/getall',
  loadCascadeDataSetTypes: '/api/custom/form/cascade-datasets/list/getall',
  loadDataSets: '/api/custom/form/standard-datasets/render/list/get',
  loadCascadeDataSets: '/api/custom/form/cascade-datasets/render/list/get',
  loadTypeList: '/api/custom/custom-forms/get/types',
  loadAreaList: '/api/custom/custom-forms/get/area-types',
  loadScopeList: '/api/custom/custom-forms/get/scope-types',
  loadEligibilityList: '/api/custom/custom-forms/get/eligibility-types',
  loadWorkFlowList: '/api/workflow/definitions/getall',
  add: '/api/custom/custom-forms/create',
  update: '/api/custom/custom-forms/update',
  delete: '/api/custom/custom-forms/delete'
}

export const PROCESS_FORM_DEFINITION_URLs = {
  customProcessMapUrl: '/d/workforce/employee-profiles/admin/custom-process-map',
  getProcessFormDefinitionData: '/api/custom/custom-process-definition/published/getall',
  loadAreaList: '/api/custom/custom-process-definition/get/area-type',
  add: '/api/custom/custom-process-definition/create',
  update: '/api/custom/custom-process-definition/update',
  delete: '/api/custom/custom-process-definition/delete'
}

export const CUSTOM_PROCESS_MAP_URLs = {
  getCustomProcessMapData: '/api/custom/custom-process-forms/hr/getall',
  loadRolesList: '/api/heart-beat/get',
  loadPermissionsList: '/api/heart-beat/get',
  loadCustomFormList: '/api/custom/custom-forms/process-attachment/getall',
  add: '/api/custom/custom-process-forms/hr/attach',
  update: '/api/custom/custom-process-forms/hr/update/attach',
  delete: '/api/custom/custom-process-forms/hr/delete'
}