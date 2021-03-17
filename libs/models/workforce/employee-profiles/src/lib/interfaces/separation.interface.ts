import { IPersonal } from "./personal.interface";
import { IFixedAllowance } from "@nutela/models/compensation/payroll";
import { ICurrency } from "@nutela/models/core-data";
import { IEmployeeStatus } from "./employee-status.interface";

export interface ISeparation {
  separation_id: number;
  employee_id: number;
  reason_4exit_id?: number;
  reason_for_exit: string;
  exit_notes: string;
  sent_notice: boolean;
  sent_notice_meaning: string;
  effective_date?: Date;
  process_payroll: boolean;
  process_payroll_meaning: string;
  pay_lumpsum?: boolean;
  pay_lumpsum_meaning: string;
  lumpsum_amount?: number;
  lumpsum_allowance_id: number;
  lumpsum_allowance_id_desc: string;
  attach_resignation_letter: any;
  currency_id?: number;
  currency_name: string;
  notice_date: Date;
  resignation_id: number;
  resignation_id_desc: string;
  replace_id: number;
  replace_name: string;
  status: number;
  created_by: string;
  created_date: Date;
  employee_fullname: string;
  status_meaning: string;

  // Transaction read additional
  EmployeeInfo:IPersonal;
  ExitReasonInfo:IEmployeeStatus;
  LumpsumAllowanceInfo:IFixedAllowance;
  CurrencyInfo:ICurrency;
  ResignationInfo:IExitResignationLetter;
  ReplacementInfo:IPersonal;
}

export interface IExitResignationLetter{
  id: number;
  resign_letter: string;
  doc_extension: string;
  doc_url: string;
  doc_guid: string;
  doc_binary: string;
  doc_size: string;
  effective_date: string;
}
