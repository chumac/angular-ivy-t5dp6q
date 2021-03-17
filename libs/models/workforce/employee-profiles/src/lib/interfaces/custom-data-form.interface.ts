export interface ICustomDataForm{
    id:number;
    code : string;
    description: string;
    title: string;
    status?: number;
    status_text?: string;
    approval_status?: number;
    approval_text?: string;
    json_text: string;
    employee_id: number;
    form_id: number;
  org_id?: number;
  json_string?: string;
 }
