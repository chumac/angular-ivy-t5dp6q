export const DASHBOARD_CHART_TYPES = {
  workforce: 0,
  contingent: 1,
  fulltime: 2
};

export const EMPLOYEES_DATA_SUMMARY = {
  workforce: 'workforce',
  fulltime: 'full-time',
  contingent: 'contingent'
};

export const EMPLOYEES_DATA_SUMMARYS: {value: string, label: string }[] = [
  { value: 'workforce', label: 'Workforce'},
  { value: 'full-time', label: 'Full-time'},
  { value: 'contingent', label: 'Contingent'}
];


export const IDENTIFICATION_PAYMODE: {value: string, label: string }[] = [
  { value: 'Cash', label: 'Cash'},
  { value: 'Cheque', label: 'Cheque'},
  { value: 'Direct Transfer', label: 'Direct Transfer'},
  { value: 'Draft', label: 'Draft'},
];

export const PROCESS_FORM_ROLE = {
  employee: 0,
  HR: 1,
  lineManager: 2,
  BR: 3
};

export const PROCESS_FORM_FLAG = {
  isReviewer: 0,
};

export const PROCESS_FORM_ACCESS = {
  notApplicable: 0,
  canView: 1,
  noAccess: 2
};

export const PROCESS_FORM_COMPLETE = {
  YES: 'YES',
  NO: 'NO',
};

export const PROCESS_FORM_STATUS = {
  IN_PROGRESS: 0,
  SUBMITTED: 1
};
