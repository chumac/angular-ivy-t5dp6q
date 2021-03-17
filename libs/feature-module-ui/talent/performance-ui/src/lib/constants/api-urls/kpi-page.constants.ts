
export const KPI_PAGE_DATA_URLs = {
  perspectives: '/api/measure/performance/perspectives/get',
  ratings: '/api/measure/performance/objective/ratings/getall',

  data: '/api/measure/performance/objective-transaction/review/my/get',
  lineManagerData: '/api/measure/performance/objective-transaction/review/lm/get',
  acceptRejectAllData: '/api/measure/performance/objective-transaction/review/accept-or-reject/my/get',
  acceptRejectDataByLineManager: '/api/measure/performance/objective-transaction/review/accept-or-reject/my/get',

  reviewerAllData: '/api/measure/performance/objective-transaction/review/reviewer/get',
  reviewerDataByLineManager: '/api/measure/performance/objective-transaction/review/reviewer/get',

  moderatorAllData: '/api/measure/performance/objective-transaction/review/moderation/get',
  moderatorDataByLineManager: '/api/measure/performance/objective-transaction/review/moderation/get',

  hrAllData: '/api/measure/performance/objective-transaction/review/hr/get',
  hrDataByLineManager: '/api/measure/performance/objective-transaction/review/hr/get',

  pageData: '/api/measure/performance/reviewform-emp-detail/my/get',
  lineManagerPageData: '/api/measure/performance/reviewform-emp-detail/reviewers/getassetbyID',
  acceptRejectPageData: '/api/measure/performance/reviewform-emp-detail/my/get',
  reviewerPageData: '/api/measure/performance/reviewform-emp-detail/reviewers/getassetbyID',

  moderatorPageData: '/api/measure/performance/reviewform-emp-detail/moderation/getassetbyID',
  hrPageData: '/api/measure/performance/reviewform-emp-detail/hr/getassetbyID',

  completeSection: '/api/measure/performance/objective-transaction/review/my/complete-section',
  lineManagerCompleteSection: '/api/measure/performance/objective-transaction/review/lm/complete-section',
  saveAndContinue: '/api/measure/performance/objective-transaction/review/my/save-and-continue',
  lineManagerSaveAndContinue: '/api/measure/performance/objective-transaction/review/lm/save-and-continue',

  supervisors: '/api/measure/performance/my/line-manager/get',
  reviewerSupervisors: '/api/measure/performance/employee-line-manager/get',

  reviewerData: '/api/measure/performance/objective-transaction/review/reviewer/get',

  reOpenCompletedSection: '/api/measure/performance/review-page/open',
};
