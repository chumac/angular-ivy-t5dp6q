
export const RATING_PAGE_DATA_URLs = {
  data: '/api/measure/performance/rating-review/my/get',
  lineManagerData: '/api/measure/performance/rating-review/lm/get',
  lineManagerTwoData: '/api/measure/performance/rating-review/reviewer-assessing/get',

  pageData: '/api/measure/performance/reviewform-emp-detail/my/get',
  lineManagerPageData: '/api/measure/performance/reviewform-emp-detail/reviewers/getassetbyID',
  lineManagerTwoPageData: '/api/measure/performance/reviewform-emp-detail/reviewers/getassetbyID',
  reviewerPageData: '/api/measure/performance/reviewform-emp-detail/reviewers/getassetbyID',
  moderatorPageData: '/api/measure/performance/reviewform-emp-detail/moderation/getassetbyID',
  hrPageData: '/api/measure/performance/reviewform-emp-detail/hr/getassetbyID',

  completeSection: '/api/measure/performance/rating-review/my/complete-section',
  lineManagerCompleteSection: '/api/measure/performance/rating-review/lm/complete-section',
  lineManagerTwoCompleteSection: '/api/measure/performance/rating-review/reviewer-assessing/complete-section',
  saveAndContinue: '/api/measure/performance/rating-review/my/save-and-continue',
  lineManagerSaveAndContinue: '/api/measure/performance/rating-review/lm/save-and-continue',
  lineManagerTwoSaveAndContinue: '/api/measure/performance/rating-review/reviewer-assessing/save-and-continue',

  acceptRejectAllData: '/api/measure/performance/rating-review/accept-or-reject/my/get',
  acceptRejectDataByLineManager: '/api/measure/performance/rating-review/accept-or-reject/my/get',

  reviewerAllData: '/api/measure/performance/rating-review/reviewer/get',
  reviewerDataByLineManager: '/api/measure/performance/rating-review/reviewer/get',

  moderatorAllData: '/api/measure/performance/rating-review/moderation/get',
  moderatorDataByLineManager: '/api/measure/performance/rating-review/moderation/get',

  hrAllData: '/api/measure/performance/rating-review/hr/get',
  hrDataByLineManager: '/api/measure/performance/rating-review/hr/get',

  supervisors: '/api/measure/performance/my/line-manager/get',
  reviewerSupervisors: '/api/measure/performance/employee-line-manager/get',

  reOpenCompletedSection: '/api/measure/performance/review-page/open'
};
