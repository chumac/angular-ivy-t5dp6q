


export interface ICheckList {
  checklist_id: number;
  description: string;
  employee_name: string;
  is_validated: string;
  validated_by: string;
  validation_date: Date;
  validator_comment: string;
}

export interface CreateChecklist {
  employee_id: number;
  code: string;
  description: string;
}

export interface CreateProcess {
  checklist_id: number;
  status: number;
  rank: number;
  link: string;
  employee_id: number;
  exit_process_id: number;
}

export interface IProcessChecklist {
  id: number;
  checklist_id: number;
  approval_status: number;
  status: number;
  rank: number;
  link: string;
  EmployeeInfo: IEmployeeSummary;
  exit_process_id: number;
}

export interface IEmployeeSummary {
  employee_id: number;
  employee_number: string;
  employee_surname: string;
  employee_midname: string;
  employee_firstname: string;
  logon_name: string;
}


export interface ITeamQueue {
  id: number;
  resignation_id: number;
  resignation_id_text: string;
  employee_id: number;
  employee_name: string;
  process_id: number;
  process_id_text: string;
  effective_date: Date;
  status: number;
  status_text: string;
}
