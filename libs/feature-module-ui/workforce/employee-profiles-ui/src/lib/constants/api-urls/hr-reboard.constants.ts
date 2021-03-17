export const HR_REBOARD_COMPREHENSIVE_DATA = {
  getData: '/api/employees/hr/comprehensive-info'
}

export const HR_REBOARD_PROFILE_PICTURE_DATA_URLs = {
  profilePhoto: '/api/reboard/profile-image',
  awaitingApprovalProfilePhoto: '/api/reboard/hr/profile-image/getawaiting',
  profilePhotoUpdate: '/api/reboard/hr/profile-image/updateawaiting',
  deleteAwaitingApprovalData: '/api/reboard/hr/general-info/deleteawaiting/',
};

export const HR_REBOARD_GENERAL_INFORMATION_DATA_URLs = {
  awaitingApprovalData: '/api/reboard/hr/general-info/getawaiting',
  updateAwaitingApprovalData: '/api/reboard/hr/general-info/updateawaiting',
  deleteAwaitingApprovalData: '/api/reboard/hr/general-info/deleteawaiting',
  documentAwaitingApproval: '',
  signatureImage: '/api/reboard/hr/image-signature/get',
  signatureImageAwaiting: '/api/reboard/hr/image-signature/getawaiting',
}

export const HR_REBOARD_CONTACT_DATA_URLs = {
  getData: '/api/reboard/hr/contactinfo/get',
  awaitingApprovalData: '/api/reboard/hr/contactinfo/getawaiting',
  history: '/api/reboard/hr/contactinfo/history/get',
  updateData: '/api/reboard/hr/contactinfo/update',
  updateAwaitingApprovalData: '/api/reboard/hr/contactinfo/updateawaiting',
  deleteAwaitingApprovalData: '/api/reboard/hr/contactinfo/deleteawaiting',
  nextOfKinPhoto: '/api/reboard/hr/next-of-kin-image',
  documentAwaitingApproval: '',
}

export const HR_REBOARD_IDENTIFICATION_DATA_URLs = {
  awaitingApprovalData: '/api/reboard/hr/identification-info/getawaiting',
  updateAwaitingApprovalData: '/api/reboard/hr/identification-info/updateawaiting',
  deleteAwaitingApprovalData: '/api/reboard/hr/identification-info/deleteawaiting',
  signatureImage: '/api/reboard/hr/identification-signature/get',


  grade:'/api/grade/getall',
  position:'/api/position/getall',
  paygroup: '/api/paygroup/get-by-pay-grade',
  paygroupByGradeId: '/api/paygroup/get-by-pay-grade',
  jobTitle:'/api/designation/list',
  paymentMode:'/api/utilities/payment-mode/getlist',
  staffList:'/api/employees/hr-staff-list/get',
}

export const HR_REBOARD_PAYMENT_DATA_URLs = {
  awaitingApprovalData: '/api/reboard/hr/payment-details/getawaiting',
  history: '/api/reboard/hr/payment-details/history/get',
  updateAwaitingApprovalData: '/api/reboard/hr/payment-details/updateawaiting',
  deleteAwaitingApprovalData: '/api/reboard/hr/payment-details/deleteawaiting'
}

export const HR_REBOARD_PROFESSIONAL_QUALIFICATIONS_DATA_URLs = {
  awaitingApprovalData: '/api/reboard/hr/professional-qualification/getawaiting',
  updateAwaitingApprovalData: '/api/reboard/hr/professional-qualification/updateawaiting',
  deleteAwaitingApprovalData: '/api/reboard/hr/professional-qualification/deleteawaiting',
  documentApproved: '/api/reboard/hr/professional-qualification-document',
  documentAwaitingApproval: '/api/reboard/hr/professional-qualification-document/getawaiting'
}

export const HR_REBOARD_EDUCATIONAL_HISTORY_DATA_URLs = {
  awaitingApprovalData: '/api/reboard/hr/education-history/getawaiting',
  updateAwaitingApprovalData: '/api/reboard/hr/education-history/updateawaiting',
  createData: '/api/reboard/hr/education-history/create',
  deleteAwaitingApprovalData: '/api/reboard/hr/education-history/deleteawaiting',
  documentAwaitingApproval: '/api/reboard/hr/education-history-document/getawaiting',
  institutionsList: '/api/institution/list/getall',
  allInstitutionsList: '/api/institution/getall',
  countryList:'/api/institution/countries/getAll',

  add: '/api/reboard/hr/education-history/create',
  updata: '/api/reboard/hr/education-history/update',
  archive:  '/api/reboard/hr/education-history/archive',
  getAll: '/api/reboard/hr/education-history/getall',
  getList: '/api/reboard/hr/education-history-list',
  getSingle: '/api/reboard/hr/education-history/get',
  document: '/api/reboard/hr/education-history-document',


}

