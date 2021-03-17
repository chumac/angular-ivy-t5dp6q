export const COMPREHENSIVE_DATA = {
  getData: '/api/employees/hr/comprehensive-info'
}

export const IMAGE = {
  profilePhoto: '/api/employees/profile-image',
  awaitingApprovalProfiePhoto: '/api/employees/profile-image/getawaiting',
  profilePhotoUpdate: '/api/employees/profile-image/update',
  deleteAwaitingApprovalData: '/api/employees/hr/general-info/deleteawaiting/',
};

export const GENERAL_INFORMATION = {
  approvedData: '/api/employees/hr/general-info',
  awaitingApprovalData: '/api/employees/hr/general-info/getawaiting',
  create: '/api/employees/hr/general-info/create',
  update: '/api/employees/hr/general-info/update',
  updateAwaitingApprovalData: '/api/employees/hr/general-info/updateawaiting',
  deleteAwaitingApprovalData: '/api/employees/hr/general-info/deleteawaiting',
}

export const CONTACT_INFORMATION = {
  approvedData: '/api/employees/hr/contactinfo/get',
  awaitingApprovalData: '/api/employees/hr/contactinfo/getawaiting',
  history: '/api/employees/hr/contactinfo/history/get',
  create: '/api/employees/hr/contactinfo/create',
  update: '/api/employees/hr/contactinfo/update',
  updateAwaitingApprovalData: '/api/employees/hr/contactinfo/updateawaiting',
  deleteAwaitingApprovalData: '/api/employees/hr/contactinfo/deleteawaiting',
}

export const IDENTIFICATION_INFORMATION = {
  approvedData: '/api/employees/hr/identification-info/get',
  awaitingApprovalData: '/api/employees/hr/identification-info/getawaiting',
  create: '/api/employees/hr/identification-info/create',
  update: '/api/employees/hr/identification-info/update',
  updateAwaitingApprovalData: '/api/employees/hr/identification-info/updateawaiting',
  deleteAwaitingApprovalData: '/api/employees/hr/identification-info/deleteawaiting',

  grade:'/api/grade/getall',
  position:'/api/position/getall',
  payGroup: '/api/paygroup/getall',
  paygroupByGradeId: '/api/paygroup/get-by-pay-grade',
  jobTitle:'/api/designation/list',
  actingJobTitle:'/api/designation/list',
  paymentMode:'/api/utilities/payment-mode/getlist',
  reportTo:'/api/employees/hr-staff-list/get',
  backUpOfficer:'/api/employees/hr-staff-list/get',
}

export const PAYMENT_INFORMATION = {
  approvedData: '/api/employees/hr/payment-details/get',
  awaitingApprovalData: '/api/employees/hr/payment-details/getawaiting',
  history: '/api/employees/hr/payment-details/history/get',
  create: '/api/employees/hr/payment-details/create',
  update: '/api/employees/hr/payment-details/update',
  updateAwaitingApprovalData: '/api/employees/hr/payment-details/updateawaiting',
  deleteAwaitingApprovalData: '/api/employees/hr/payment-details/deleteawaiting'
}

export const PROFESSIONAL_QUALIFICATIONS = {
  approvedData: '/api/employees/hr/professional-qualification/getall',
  approvedDataItem: '/api/employees/hr/professional-qualification/get',
  awaitingApprovalData: '/api/employees/hr/professional-qualification/getawaiting',
  add: '/api/employees/hr/professional-qualification/create',
  update: '/api/employees/hr/professional-qualification/update',
  updateAwaitingApprovalData: '/api/employees/hr/professional-qualification/updateawaiting',
  deleteApprovedData: '/api/employees/hr/professional-qualification/archive',
  deleteAwaitingApprovalData: '/api/employees/hr/professional-qualification/deleteawaiting',
  documentApproved: '/api/employees/hr/professional-qualification-document',
  documentAwaitingApproval: '/api/employees/hr/professional-qualification-document/getawaiting'
}

