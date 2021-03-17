export const ORGANIZATION_URLs = {
  approvedData: '/api/organization/get',
  update: '/api/organization/update',
};

export const CUSTOM_OPTIONS_URLs={
approvedData:'/api/options/custom-set/getall',
update: '/api/options/custom-set/update',
delete:'/api/options/custom-set/delete'
};

export const GLOBAL_OPTIONS_URLs={
  approvedData: '/api/options/getall',
  update:'/api/options/create-custom-option'
};

export const WORKFLOW_DEFINITION_URLS={
  approvedData:'/api/workflow/definitions/getall',
  post: '/api/workflow/definitions/create',
  update:'/api/workflow/definitions/update',
  archive:'/api/workflow/definitions/archive',
  };

  export const WORKFLOW_DETAILS_URLs={
  stepData:'/api/workflow/steps/getall',
  processingRule:'/api/workflow/steps/options/getlist',
  update:'/api/workflow/steps/update',
  delete:'/api/workflow/steps/delete',
  addStep:'/api/workflow/steps/create',
  positionData:'/api/position/list',
  roleData:'/api/securityrole/get-roles',
  individualData:'/api/employees/hr-staff-list/get',
  }

  export const WORKFLOW_MAP_URLs={
  systemData: '/api/entities/getall',
  workDefinition:'/api/workflow/definitions/getall',
  workMap:'/api/workflow/map/getall',
  approvedData:'/api/workflow/map/getall/{workflow_id}',
  delete:'/api/workflow/map/delete',
  add:'/api/workflow/map/create',
  }

  export const WORKFLOW_MAP_ALt_URLs={
    altMap:'/api/workflow/map-type-options/getlist',
    singleData:'/api/workflow/get-alt-map',
    delete:'/api/workflow/alt-map/delete',
    add:'/api/workflow/alt-map/create',
    messageSource:'/api/workflow/alt-map/getall',
    // costCenter:'/api/enterprise-structure/details/hr/get-cost-centres',
    costCenter:'/api/structure-detail/cost-center-code',
    forEmployee:'/api/employees/hr-staff-list/get',
    grade:'/api/grade/getall',
    position:'/api/position/list',
    positionCategory:'/api/position-category/hr/GetAll',
    category:'/api/staffcategory/list',
    designation:'/api/designation/list',
    staffGroup:'/api/staff-custom-group/hr/GetAll',
    }

  export const NOTIFICATION_URLs = {
    approvedData:'/api/notification/workflow/getall',
    notification_to:'/api/notification/notification-options/getlist',
    process:'/api/notification/process-options/getlist',
    update: '/api/notification/workflow/get/{id}',
    delete:'/api/notification/workflow/delete',
    add:'/api/notification/workflow/create',
    systemData: '/api/entities/getall'
  };

  export const EMAILS_URLs = {
    approvedData:'/api/email/workflow/getall',
    update: '/api/email/workflow/get/{id}',
    delete:'/api/email/workflow/delete/{id}',
    add:'/api/email/workflow/create',
    systemData: '/api/entities/getall'
  };

  export const SECURITY_URLs={
    processedData: '/api/users/security-actions/get-processed',
    waitingData: '/api/users/security-actions/get-waiting',
    add:'/api/users/security-actions/create',
    bulk:'/api/users/security-actions/advanced/create',
    delete:'/api/options/create-custom-option',
    // specificType:'/api/enterprise-structure/hr/get-all',
    // specificStructure:'/api/enterprise-structure/details/hr/get-by-analysis_id',
    specificType:'/api/structuretype/list',
    specificStructure:'/api/structure-detail/cost-center-code',
    availableUsers:'/api/enterprise-structure/details/hr/view-members',
    singleAction:'/api/users/user-management-options/getlist',
    bulkAction:'/api/users/user-management-options/advanced/getlist',
  };


  export const REPORT_URLs={
    standardReport: '/api/my-reports/standard/getall',
    reportPermission: '/api/my-reports/permissions/getall',
    delete:'/api/my-reports/permissions/delete',
    addSingle:'/api/my-reports/permissions/grant-permission',
    addMultiple:'/api/my-reports/permissions/grant-multiple-permissions',
  };


  export const BUSINESS_TYPE_URLs = {
    data: '/api/businesstype/getAll',
    update: '/api/businesstype/update',
    delete: '/api/businesstype/archive',
    add: '/api/businesstype/create',
}

