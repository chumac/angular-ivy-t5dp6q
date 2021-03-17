export interface IGradeManagement {
  grade_id: number;
  grade_code: string;
  description: string;
  ranking: number;
  is_active: boolean;
  annual_leave_days: number;
  kudos_no_member: number;
  confirm_timeframe: number;
  can_have_direct_reports: boolean;
  sys_rule: string;
}
