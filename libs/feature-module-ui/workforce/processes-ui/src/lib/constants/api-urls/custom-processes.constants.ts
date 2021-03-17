// HR Custom data for crud routes
export const HR_CUSTOM_DATA_FORM_URLs = {
  getHrCustomDataFormData: '/api/custom/hr/employee-forms/get',
  add: '/api/custom/custom-data-form/hr/create',
  update: '/api/custom/custom-data-form/hr/update',
  submitData: '/api/custom/custom-data-form/hr/submit',
  deleteData: '/api/custom/custom-data-form/hr/delete'
};

export const CUSTOM_FORM_URLs = {
  formBulderPage: '/d/workforce/processes/admin/custom-form-builder',
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
};

export const PROCESS_FORM_DEFINITION_URLs = {
  customProcessMapUrl: '/d/workforce/processes/admin/custom-process-map',
  getProcessFormDefinitionData:'/api/custom/custom-process-definition/published/getall',
  loadAreaList: '/api/custom/custom-process-definition/get/area-type',
  add: '/api/custom/custom-process-definition/create',
  update: '/api/custom/custom-process-definition/update',
  delete: '/api/custom/custom-process-definition/delete'
};

export const CUSTOM_PROCESS_MAP_URLs = {
  getCustomProcessMapData: '/api/custom/custom-process/hr/attached-process-forms/getall',
  loadRolesList: '/api/heart-beat/get',
  loadPermissionsList: '/api/heart-beat/get',
  loadCustomFormList: '/api/custom/custom-forms/process-attachment/getall',
  add: '/api/custom/custom-process-forms/hr/attach',
  update: '/api/custom/custom-process-forms/hr/update/attach',
  delete: '/api/custom/custom-process-forms/hr/delete'
};

export const PROCESS_TRANSACTION_REDIRECT_URLs = {
  customProcessLookupUrl: '/d/workforce/processes/custom-process-lookup',
  processFormWizardUrl: '/d/workforce/processes/process-form-wizard'
};

export const CUSTOM_PROCESS_LOOKUP_URLs = {
  getCustomProcessLookupData:'/api/custom/custom-process-definition/published/getall',
  getTeamMembers: '/api/employees/line-manager/my-team/get',
  initiateProcess: '/api/custom/custom-process/run'
};

export const SELF_PROCESS_TRANSACTION_URLs = {
  getSelfProcessTransactionData: '/api/custom/custom-process/user-data-master/my/transactions/getlist',
  delete: '/api/custom/custom-process-initiated/delete'
};

export const TEAM_PROCESS_TRANSACTION_URLs = {
  getTeamProcessTransactionData: '/api/custom/custom-process/user-data-master/lm/transactions/getlist',
  delete: '/api/custom/custom-process-initiated/delete'
};

export const REVIEWER_PROCESS_TRANSACTION_URLs = {
  getReviewerProcessTransactionData: '/api/custom/process-form/review/getAll'
};

export const HR_PROCESS_TRANSACTION_URLs = {
  getHrProcessTransactionData: '/api/custom/custom-process/user-data-master/hr/transactions/getlist',
  delete: '/api/custom/custom-process-initiated/delete'
};

export const PROCESS_FORM_WIZARD_URLs = {
  getMasterData:'/api/custom/custom-process/user-data-master/transactions/getsingle',
  getDetailData:'/api/custom/custom-process/user-data-details/transactions/getlist',
  add: '/api/custom/custom-process-forms/hr/create',
  updateDetailSelf: '/api/custom/custom-process-user/data-details/my/update',
  updateDetailLM: '/api/custom/custom-process-user/data-details/manager/update',
  updateDetailHR: '/api/custom/custom-process-user/data-details/hr/update',
  updateDetailReviewer:'/api/custom/custom-process/user-data-details/process-review/update',
  completeDetailSelf:'/api/custom/custom-process/user-data-details/my/complete',
  completeDetailLM: '/api/custom/custom-process/user-data-details/lm/complete',
  completeDetailHR: '/api/custom/custom-process/user-data-details/hr/complete',
  completeDetailReviewer:'/api/custom/custom-process/user-data-details/process-review/complete',
  submitDetailSelf: '/api/custom/custom-process/user-data-master/submit',
  submitDetailLM: '/api/custom/custom-process/user-data-master/submit',
  submitDetailHR: '/api/custom/custom-process/user-data-master/submit',
  submitDetailReviewer: '/api/custom/custom-process/user-data-master/submit',
  delete: '/api/custom/custom-process-forms/hr/delete'
};