export const DOCUMENT_TAGS_URLs = {
    data: '/api/document/tag/getAll',
    update: '/api/document/tag/update',
    delete: '/api/document/tag/archive',
    add: '/api/document/tag/create',
}

export const Education_Grades_URLs = {
    data: '/api/edugrade/getAllEduGrade',
    update: '/api/edugrade/update',
    delete: '/api/edugrade/archive',
    add: '/api/edugrade/create',
}

export const Education_COURSE_URLs = {
    data: '/api/course/getAllCourses',
    update: '/api/course/update',
    delete: '/api/course/archive',
    add: '/api/course/create',
    category:'/api/course/category/getall'
}

export const Education_Institutions_URLs = {
    educational:'/api/institution/educational-institution/getall',
    professional:'/api/institution/professional-institution/getall',
    update: '/api/institution/update',
    delete: '/api/institution/archive',
    add: '/api/institution/create',
}

export const Professional_Institutions_URLs = {
  data: '/api/institution/professional-institution/getall',
  update: '/api/institution/update',
  delete: '/api/institution/archive',
  add: '/api/institution/create',
}

export const Employee_Status_URLs = {
    data: '/api/employeestatus/getAll',
    update: '/api/employeestatus/update',
    delete: '/api/employeestatus/archive',
    add: '/api/employeestatus/create',
}

export const Professional_Awards_URLs = {
    data: '/api/proaward/getAll',
    update: '/api/proaward/update',
    delete: '/api/proaward/archive',
    add: '/api/proaward/create',
}

export const Qualifications_Category_URLs = {
    data: '/api/qualification/category/getAll',
    update: '/api/qualification/update-category',
    delete: '/api/qualification/archive-category',
    add: '/api/qualification/category/create',
}

export const Religions_URLs = {
    data: '/api/religion/getAll',
    update: '/api/religion/update',
    delete: '/api/religion/archive',
    add: '/api/religion/create',
}

export const Staff_Categories_URLs = {
    data: '/api/staffcategory/getAll',
    update: '/api/staffcategory/update',
    delete: '/api/staffcategory/archive',
    add: '/api/staffcategory/create',
}

export const FACULTY = {
  data: '/api/institution/faculty/getall',
  update: '/api/institution/faculty/update',
  delete: '/api/institution/faculty/delete',
  add: '/api/institution/faculty/create',
}

export const DEPARTMENT = {
  data: '/api/institution/faculty/department/getall',
  update: '/api/institution/faculty/department/update',
  delete: '/api/institution/faculty/department/delete',
  add: '/api/institution/faculty/department/create',
}

export const Location_URLs = {
    nationalityData: '/api/country/getAllCountries',
    nationalityUpdate: '/api/country/update',
    nationalityDelete: '/api/country/archive',
    nationalityAdd: '/api/country/create',

    stateData: '/api/state/getall',
    stateUpdate: '/api/state/update',
    stateDelete: '/api/state/archive',
    stateAdd: '/api/state/create',

    cityData: '/api/city/getall',
    cityUpdate: '/api/city/update',
    cityDelete: '/api/city/archive',
    cityAdd: '/api/city/create',

    lgaData: '/api/lga/getallLGAs',
    lgaUpdate: '/api/lga/update',
    lgaDelete: '/api/lga/archive',
    lgaAdd: '/api/lga/create',
}

export const Qualifications_URLs = {
  data: '/api/qualification/getAllQual',
  update: '/api/qualification/update-qualification',
  delete: '/api/qualification/archive-qualification',
  add: '/api/qualification/create',
  education:'/api/qualification/educational/getall',
  professional:'/api/qualification/professional/getall',
}


export const Upload = {
  byStatus: '/api/file-upload/get-by-filter',
  byReference: '/api/file-upload/get-by-reference',
  delete: '/api/file-upload/delete',
  reverse:'/api/file-upload/reverse',
  add: '/api/file-upload/upload',
  status:'/api/file-upload/status/list',
  destination:'/api/file-upload/destination/get-all',
  templateUpload:'/api/file-upload/import-template/getall',
  uploadStatus:'/api/file-upload/import-error-log/get'
}
