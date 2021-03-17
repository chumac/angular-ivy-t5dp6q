export const ENTERPRISE_STRUCTURE_DATA_URLs = {
  enterpriseStructureData: '/api/enterprise-structure/hr/get-all',
  singleEnterpriseStructureData: '/api/enterprise-structure/hr/get-single',
  enterpriseStructureLinkData: '/api/enterprise-structure/hr/get-by-analysis-id-link',
  create: '/api/enterprise-structure/hr/create',
  update: '/api/enterprise-structure/hr/update',
  deactivate: '/api/enterprise-structure/hr/delete',
  getAwaiting: '/api/enterprise-structure/hr/pending-approval',
  knownTypes: '/api/enterprise-structure/known-types/list'
};


export const ENTERPRISE_STRUCTURE_DETAILS_DATA_URLs = {
  enterpriseStructureDetailData: '/api/enterprise-structure/details/hr/get-all',
  singleEnterpriseStructureDetailData: '/api/enterprise-structure/details/hr/get-by-analysis_id',
  getSingleById: '/api/enterprise-structure/details/hr/get-single',
  getSingleByIdLink: '/api/enterprise-structure/hr/get-by-analysis-id-link',
  create: '/api/enterprise-structure/details/hr/create',
  update: '/api/enterprise-structure/details/hr/update',
  deactivate: '/api/enterprise-structure/details/hr/delete',
  move: '/api/enterprise-structure/details/hr/move',
  promote: '/api/enterprise-structure/details/hr/promote',
  demote: '/api/enterprise-structure/details/hr/demote',
  employees: '/api/employees/hr-staff-list/get',
  positions: '/api/position/list',
  viewMembers: '/api/enterprise-structure/details/hr/view-members',
};


export const VIRTUAL_LINKS_DATA_URLs = {
  create: '/api/enterprise-structure/virtual-links/hr/create',
  virtualLinksData: '/api/enterprise-structure/virtual-links/hr/get-by-analysis-id',
  delete: '/api/enterprise-structure/virtual-links/hr/delete'
}


export const MANAGE_ENTERPRISE_STRUCTURE_DETAIL_URLs = {
  reconnectTo: '/api/enterprise-structure/details/hr/reconnet-to',
  reconnectChildren: '/api/enterprise-structure/details/hr/reconnet-children',
  ChangeType: '/api/enterprise-structure/details/hr/change-type',
  removeAllEmployees: '/api/enterprise-structure/details/hr/remove-all-employees',
  deactivate: '/api/enterprise-structure/details/hr/deactivate',
  addCostCentre: '/api/enterprise-structure/details/hr/add-cost-centre',
  removeCostCentre: '/api/enterprise-structure/details/hr/remove-cost-centre',
  shareCode: '/api/enterprise-structure/details/hr/update/shared-code',
  getCostCentres: '/api/enterprise-structure/cost-centre-template-details/hr/get-all',
  getCostCentresById: '/api/enterprise-structure/details/hr/get-cost-centres'
}
