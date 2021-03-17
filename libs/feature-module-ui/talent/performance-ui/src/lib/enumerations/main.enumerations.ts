
export enum PagemarkItemTypes {
  FIRST = 'FIRST',
  LAST = 'LAST',
  NORMAL = 'NORMAL',
  ACTIVE = 'ACTIVE'
}

export enum Roles {
  EMPLOYEE = 0,
  LINE_MANAGER = 1,
  EMPLOYEE_ACCEPT_REJECT = 2,
  REVIEWER_ASSESSING = 3,
  REVIEWER_REVIEWING = 4,
  MODERATION = 5,
  HR = 6
}

export enum PagePermissions {
  NOT_APPLICABLE = 0,  // Role should not see the form
  READ_ONLY = 1,
  READ_WRITE = 2
}

export enum PageStatus {
  NOT_COMPLETED = 0,
  COMPLETED = 1
}

export enum WorkflowProcessStatus {
  NOT_STARTED = 0,
  STARTED = 1,
  SAVED = 2,      // Go to last page (Summary page)
  COMPLETED = 3,
  DONE = 4
}

export enum RatingEditMode {
  EMP_EDIT = 0,
  EMP_READ_ONLY = 1,
  LMGR_EDIT = 2,
  LMGR_READ_ONLY = 3
}

export enum StatusMode {
  EMP_EDIT = 0,
  LMGR_EDIT = 1,
  HR_EDIT = 2,
}

export enum HRQueueFeedbackStatus {
  NOT_COMPLETED = 0,
  EMP_COMPLETED = 1,
  LM_COMPLETED = 2,
  HR_COMPLETED = 3

}
