import { IPersonal } from "./personal.interface";

export interface IConfirmationTransaction {
    employee_id?: number; // required
    employee_name?: string;
    transaction_type?: string;
    transaction_type_text?: string;
    appraisal_score?: number;
    appraisal_period?: string;
    effective_date?: Date; // required
    defer_time?: number;
    proposed_confirm_date?: Date; 
    id?: number;
    EmployeeInfo: IPersonal;
    transaction_date?: Date;
    AppraisalPeriodInfo?: null;
}
	
		