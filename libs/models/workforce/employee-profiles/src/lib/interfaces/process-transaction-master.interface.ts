export interface IProcessTransactionMaster{
    id: number;
    master_id: number;
    process_id: number;
    process_id_text: string;
    employee_id: number;
    employee_name: string;
    username: string;
    is_complete: string;
    status: number;
    status_text: string;
    approval_status: number;
    role: number;
    transaction_date: Date;
}