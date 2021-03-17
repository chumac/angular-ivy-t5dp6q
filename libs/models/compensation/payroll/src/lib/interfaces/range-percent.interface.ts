export interface IRangePercent{
    taxchart_id: number,
    payroll_profile_id: number,
    payroll_profile_id_text: string,
    gross_lower: number,
    gross_upper: number,
    use_rule: number,
    gross_percent: string,
    gross_amount: string,
    approval_status: string,
    is_annual_tax: boolean,
}
