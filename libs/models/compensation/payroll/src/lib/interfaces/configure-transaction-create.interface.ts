export interface IConfigureTransactionCreate {
    "exclusion_id": number,
    "exclusion_det_id": number,
    "item_type": number,
    "item_description": string,
    "exclude_by_percent": boolean,
    "percent_value": number,
    "amount_value": number,
    "selected_allowance_id": number
}