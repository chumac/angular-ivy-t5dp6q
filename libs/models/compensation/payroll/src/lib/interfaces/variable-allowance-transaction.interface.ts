import { IVariableAllowance } from "./variable-allowance.interface";
import { Time } from "@angular/common";
import { IEmployee } from "@nutela/models/compensation/loans";

export interface IVariableAllowanceTransaction{
  vallowtrans_id:number;
  EmployeeInfo: IEmployee;
  VarAllowanceInfo:IVariableAllowance;
   transaction_date:Time;
   no_of_units:number;
   pay_in_period:Time;
   recalculate:boolean;
   overriden:boolean;
   value:number;
   is_timesheet:boolean;
   rate_table:string;
   transaction_unit:number;
   is_arrear_fv:boolean;
  is_gateway: boolean;
  employeeName: string;
  variableAllowance: string;
}
