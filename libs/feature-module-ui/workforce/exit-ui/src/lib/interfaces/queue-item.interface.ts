export interface IQueueItem {
  id: number,
  exit_type_id: number,
  exit_type_id_text: string,
  employee_id: number,
  employee_name: string,
  process_id: number,
  process_id_text: string,
  effective_date: Date,
  status: number,
  status_text: string,
  resignation_id: number
}
