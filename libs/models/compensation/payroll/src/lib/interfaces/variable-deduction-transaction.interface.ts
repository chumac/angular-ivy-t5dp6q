import { IVariableDeduction } from "./variable-deduction.interface";
import { Time } from "@angular/common";
import { IEmployee } from "@nutela/models/compensation/loans";

export interface IVariableDeductionTransaction{
  vdeducttrans_id:number;
  EmployeeInfo: IEmployee;
  VardeductionInfo:IVariableDeduction;
   transaction_date:Time;
   no_of_units:number;
   deduct_in_period:Time;
   recalculate:boolean;
   overriden:boolean;
   value:number;
   is_timesheet:boolean;
   rate_table:string;
   transaction_unit:number;
   is_arrear_fv:boolean;
  sys_run_notes: string;
  employeeName: string;
  variableDeduction: string;
  is_gateway: boolean;
}
