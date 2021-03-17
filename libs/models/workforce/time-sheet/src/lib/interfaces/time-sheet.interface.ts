
export interface ITimeSheetData {
  tms_id: number;
  description: string;
  employee_id: number;
  start_date: Date;
  end_date: Date;
  total_hours: number;
  work_week: Date;
  weekend: string;
  holiday: string;
  overtime: string;
  leave: string;
  unpaid_absence: string;
  approval_status: number;
  status: number;
  status_text: string;
  is_recall: boolean;
  recall_reason: string;
}
