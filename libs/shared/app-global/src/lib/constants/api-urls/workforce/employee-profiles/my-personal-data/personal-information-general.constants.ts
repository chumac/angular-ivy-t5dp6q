export const PERSONAL_INFORMATION_GENERAL_DATA_URLs = {
  approvedData: '/api/employees/my-general-info',
  awaitingApprovalData: '/api/employees/my-general-info/getawaiting',
  update: '/api/employees/my-general-info/update',
  deleteAwaitingApprovalData: '/api/employees/my-general-info/deleteawaiting',
  documentAwaitingApproval: '/api/employees/my-general-info-document/getawaiting'
};

export const PERSONAL_INFORMATION_CONTACT_DATA_URLs = {
  approvedData: '/api/employees/my-contactinfo/get',
  awaitingApprovalData: '/api/employees/my-contactinfo/getawaiting',
  update: '/api/employees/my-contactinfo/update',
  deleteAwaitingApprovalData: '/api/employees/my-contactinfo/deleteawaiting',
  nextOfKinPhoto: '/api/employees/my-next-of-kin-image',
  awaitingApprovalNextOfKinPhoto: '/api/employees/my-next-of-kin-image/getawaiting',

  documentApproved: '/api/employees/my-contactinfo-document',
  documentAwaitingApproval: '/api/employees/my-family-information-document/getawaiting',
};

export const PERSONAL_INFORMATION_IDENTIFICATION_DATA_URLs = {
  approvedData: '/api/employees/my-identification-info/get',
  awaitingApprovalData: '/api/employees/my-identification-info/getawaiting',
  update: '/api/employees/my-identification-info/update',
  deleteAwaitingApprovalData: '/api/employees/my-identification-info/deleteawaiting',
  signatureImage: '/api/employees/my-image-signature',
  awaitingApprovalSignatureImage: '/api/employees/my-image-signature/getawaiting'
};

export const PERSONAL_INFORMATION_PAYMENT_DATA_URLs = {
  approvedData: '/api/employees/my-payment-details/get',
  awaitingApprovalData: '/api/employees/my-payment-details/getawaiting',
  update: '/api/employees/my-payment-details/update',
  deleteAwaitingApprovalData: '/api/employees/my-payment-details/deleteawaiting'
};

export const PROFESSIONAL_QUALIFICATIONS_DATA_URLs = {
  approvedData: '/api/employees/my-professional-qualification/getall',
  approvedDataItem: '/api/employees/my-professional-qualification',
  awaitingApprovalData: '/api/employees/my-professional-qualification/getawaiting',
  add: '/api/employees/my-professional-qualification/create',
  update: '/api/employees/my-professional-qualification/update',
  deleteApprovedData: '/api/employees/my-professional-qualification/archive',
  deleteAwaitingApprovalData: '/api/employees/my-professional-qualification/deleteawaiting',
  documentApproved: '/api/employees/my-professional-qualification-document',
  documentAwaitingApproval: '/api/employees/my-professional-qualification-document/getawaiting',
  refreshData: '/api/employees/my-professional-qualification-list'
};

export const EDUCATIONAL_HISTORY_DATA_URLs = {
  approvedData: '/api/employees/my-education-history',
  awaitingApprovalData: '/api/employees/my-education-history/getawaiting',
  approvedDataItem: '/api/employees/my-education-history',
  add: '/api/employees/my-education-history/create',
  update: '/api/employees/my-education-history/update',
  deleteApprovedData: '/api/employees/my-education-history/archive',
  deleteAwaitingApprovalData: '/api/employees/my-education-history/deleteawaiting',
  documentApproved: '/api/employees/my-education-history-document',
  documentAwaitingApproval: '/api/employees/my-education-history-document/getawaiting',
  refreshData: '/api/employees/my-education-history-list',
  institutionsList: '/api/institution/list/getall',
  allInstitutionsList: '/api/institution/getall',
  countryList:'/api/institution/countries/getAll'
};

export const WORK_HISTORY_DATA_URLs = {
  approvedData: '/api/employees/my-previous-employer',
  awaitingApprovalData: '/api/employees/my-previous-employer-document/getawaiting',
  add: '/api/employees/my-previous-employer/create',
  update: '/api/employees/my-previous-employer/update',
  deleteApprovedData: '/api/employees/my-previous-employer/archive',
  deleteAwaitingApprovalData: '/api/employees/my-previous-employer/deleteawaiting',
  documentApproved: '/api/employees/my-previous-employer-document',
  documentAwaitingApproval: '/api/employees/my-previous-employer-document/getawaiting',
  refreshData: '/api/employees/my-previous-employer-list'
};