export const EDUCATIONAL_HISTORY = {
  approvedData: '/api/employees/hr/education-history/getall',
  approvedDataItem: '/api/employees/hr/education-history/get',
  awaitingApprovalData: '/api/employees/hr/education-history/getawaiting',
  add: '/api/employees/hr/education-history/create',
  update: '/api/employees/hr/education-history/update',
  updateAwaitingApprovalData: '/api/employees/hr/education-history/updateawaiting',
  deleteApprovedData: '/api/employees/hr/education-history/archive',
  deleteAwaitingApprovalData: '/api/employees/hr/education-history/deleteawaiting',
  documentApproved: '/api/employees/hr/education-history-document',
  documentAwaitingApproval: '/api/employees/hr/education-history-document/getawaiting',
  institutionsList: '/api/institution/list/getall',
  allInstitutionsList: '/api/institution/getall',
  countryList:'/api/institution/countries/getAll'
}

export const PERSONAL_REFEREES = {
  approvedData: '/api/employees/hr/personal-referee/getall',
  approvedDataItem: '/api/employees/hr/personal-referee/get',
  awaitingApprovalData: '/api/employees/hr/personal-referee/getawaiting',
  add: '/api/employees/hr/personal-referee/create',
  update: '/api/employees/hr/personal-referee/update',
  updateAwaitingApprovalData: '/api/employees/hr/personal-referee/updateawaiting',
  deleteApprovedData: '/api/employees/hr/personal-referee/archive',
  deleteAwaitingApprovalData: '/api/employees/hr/personal-referee/deleteawaiting',
  documentApproved: '/api/employees/hr/personal-referee-document',
  documentAwaitingApproval: '/api/employees/hr/personal-referee-document/getawaiting',
  approvedImage:'/api/employees/hr/personal-referee-image',
  awaitingApprovalImage: '/api/employees/hr/personal-referee-image/getawaiting'
}

export const GUARANTORS = {
  approvedData: '/api/employees/hr/personal-guarantor/getall',
  approvedDataItem: '/api/employees/hr/personal-guarantor/get',
  awaitingApprovalData: '/api/employees/hr/personal-guarantor/getawaiting',
  add: '/api/employees/hr/personal-guarantor/create',
  update: '/api/employees/hr/personal-guarantor/update',
  updateAwaitingApprovalData: '/api/employees/hr/personal-guarantor/updateawaiting',
  deleteApprovedData: '/api/employees/hr/personal-guarantor/archive',
  deleteAwaitingApprovalData: '/api/employees/hr/personal-guarantor/deleteawaiting',
  documentApproved: '/api/employees/hr/personal-guarantor-document',
  documentAwaitingApproval: '/api/employees/hr/personal-guarantor-document/getawaiting',
  approvedImage:'/api/employees/hr/personal-guarantor-image',
  awaitingApprovalImage: '/api/employees/hr/personal-guarantor-image/getawaiting'
}

export const BENEFICIARY = {
  approvedData: '/api/employees/hr/beneficiary/getall',
  approvedDataItem: '/api/employees/hr/beneficiary/get',
  awaitingApprovalData: '/api/employees/hr/beneficiary/getawaiting',
  add: '/api/employees/hr/beneficiary/create',
  update: '/api/employees/hr/beneficiary/update',
  updateAwaitingApprovalData: '/api/employees/hr/beneficiary/updateawaiting',
  deleteApprovedData: '/api/employees/hr/beneficiary/archive',
  deleteAwaitingApprovalData: '/api/employees/hr/beneficiary/deleteawaiting',
  approvedImage:'/api/employees/hr/beneficiary-image',
  awaitingApprovalImage: '/api/employees/hr/beneficiary-image/getawaiting'
}

export const DEPENDENTS = {
  approvedData: '/api/employees/hr/dependent/getall',
  approvedDataItem: '/api/employees/hr/dependent/get',
  awaitingApprovalData: '/api/employees/hr/dependent/getawaiting',
  add: '/api/employees/hr/dependent/create',
  update: '/api/employees/hr/dependent/update',
  updateAwaitingApprovalData: '/api/employees/hr/dependent/updateawaiting',
  deleteApprovedData: '/api/employees/hr/dependent/archive',
  deleteAwaitingApprovalData: '/api/employees/hr/dependent/deleteawaiting',
  approvedImage:'/api/employees/hr/dependent-image',
  awaitingApprovalImage: '/api/employees/hr/dependent-image/getawaiting',
  refreshData:'/api/employees/hr/dependent-list'
}

