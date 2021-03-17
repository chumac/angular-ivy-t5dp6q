export const REVIEW_WORKFLOW_PROCESS_DATA_URLs = {
  getData: '/api/measure/performance/review/workflow-process/my/get',
  getDataByWorkflowProcessId: '/api/measure/performance/review/workflow-process/getbyid',

  startReview: '/api/measure/performance/review/workflow-process/reviewer/review-start',
  startReviewModeration: '/api/measure/performance/review/workflow-process/moderation/review-start',
  startReviewHR: '/api/measure/performance/review/workflow-process/hr/review-start',

  completeReview: '/api/measure/performance/review/workflow-process/reviewer/review-complete',
  addComment: '/api/measure/performance/review/reviewer/add-comment',
  completeModeration: '/api/measure/performance/review/moderation/moderate-single/complete-section',
  completeAppraisal: '/api/measure/performance/review/hr/close-single',

  initializeAppraisal: '/api/measure/performance/initialize/hr',

  reappraise: '/api/measure/performance/reappraise',
  restart: '/api/measure/performance/hr/review/restart/get',

  moveToHR: '/api/measure/performance/review/move-to-hr',
  moveToModeration: '/api/measure/performance/review/move-to-moderator',

  rerouteHR: '/api/measure/performance/review/reroute/hr/create',
  rerouteModeration: '/api/measure/performance/review/reroute/moderator/create',
  rerouteReviewer: '/api/measure/performance/review/reroute/reviewer/create',

  editAppraisal: '/api/measure/performance/review/lm/appraisal-edit',
  cancelEdit: '/api/measure/performance/review/lm/appraisal-edit-cancel'
};
