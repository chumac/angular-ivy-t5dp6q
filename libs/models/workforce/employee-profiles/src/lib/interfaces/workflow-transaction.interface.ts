export interface IWorkflowTransaction {
  employee_id: number;
  msg_source: string;
  msg_record_id?: number;
  msg_originalSender: string;
  msg_from: string;
  msg_to: string;
  msg_details: string;
  workflow_id?: number;
  workflow: string;
  workflow_step?: number;
  msg_entry_date: Date;
  msg_exit_date: Date;
  status: number;
  msg_status: string;
}
