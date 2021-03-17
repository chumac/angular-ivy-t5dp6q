export const WORK_LIFE_DATA_URLs = {
  getData: '/api/employees/my-work-life-data',
  myWorkflowMessages: '/api/workflow/workflow-queue-lists/get',
  myWorkflowSubmissions: '/api/workflow/get-myworkflow-submissions',
  securityRoles: '/api/permission/employee',
  analysisDetails: '/api/employee/my-cost-center/get',
  workflowQueues: '/api/workflow/workflow-queue/lists/get',
  agreement: '/api/utilities/agreement/get',
  employeeConsent: '/api/employee/data-consent',
  hrConsent: '/api/employee/hr/data-consent'
};

export const EXTERNAL_LOOKUP_DATA_URLs = {
  getStates: '/api/state/getall',
  getCities: '/api/city/getall',
  getLgas: '/api/lga/getallLGAs',
};
