export interface IExclusionTransactionCreate {
    exclusion_type: number,
    exclusion_givento_empid: number,
    reasonfor_exclusion: number,
    rec_notes: string,
    is_temp_exclusion: boolean,
    start_date: Date,
    end_date: Date,
    exclude_by_percent: boolean,
    percent_value: number,
    amount_value: number,
}
