import { IEmployeeSummary } from "@nutela/models/workforce/employee-profiles";

export interface IResignationLetter {
  id: number,
  resign_letter: string,
  doc_extension: string,
  doc_url: string,
  doc_guid: string,
  doc_binary: string,
  doc_size: number,
  employee_name: string,
  effective_date: Date,
  email_sent: boolean,
  separation_type: number,
  is_proxy: boolean,
  proxy_type: number,
  email_advice_sent: false,
  separation_type_text: string,
  status: number,
  status_text: string
  employee_id: number,
}
