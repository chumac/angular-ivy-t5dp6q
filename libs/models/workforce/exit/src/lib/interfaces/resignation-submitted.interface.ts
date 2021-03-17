export interface IResignationSubmitted {
  id: number,
  resign_letter: string,
  doc_extension: string,
  doc_url: string,
  doc_guid: string,
  doc_binary: string,
  doc_size: number,
  employee_id: number,
  employee_name: string,
  effective_date: Date,
  status: number,
  status_text: string,
  separation_type: number,
  separation_type_text: string,
  proxy_type: number
}