export const PERSONAL_GUARANTORS_DATA_URLs = {
  approvedData: '/api/employees/my-personal-guarantor',
  awaitingApprovalData: '/api/employees/my-personal-guarantor-document/getawaiting',
  add: '/api/employees/my-personal-guarantor/create',
  update: '/api/employees/my-personal-guarantor/update',
  deleteApprovedData: '/api/employees/my-personal-guarantor/archive',
  deleteAwaitingApprovalData: '/api/employees/my-personal-guarantor/deleteawaiting',
  documentApproved: '/api/employees/my-personal-guarantor-document',
  documentAwaitingApproval: '/api/employees/my-personal-guarantor-document/getawaiting',
  approvedImage:'/api/employees/my-personal-guarantor-image',
  awaitingApprovalImage: '/api/employees/my-personal-guarantor-image/getawaiting',
  refreshData: '/api/employees/my-personal-guarantor-list'
};

export const REFEREES_DATA_URLs = {
  approvedData: '/api/employees/my-personal-referee',
  awaitingApprovalData: '/api/employees/my-personal-referee-document/getawaiting',
  add: '/api/employees/my-personal-referee/create',
  update: '/api/employees/my-personal-referee/update',
  deleteApprovedData: '/api/employees/my-personal-referee/archive',
  deleteAwaitingApprovalData: '/api/employees/my-personal-referee/deleteawaiting',
  documentApproved: '/api/employees/my-personal-referee-document',
  documentAwaitingApproval: '/api/employees/my-personal-referee-document/getawaiting',
  approvedImage:'/api/employees/my-personal-referee-image',
  awaitingApprovalImage: '/api/employees/my-personal-referee-image/getawaiting',
  refreshData: '/api/employees/my-personal-referee-list'
};

export const BENEFICIARIES_DATA_URLs = {
  approvedData: '/api/employees/my-beneficiary',
  awaitingApprovalData: '/api/employees/my-beneficiary/getawaiting',
  approvedDataItem: '/api/employees/my-beneficiary/get',
  add: '/api/employees/my-beneficiary/create',
  update: '/api/employees/my-beneficiary/update',
  deleteApprovedData: '/api/employees/my-beneficiary/archive',
  deleteAwaitingApprovalData: '/api/employees/my-beneficiary/deleteawaiting',
  approvedImage:'/api/employees/my-beneficiary-image',
  awaitingApprovalImage: '/api/employees/my-beneficiary-image/getawaiting',
  refreshData: '/api/employees/my-beneficiary-list'
};

export const DEPENDANTS_DATA_URLs = {
  approvedData: '/api/employees/my-dependent/getall',
  awaitingApprovalData: '/api/employees/my-dependent/getawaiting',
  approvedDataItem: '/api/employees/my-dependent/get',
  add: '/api/employees/my-dependent/create',
  update: '/api/employees/my-dependent/update',
  deleteApprovedData: '/api/employees/my-dependent/archive',
  deleteAwaitingApprovalData: '/api/employees/my-dependent/deleteawaiting',
  documentApproved: '/api/employees/my-dependent-document',
  documentAwaitingApproval: '/api/employees/my-dependent-document/getawaiting',
  approvedImage:'/api/employees/my-dependent-image',
  awaitingApprovalImage: '/api/employees/my-dependent-image/getawaiting',
  refreshData: '/api/employees/my-dependent-list'
};

export const FAMILY_INFORMATION_DATA_URLs = {
  approvedData: '/api/employees/my-family-information',
  awaitingApprovalData: '/api/employees/my-family-information-document/getawaiting',
  approvedDataItem: '/api/employees/my-family-information/get',
  add: '/api/employees/my-family-information/create',
  update: '/api/employees/my-family-information/update',
  deleteApprovedData: '/api/employees/my-family-information/archive',
  deleteAwaitingApprovalData: '/api/employees/my-family-information/deleteawaiting',
  documentApproved: '/api/employees/my-family-information-document',
  documentAwaitingApproval: '/api/employees/my-family-information-document/getawaiting',
  approvedImage: '/api/employees/my-family-information-image',
  awaitingApprovalImage: '/api/employees/my-family-information-image/getawaiting',
  refreshData: '/api/employees/my-family-information-list'
};

export const CUSTOM_DATA_FORM_URLs = {
  getCustomDataFormData: '/api/custom/my-form/get',
  add: '/api/custom/custom-data-form/my/create',
  update: '/api/custom/custom-data-form/my/update',
  submitData: '/api/custom/custom-data-form/my/submit',
  deleteData: '/api/custom/custom-data-form/my/delete',
};

export const PROFILE_PICTURE_DATA_URLs = {
  profilePhoto: '/api/employees/profile-image',
  profilePhotoUpdate: '/api/employees/profile-image/update',
  awaitingApprovalProfilePhoto: '/api/employees/my-profile-image/getawaiting',
  deleteAwaitingApprovalData: '/api/employees/my-general-info/deleteawaiting',
};



export const SELECT_OPTION_URLs = {
  position: '/api/position/list',
  paygroup: '/api/paygroup/get-by-pay-grade',
  grade: '/api/grade/getal',
};
