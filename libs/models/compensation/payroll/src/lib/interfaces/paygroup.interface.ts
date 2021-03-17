import { ICurrency } from "./currency.interface";
import { IGrade } from "./grade.interface";


export interface IPayGroup{
  paygroup_id:number;
  paygroup_code:string;
  description:string;
  shortname:string;
  currencyInfo:ICurrency;
  gradeInfo:IGrade;
  rank:number;
  non_conventional:boolean;
  taxpercentongross:number;
  master_rec_id:number;
  unconfirmedPaygroupInfo:IPayGroup;
  confirmation_status:number;
  annual_gross:number;
  fixed_relief:number;
  fixed_total_taxable:number;
  fixed_total_annual_tax:number;
  grade_id: number;
  currency_id: number;
  is_active: boolean;
  unconfirmed_pg_id: number;
  taxpercentongross_calculated: number;
}
