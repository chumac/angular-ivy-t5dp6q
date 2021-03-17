import { IPersonal } from "@nutela/models/workforce/employee-profiles";

export interface ILeavePlanDetail {
    leave_plan_id: number;
    start_date: Date;
    assigned_backup_id: number;
    no_of_days: number;
    AssignedBackupInfo: IPersonal;
    end_date: Date;
    id: number;
    resumption_date: Date;
    status: number;
    sys_message: string;
    pay_allowance: boolean;
    currency_id: number;
    CurrencyInfo:{currency_id: number};
}