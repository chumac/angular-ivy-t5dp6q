export const REBOARD_EMPLOYEE_INFORMATION_DATA_URLs = {
  update: '/api/reboard/my-general-info/update',
  getawaiting: '/api/reboard/my-general-info/getawaiting',
  deleteAwaiting: '/api/reboard/my-general-info/deleteawaiting',
  getAll: '/api/reboard/my-general-info',
  getHistory: '/api/reboard/my-general-info/history/get',
};

export const REBOARD_CONTACT_DATA_URLs = {
  create: '/api/reboard/ my-contactinfo/create',
  update: '/api/reboard/my-contact-info/update',
  getAll: '/api/reboard/my-contactinfo/get',
  getSingle: '/api/reboard/employee-contact-info/getsingle/{contactid}',
  nextOfKinPhoto: '/api/reboard/my-next-of-kin-image',
  document: '/api/reboard/my-contactinfo-document',
};

export const REBOARD_IDENTIFICATION_DATA_URLs = {
  get: '/api/reboard/my-identification-info/get',
  update: '/api/reboard/my-identification-info/update',
  signatureImage: '/api/reboard/my-image-signature/get',
};

export const REBOARD_PAYMENT_DATA_URLs = {
  getAll: '/api/reboard/my-payment-details/get',
  awaitingApprovalData: '/api/reboard/my-payment-details/getawaiting',
  create: '',
  update: '/api/reboard/my-payment-details/update',
  deleteAwaitingApprovalData: '/api/reboard/my-payment-details/deleteawaiting'
};

export const REBOARD_PROFESSIONAL_QUALIFICATIONS_DATA_URLs = {
  create: '/api/reboard/my-professional-qualification/create',
  update: '/api/reboard/my-professional-qualification/update',
  getAll: '/api/reboard/my-professional-qualification/getall',
  getSingle: '/api/reboard/my-professional-qualification/get',
  getAllAwaiting: '/api/reboard/my-professional-qualification/getawaiting',
  getSingleAwaiting: '/api/reboard/my-professional-qualification/getawaiting',

  deleteData: '/api/reboard/my-professional-qualification/archive',
  document: '/api/reboard/my-professional-qualification-document',
  refreshData: '/api/reboard/my-professional-qualification-list'
};

export const REBOARD_EDUCATIONAL_HISTORY_DATA_URLs = {
  create: '/api/reboard/my-education-history/create',
  update: '/api/reboard/my-education-history/update', //{educationalhistoryId}
  getAll: '/api/reboard/my-education-history/getall',
  getList: '/api/reboard/my-education-history-list',
  getSingle: '/api/reboard/my-education-history', // {id}
  deleteData: '/api/reboard/my-education-history/archive',
  refereshData: '/api/reboard/my-education-history-list',
  document: '/api/reboard/my-education-history-document',
  dataItem: '/api/reboard/my-education-history'
};

export const REBOARD_WORK_HISTORY_DATA_URLs = {
  create: '/api/reboard/my-previous-employer/create',
  update: '/api/reboard/my-previous-employer/update', // { prevId }/{ employeeID }
  getAll: '/api/reboard/my-previous-employer/getall',
  getList: '/api/reboard/my-previous-employer-list',
  getSingle: '/api/reboard/my-previous-employer/get',
  deleteData: '/api/reboard/my-previous-employer/archive',
  document: '/api/reboard/my-previous-employer-document',
  refreshData: '/api/reboard/my-previous-employer-list'

};

export const REBOARD_PERSONAL_GUARANTORS_DATA_URLs = {
  create: '/api/reboard/my-personal-guarantor/create',
  update: '/api/reboard/my-personal-guarantor/update',
  getAll: '/api/reboard/my-personal-guarantor/getall',
  getSingle: '/api/reboard/my-personal-guarantor/get',
  getAllAwaiting: '/api/reboard/my-personal-guarantor/getawaiting',
  getSingleAwaiting: '/api/reboard/my-personal-guarantor/getawaiting',

  deleteData: '/api/reboard/my-personal-guarantor/archive',
  document: '/api/reboard/my-personal-guarantor-document',
  image: '/api/reboard/my-personal-guarantor-image',
  refreshData: '/api/reboard/my-personal-guarantor-list'
};

export const REBOARD_REFEREES_DATA_URLs = {
  create: '/api/reboard/my-personal-referee/create',
  update: '/api/reboard/my-personal-referee/update',
  getAll: '/api/reboard/my-personal-referee/getall',

  deleteData: '/api/reboard/my-personal-referee/archive',
  document: '/api/reboard/my-personal-referee-document',
  image: '/api/reboard/my-personal-referee-image',
  refreshData: '/api/reboard/my-personal-referee-list'
};

export const REBOARD_BENEFICIARIES_DATA_URLs = {
  create: '/api/reboard/my-beneficiary/create',
  update: '/api/reboard/my-beneficiary/update',
  getAll: '/api/reboard/my-beneficiary/getall',
  dataItem: '/api/reboard/my-beneficiary/get',
  image: '/api/reboard/my-beneficiary-image',
  deleteData: '/api/reboard/my-beneficiary/archive',
  refreshData: '/api/reboard/my-beneficiary-list'
};

export const REBOARD_DEPENDANTS_DATA_URLs = {
  create: '/api/reboard/my-dependents/create',
  update: '/api/reboard/my-dependents/update', // {dependentsId}'
  getAll: '/api/reboard/my-dependent/getall',
  deleteData: '/api/reboard/my-dependent/archive',
  document: '/api/reboard/my-dependent-document',
  image: '/api/reboard/my-dependent-image',
  refreshData: '/api/reboard/my-dependent-list'
};

export const REBOARD_FAMILY_INFORMATION_DATA_URLs = {
  create: '/api/reboard/my-family-information/create',
  update: '/api/reboard/my-family-information/update',
  getSingle: '/api/reboard/my-family-information/get',
  getAll: '/api/reboard/my-family-information/getall',
  deleteData: '/api/reboard/my-family-information/archive',

  document: '/api/reboard/my-family-information-document',
  image: '/api/reboard/my-family-information-image',
  refreshData: '/api/reboard/my-family-information-list'
};

export const REBOARD_PROFILE_PICTURE_DATA_URLs = {
  profilePhoto: '/api/reboard/my-profile-image/get',
  profilePhotoUpdate: '/api/reboard/my-profile-image/update',
};
