export interface ITaxManagementProfile {
    tax_id: number,
    description: string,
    tax_remainder_values: boolean,
    percentage: number,
    payroll_profile_id: number
}