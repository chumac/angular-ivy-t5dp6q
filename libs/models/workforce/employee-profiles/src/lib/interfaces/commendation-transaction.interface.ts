import { IPersonal } from "./personal.interface";
import { IBasicData } from "@nutela/models/core-data";

export interface ICommendationTransaction
{
    commendation_id: number;
    employee_id: number;
    issued_by_id: number;
    issued_by_role: number;
    commendation_detail: string;
    event_date: Date;
    is_direct: boolean;
    EmployeeInfo: IPersonal;
    IssuedByInfo: IPersonal;
    IssuedByRole: IBasicData;
    employee_name: string;
    issued_by_name: string;
    role_type_text: string;
}
	
		