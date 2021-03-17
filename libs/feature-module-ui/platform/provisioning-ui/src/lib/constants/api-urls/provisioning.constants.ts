export const PROVISIONED_DATA_URLs = {
  provisionedData: '/api/provision/hr/getAll',
  roleData: '/api/securityrole/get-roles',
  create: '/api/provision/hr/create',
  update: '/api/provision/hr/provision-details/edit',
  staffNumber: '/api/provision/hr/generate-staff-number',
  username: '/api/provision/hr/generate-username',
  getPaygroups: '/api/paygroup/get-by-pay-grade',
  getPaygrades: '/api/grade/getall',
  getEmailTo: '/api/utilities/send-creation-email-to',
  getRecordCategories: '/api/utilities/get-record-categories',
  getUserTypes: '/api/utilities/get-usertype'
};

export const STAFF_CATEGORY_URLs = {
  list: '/api/staffcategory/getAll'
};

export const POSITION_URLs = {
  getData: '/api/position/list',
  getDataByDesignation: '/api/designation-positions/get'
};

export const GRADE_URLs = {
  getData: '/api/course/getall'
};

export const ENTERPRISE_STRUCTURE_URLs = {
  structureTypes: '/api/structuretype/list',
  structureDetails: '/api/structure-detail/get-by-analysis-id',
  constCenters: '/api/structure-detail/cost-center-code'
};

export const DESGNATION_URLs = {
  list: '/api/designation/list'
};
