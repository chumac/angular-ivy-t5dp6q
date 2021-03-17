export interface IConfirmationInformation {
 employee_id: number;
 transaction_date?: Date;
 transaction_type: string;
 appraisal_score?: number;
 appraisal_period: string;
 effective_date: Date;
 defer_time: number;
 proposed_confirm_date?: Date; 
}