export const WORK_HISTORY = {
  approvedData: '/api/employees/hr/previous-employer/getall',
  approvedDataItem: '/api/employees/hr/previous-employer/get',
  awaitingApprovalData: '/api/employees/hr/previous-employer/getawaiting',
  add: '/api/employees/hr/previous-employer/create',
  update: '/api/employees/hr/previous-employer/update',
  updateAwaitingApprovalData: '/api/employees/hr/previous-employer/updateawaiting',
  deleteApprovedData: '/api/employees/hr/previous-employer/archive',
  deleteAwaitingApprovalData: '/api/employees/hr/previous-employer/deleteawaiting',
  documentApproved:'/api/employees/hr/previous-employer-document',
  documentAwaitingApproval: '/api/employees/hr/previous-employer-document/getawaiting'
}

export const FAMILY_INFORMATION = {
  approvedData: '/api/employees/hr/family-information/getall',
  approvedDataItem: '/api/employees/hr/family-information/get',
  awaitingApprovalData: '/api/employees/hr/family-information/getawaiting',
  add: '/api/employees/hr/family-information/create',
  update: '/api/employees/hr/family-information/update',
  updateAwaitingApprovalData: '/api/employees/hr/family-information/updateawaiting',
  deleteApprovedData: '/api/employees/hr/family-information/archive',
  deleteAwaitingApprovalData: '/api/employees/hr/family-information/deleteawaiting',
  documentApproved: '/api/employees/hr/family-information-document',
  documentAwaitingApproval: '/api/employees/hr/family-information-document/getawaiting',
  approvedImage:'/api/employees/hr/family-information-image',
  awaitingApprovalImage: '/api/employees/hr/family-information-image/getawaiting'
}

export const TRAINING_HISTORY = {
  approvedData: '/api/training/hr/employee-training-history/get',
}

export const COMPETENCY_PROFILE = {
  approvedData: '/api/competency/hr/employee-competency-profile/get',
}

export const PROMOTION_HISTORY = {
  approvedData: '/api/promotion/hr/employee-promotion-history/get',
  add:'/api/promotion/hr/create',
  confirmed:'/api/promotion/hr/confirmed/get',
  unConfirmed:'/api/promotion/hr/unconfirmed/get',
  update:'/api/promotion/hr/update/{id}',
  delete:'/api/promotion/hr/delete/{id}',
  reverse:'/api/promotion/hr/reverse/{id}',
  import:'/api/promotion/hr/import',
}

export const TRANSFER_HISTORY = {
  approvedData: '/api/transfer/hr/employee-transfer-history/get',

}

export const VACATION_HISTORY = {
  approvedData: '/api/leave-record/hr/employee-vacation-history/get',
}

export const PERFORMANCE_HISTORY = {
  approvedData: '/api/measure/performance/hr/employee-performance-history/get',
}

export const DISCIPLINARY_ACTIONS = {
  approvedData: '/api/disciplinary/hr/employee-disciplinary-actions/get'
}

export const CONFIRMATION_INFORMATION = {
  approvedData: '/api/confirmation/hr/employee-confirmation-info/get'
}

export const PAYROLL_PAYMENT_HISTORY = {
  approvedData: '/api/payroll/hr/employee-payroll-payment-history/get',
}

export const LOAN_HISTORY = {
  approvedData: '/api/loan/hr/employee-loan-history/get',
}

export const WORKFLOW_TRANSACTIONS = {
  approvedData: '/api/workflow/hr/employee-workflow-transaction/get',
}

export const TEAM = {
  approvedData: '/api/employees/hr/employee-team/get',
}

export const SEPARATION = {
  approvedData: '/api/separation/hr/employee-separation-data/get',
}

// HR Custom data for crud routes
export const HR_CUSTOM_DATA_FORM_URLs = {
  getHrCustomDataFormData: '/api/custom/hr/employee-forms/get',
  add: '/api/custom/custom-data-form/hr/create',
  update: '/api/custom/custom-data-form/hr/update',
  submitData: '/api/custom/custom-data-form/hr/submit',
  deleteData: '/api/custom/custom-data-form/hr/delete',
}