export const HR_REBOARD_REFEREES_DATA_URLs = {
  awaitingApprovalData: '/api/reboard/hr/personal-referee/getawaiting',
  updateAwaitingApprovalData: '/api/reboard/hr/personal-referee/updateawaiting',
  deleteAwaitingApprovalData: '/api/reboard/hr/personal-referee/deleteawaiting',
  documentAwaitingApproval: '/api/reboard/hr/personal-referee-document/getawaiting',
  awaitingApprovalImage: '/api/reboard/hr/personal-referee-image/getawaiting',
  add: '/api/reboard/hr/personal-referee/create'
}

export const HR_REBOARD_GUARANTORS_DATA_URLs = {
  awaitingApprovalData: '/api/reboard/hr/personal-guarantor/getawaiting',
  updateAwaitingApprovalData: '/api/reboard/hr/personal-guarantor/updateawaiting',
  deleteAwaitingApprovalData: '/api/reboard/hr/personal-guarantor/deleteawaiting',
  documentAwaitingApproval: '/api/reboard/hr/personal-guarantor-document/getawaiting',
  awaitingApprovalImage: '/api/reboard/hr/personal-guarantor-image/getawaiting'
}

export const HR_REBOARD_BENEFICIARY_DATA_URLs = {
  awaitingApprovalData: '/api/reboard/hr/beneficiary/getawaiting',
  updateAwaitingApprovalData: '/api/reboard/hr/beneficiary/updateawaiting',
  deleteAwaitingApprovalData: '/api/reboard/hr/beneficiary/deleteawaiting',
  awaitingApprovalImage: '/api/reboard/hr/beneficiary-image/getawaiting',

  add: '/api/reboard/hr/beneficiary/create',
  edit: '/api/reboard/hr/beneficiary/update',
  achive: '/api/reboard/hr/beneficiary/archive',
  image: '/api/reboard/hr/beneficiary-image',
  getList: '/api/reboard/hr/beneficiary-list',
  getAll: '/api/reboard/hr/beneficiary/getall',
  getSingle: '/api/reboard/hr/beneficiary/get',

}

export const HR_REBOARD_DEPENDANTS_DATA_URLs = {
  approvedData: '/api/reboard/hr/dependent/getall',
  approvedDataItem: '/api/reboard/hr/dependent/get',
  awaitingApprovalData: '/api/reboard/hr/dependent/getawaiting',
  add: '/api/reboard/hr/dependent/create',
  update: '/api/reboard/hr/dependents/update',
  updateAwaitingApprovalData: '/api/reboard/hr/dependents/updateawaiting',
  deleteApprovedData: '/api/reboard/hr/dependent/archive',
  deleteAwaitingApprovalData: '/api/reboard/hr/dependent/deleteawaiting',
  approvedImage: '/api/reboard/hr/dependent-image',
  awaitingApprovalImage: '/api/reboard/hr/dependent-image/getawaiting',
  refreshData: '/api/reboard/hr/dependent-list',

}

export const HR_REBOARD_WORK_HISTORY_DATA_URLs = {
  awaitingApprovalData: '/api/reboard/hr/previous-employer/getawaiting',
  updateAwaitingApprovalData: '/api/reboard/hr/previous-employer/updateawaiting',
  deleteAwaitingApprovalData: '/api/reboard/hr/previous-employer/deleteawaiting',
  documentAwaitingApproval: '/api/reboard/hr/previous-employer-document/getawaiting'
}

export const HR_REBOARD_FAMILY_INFORMATION_DATA_URLs = {
  awaitingApprovalData: '/api/reboard/hr/family-information/getawaiting',
  updateAwaitingApprovalData: '/api/reboard/hr/family-information/updateawaiting',
  deleteAwaitingApprovalData: '/api/reboard/hr/family-information/deleteawaiting',
  documentAwaitingApproval: '/api/reboard/hr/family-information-document/getawaiting',
  awaitingApprovalImage: '/api/reboard/hr/family-information-image/getawaiting',
  add: '/api/reboard/hr/family-information/create',
  getAll: '/api/reboard/hr/family-information/getall',
  getSingle: '/api/reboard/hr/family-information/get',

}
