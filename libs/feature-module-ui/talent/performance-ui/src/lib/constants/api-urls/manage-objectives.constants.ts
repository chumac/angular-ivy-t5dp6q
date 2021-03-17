
export const MANAGE_OBJECTIVES_URLs = {
  getLmEmployees: '/api/employees/my-team/get',
  progressReportUrl: '/d/talent/performance/progress-report',
  manageObjectiveUrl: '/d/talent/performance/manage-objectives',
  objectiveFeedbackUrl: '/d/talent/performance/objective-feedback',

  getplans: '/api/measure/performance/plan/getCurrent',
  getPerspectives: '/api/measure/performance/perspectives/get',
  getWeightBalance: '/api/measure/performance/objectives/my/weight-balance',
  getWeightBalanceLM: '/api/measure/performance/objectives/weight-balance',
  getPreScoredLmObjectiveMasters: '/api/measure/performance/objective/lm/getPrescored',
  getLmObjectiveMasters: '/api/measure/performance/objectives/lm/get',
  getPreScoredObjectiveMasters: '/api/measure/performance/objective/my/getPrescored',
  getObjectiveMasters: '/api/measure/performance/objective-master/my/get',
  getUnSubmittedObjectives: '/api/measure/performance/objectives/my/un-submitted/get',
  getSubmittedObjectives: '/api/measure/performance/objectives/my/submitted/get', 
  getApprovedObjectives: '/api/measure/performance/objectives/my/get',
  addObjective: '/api/measure/performance/objectives/my/add',
  updateObjective: '/api/measure/performance/objectives/my/update',
  recallObjective: '/api/measure/performance/objectives/my/recall-objectives/create',
  submitObjective: '/api/measure/performance/objectives/my/final-submit',
  deleteObjective: '/api/measure/performance/objectives/my/delete',
  deleteAllObjective: '/api/measure/performance/objectives/my/objective-reset/',

  approvalAddObjective: '/api/measure/performance/objectives/lm/add',
  approvalUpdateObjective: '/api/measure/performance/objectives/lm/update',
};
