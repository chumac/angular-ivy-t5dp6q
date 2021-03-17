export interface ITaxStandard{
    taxdetail_id: number,
    tax_id: number,
    tax_id_text: string,
    step: number,
    tax_value: number,
    percentage_of_tv: number,
    percentage_of_rm: number,
    ignore_rm: boolean,
    cumulative: number,
    cumulative_taxable_value: number,
    org_id: number,
    payroll_profile_id: number,
}
