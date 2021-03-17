
export const MY_EXIT_DATA_URLs = {
  agreement: '/api/utilities/agreement/get',
  submitResignation: '/api/exit/my-resignation/create',
  getExitCompletedUrl: '/api/exit/my-resignation/exit-completed-URL',
  getExitInterviewStatus: '/api/exit/my-resignation/exit-interview-status',
  getReviewChecklist: '/api/exit/my-resignation/handover-checklist/get',
  interviewLink: '/api/exit/my-resignation/exit-completed-URL',
  getChecklistTransactions: '/api/exit/my-resignation-checklist-transaction/get',
  submitChecklistTransaction: '/api/exit/my-resignation-checklist-transaction/update',
  myStatus: '/api/exit/my-resignation-process/get',
  handoverChecklist: '/api/exit/my-resignation/handover-checklist/get',
  updateChecklist: '/api/exit/my-checklist-process/update',
  getProcessChecklist: '/api/exit/my-checklist-process/get',
  getProcessList: '/api/exit/my-resignation-process/get',
  getSubmittedLetter: '/api/exit/my-resignation/getletter',
  getIntiationStatus: '/api/exit/process-initiated',
  cancelProcess: '/api/exit/cancel-process',

  employeeProcessInitiated: '/api/exit/employee-process-initiated',
  document: '/api/exit/my-resignation-document/getletter',
  startInterview: '/api/exit/start-interview',
  interviewStatus: '/api/exit/employee-interview-status',
  getCustomFormData: '/api/custom/custom-data-form-lists/my/get',
};

export const MY_RESIGNATION_DATA_URLs = {
  resignationTypes: '/api/exit/separation-type/getlist',
  employeeSubordinates: '/api/employees/my-reportsto-team/get'
}

export const QUEUE_DATA_URLs = {
  getMyQueue: '/api/exit/my-response-queue/getall',
  getAdminQueue: '/api/exit/hr/response-queue/getall',
  saveMyQueue: '',
  saveTeamQueue: '',
  getInterviewUrl: '/api/exit/my-resignation/exit-completed-URL'
}

export const LM_EXIT_DATA_URLs = {
  getProxyResignations: '/api/exit/proxy-resignations/getAll',
  createProxyResignation: '/api/exit/employee-resignation/create',
  getLetter: '/api/exit/employee-resignation/getletter',
  getLetterDocument: '/api/exit/employee-resignation-document/getletter',
  getStatus: '/api/exit/employee-resignation/status/get',
  getResponseQueue: '/api/exit/employee-response-queue/get',
  updateChecklist: '/api/exit/employee-checklist-process/update',
  getHandoverChecklist: '/api/exit/employee-handover-checklist/get',
  getProcessChecklist: '/api/exit/employee-checklist-process/get',
  getTeamQueue: '/api/exit/team-queue/get',
  updateTeamQueue: '/api/exit/team-queue/update',
  getChecklistTransactions: '/api/exit/employee-resignation-checklist-transaction/get',
  submitChecklistTransaction: '/api/exit/employee-resignation-checklist-transaction/update',
  interviewStatus: '/api/exit/employee-interview-status/',
  getProcessList: '/api/exit/employee-resignation/status/get',
  profilePhoto: '/api/employees/profile-image'
}

export const HR_EXIT_DATA_URLs = {
  getStatus: '/api/exit/hr/employee-status/get',
  getEmployeeLetter: '/api/exit/hr/employee-resignation/get',
  getFinalizeWorkflow: '/api/exit/hr/employee-status/get',
  getProcess: '/api/exit/hr/employee-checklist-process/get',
  getEmployeeProcess: '/api/exit/employee-resignation/status/get',
  createChecklist: '/api/exit/hr/employee-checklist/create',
  updateChecklist: '/api/exit/hr/employee-checklist-process/update',
  getProcessChecklist: '/api/exit/hr/employee-checklist-process/get',
  getEmployeeReviewChecklist: '/api/exit/hr/employee-resignation/handover-checkList',
  getAllLetters: '/api/exit/hr/employee-resignation/getall',
  getResponseQueue: '/api/exit/hr/employee-resignation/getall',
  getResponses: '',
  closeAllChecklists: '/api/exit/hr/close-all-checklist',
  document: '/api/exit/hr/employee-resignation-document/getletter',
  createEmployeeResignation: '/api/exit/hr/employee-resignation/create',
  getChecklistTransactions: '/api/exit/hr/employee-resignation-checklist-transaction/get',
  submitChecklistTransaction: '/api/exit/hr/employee-resignation-checklist-transaction/update',
  creatSeparationTransaction: '/api/exit/hr/employee-resignation-transaction/create',
  reportUrl: '/api/exit/process-report/get'
}

export const CHECKLIST_DATA_URLs = {
  getValidationRole: '/api/exit/checklist-validator-role/getlist',
  create: '/api/exit/hr/resignation-checklist/create',
  update: '/api/exit/hr/resignation-checklist/update',
  getAll: '/api/exit/hr/resignation-checklist/getall',
  getPending: '/api/exit/checklist-review/getall',
  getSingle: 'api/exit/hr/resignation-checklist/get',
  getStatus: '/api/exit/hr/employee-status/get',
  archive: '/api/exit/hr/resignation-checklist/archive',
  createChecklist: '/api/exit/hr/employee-checklist/create',
  updateChecklist: '/api/exit/hr/employee-checklist-process/update',
  getProcessChecklist: '/api/exit/hr/employee-checklist-process/get',
  submittedResignations: '',
  getResponses: '',
  positions: '/api/position/list',
  roles: '/api/securityrole/get-roles'
}

export const INTERVIEW_DATA_URLs = {
  getValidationRole: '',
  save: '',
  saveQuestion: '',
  update: '',
  getAll: '',
}
