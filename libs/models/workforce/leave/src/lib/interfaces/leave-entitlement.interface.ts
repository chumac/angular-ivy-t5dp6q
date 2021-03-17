
export interface ILeaveEntitlement {
  leave_id: number;
  description: string;
  is_annual: boolean;
  total_days: number;
  used_days: number;
  available_days: number;
  summaryCaption: string;
}
