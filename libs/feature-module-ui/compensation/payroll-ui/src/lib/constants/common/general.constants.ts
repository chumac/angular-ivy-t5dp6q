export const ITEM_TYPES = {
  fixed_allowance: 1,
  variable_allowance: 2,
  fixed_deduction: 3,
  variable_deduction: 4
};

export const CONFIRMATION_STATUS = {
  unconfirmed: 0,
  confirmed_only: 1,
  confirmed: 2,
  not_applicable: 3
};

export const PAYSLIP_INFO_TYPE = {
  employee: 1,
  allowances: 2,
  deductions: 4,
  taxPayee: 6,
  loan: 7,
  grossPay: 8,
  totalDeduction: 9,
  netPay: 10,
  employerContribution: 11,
  reliefs: 12
}

export const ELIGIBILITY = {
  0: 'Employee Specific',
  1: 'Payment Group',
  2: 'Global',
  3: 'Criteria Based'
}


export const MAX_PAYMENT = {
  monthly: 12,
  'half-yearly': 6,
  quarterly: 4,
  'three-times': 3,
  yearly: 1
}
