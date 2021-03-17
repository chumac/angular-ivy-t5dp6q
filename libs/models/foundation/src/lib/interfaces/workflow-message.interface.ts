export interface IWorkflowMessage {
  msg_id: number;
  msg_source: string;
  msg_record_id: number;
  msg_originalSender: string;
  msg_originalSender_image: string;
  msg_originalsender_name: string;
  msg_from: string;
  msg_to: string;
  msg_details: string;
  msg_status: boolean;
  msg_entry_date: Date;
  use_manual: boolean;
  is_temp_permission: boolean;
  msg_queue_source: number;
  has_document: boolean;
  doc_name: string;
  doc_extension: string;
  allow_transaction_edit: boolean;
}
