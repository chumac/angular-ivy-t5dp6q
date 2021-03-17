import { ICustomUserGroupSetup } from "./custom-user-group-setup.interface";
import { IPersonal } from "./personal.interface";

export interface ICustomUserGroup {
    id: number;
    custom_group_id: number;
    employee_id: number;
    custom_group_value: string;
    StaffCustomInfo: ICustomUserGroupSetup;
    EmployeeInfo: IPersonal;
    employee_name: string;
    custom_description: string;
}