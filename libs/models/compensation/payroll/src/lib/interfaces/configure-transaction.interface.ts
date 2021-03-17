export interface IConfigureTransaction {
    exclusion_id:number,
    exclusion_det_id: number,
    item_type: number,
    item_type_text: string,
    item_description: string,
    allowance_id: string,
    deduction_id: number,
    varallowance_id: string,
    vardeduction_id: string,
    loan_id: string,
    exclude_by_percent: boolean,
    type: string,
    percent_value: string,
    amount_value: number,
    selected_allowance_id:number
}