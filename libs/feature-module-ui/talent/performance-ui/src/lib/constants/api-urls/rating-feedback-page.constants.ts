
export const RATING_FEEDBACK_PAGE_DATA_URLs = {
  data: '/api/measure/performance/rating-review-feedback/my/get',
  lineManagerData: '/api/measure/performance/rating-review-feedback/lm/get',
  lineManagerTwoData: '/api/measure/performance/rating-review-feedback/reviewer-assessing/get',

  pageData: '/api/measure/performance/reviewform-emp-detail/my/get',
  lineManagerPageData: '/api/measure/performance/reviewform-emp-detail/reviewers/getassetbyID',
  lineManagerTwoPageData: '/api/measure/performance/reviewform-emp-detail/reviewers/getassetbyID',
  reviewerPageData: '/api/measure/performance/reviewform-emp-detail/reviewers/getassetbyID',
  moderatorPageData: '/api/measure/performance/reviewform-emp-detail/moderation/getassetbyID',
  hrPageData: '/api/measure/performance/reviewform-emp-detail/hr/getassetbyID',

  completeSection: '/api/measure/performance/rating-review-feedback/my/complete-section',
  lineManagerCompleteSection: '/api/measure/performance/rating-review-feedback/lm/complete-section',
  lineManagerTwoCompleteSection: '/api/measure/performance/rating-review/reviewer-assessing/complete-section',

  saveAndContinue: '/api/measure/performance/rating-review-feedback/my/save-and-continue',
  lineManagerSaveAndContinue: '/api/measure/performance/rating-review-feedback/lm/save-and-continue',
  lineManagerTwoSaveAndContinue: '/api/measure/performance/rating-review-feedback/reviewer-assessing/save-and-continue',

  acceptRejectAllData: '/api/measure/performance/rating-review-feedback/accept-or-reject/my/get',
  acceptRejectDataByLineManager: '/api/measure/performance/rating-review-feedback/accept-or-reject/my/get',

  reviewerAllData: '/api/measure/performance/rating-review-feedback/reviewer/get',
  reviewerDataByLineManager: '/api/measure/performance/rating-review-feedback/reviewer/get',

  moderatorAllData: '/api/measure/performance/rating-review-feedback/moderation/get',
  moderatorDataByLineManager: '/api/measure/performance/rating-review-feedback/moderation/get',

  hrAllData: '/api/measure/performance/rating-review-feedback/hr/get',
  hrDataByLineManager: '/api/measure/performance/rating-review-feedback/hr/get',

  supervisors: '/api/measure/performance/my/line-manager/get',
  reviewerSupervisors: '/api/measure/performance/employee-line-manager/get'
};
