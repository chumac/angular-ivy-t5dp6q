
export const APPRAISAL_FORMS_DATA_URLs = {
  finalScore: '/api/measure/performance/review/my/final-score/get',

  getEmployeeReviewForms: '/api/measure/performance/reviewform-emp-detail/my/getbyplanID',
  getLineManagerReviewForms: '/api/measure/performance/reviewform-emp-detail/lm/get',
  getLineManagerTwoReviewForms: '/api/measure/performance/reviewform-emp-detail/reviewer-assessing/get',
  getAcceptRejectReviewForms: '/api/measure/performance/reviewform-emp-detail/accept-reject/my/getbyplanID',
  getReviewerReviewForms: '/api/measure/performance/reviewform-emp-detail/reviewer/get',

  getModerationReviewForms: '/api/measure/performance/reviewform-emp-detail/moderation/getbyplanID',
  getHRReviewForms: '/api/measure/performance/reviewform-emp-detail/hr/getbyplanID',

  getReviewWorkflowProcessList: '/api/measure/performance/review/workflow-process/my/get',
  getReviewWorkflowProcessItem: '/api/measure/performance/review/workflow-process/getbyid',

  getEmployeeInformationReportKey: '/api/measure/performance/employee-information/reporting',

  getEmployeePageScore: '/api/measure/performance/review/employee-page-score/get',

  getEmployeeConfirmationStatus: '/api/measure/performance/employee-confirmation-classification/get'
};
