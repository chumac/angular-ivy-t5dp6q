export const CUSTOM_USER_GROUP_SETUPS_URLs = {
    loadData: '/api/staff-custom-group/hr/GetAll',
    loadRestrictedValues: '/api/disciplinary-roles/getlist',
    add: '/api/staff-custom-group/hr/create',
    update: '/api/staff-custom-group/hr/update',
    delete: '/api/staff-custom-group/hr/delete'
}

export const DESIGNATION_SETUP_URLs = {
    loadApproved: '/api/designation/hr/approved/getall',
    loadAwaiting: '/api/designation/hr/awaiting-approval/getall',
    loadByTitleId: '/api/designation/hr/get',
    loadPositions: '/api/position/list',
    add: '/api/designation/hr/create',
    update: '/api/designation/hr/update',
    deactivate: '/api/designation/hr/deactivate',
    delete: '/api/designation/hr/delete'
}

export const DISCIPLINARY_ACTION_SETUP_URLs = {
    loadData: '/api/disciplinary-actions-list/hr/getall',
    loadById: '/api/disciplinary-actions-list/hr/get',
    add: '/api/disciplinary-actions-list/hr/create',
    update: '/api/disciplinary-actions-list/hr/update',
    delete: '/api/disciplinary-actions-list/hr/delete'
}

export const GRADE_MANAGEMENT_URLs = {
    loadData: '/api/payroll/grade/getAll',
    loadById: '/api/payroll/grade/get',
    add: '/api/payroll/grade/create',
    update: '/api/payroll/grade/update',
    delete: '/api/payroll/grade/delete'
}

export const DISCIPLINARY_ROLE_SETUP_URLs = {
    loadData: '/api/disciplinary-roles/hr/getall',
    loadById: '/api/disciplinary-roles/hr/get',
    add: '/api/disciplinary-roles/hr/create',
    update: '/api/disciplinary-roles/hr/update',
    delete: '/api/disciplinary-roles/hr/delete'
}

export const POSITION_SETUP_URLs = {
    approvedData: '/api/position/hr/approved/getall',
    awaitingData:'/api/position/hr/awaiting-approval/getall',
    add: '/api/position/hr/create',
    update: '/api/position/hr/update',
    delete: '/api/position/hr/delete',
    deactivate:'/api/position/hr/deactivate',


  specificType:'/api/structuretype/list',
  specificStructure:'/api/structure-detail/get-by-analysis-id',
  costCenter:'/api/structure-detail/cost-center-code',

  positionList:'/api/position/list',
  gradeList:'/api/grade/getall',
}

export const POSITION_CATEGORY_SETUP_URLs = {
    loadData: '/api/position-category/hr/GetAll',
    add: '/api/position-category/hr/create',
    update: '/api/position-category/hr/update',
    delete: '/api/position-category/hr/delete'
}

export const SEPARATION_REASON_SETUP_URLs = {
    loadData: '/api/employeestatus/getAll',
    add: '/api/employeestatus/create',
    update: '/api/employeestatus/update',
    delete: '/api/employeestatus/archive'
}
