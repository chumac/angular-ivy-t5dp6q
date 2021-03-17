
export interface ILeaveType {
  leave_id: number,
  code: string,
  description: string,
  is_annual: boolean,
  take_from_annual: boolean,
  has_per_time_limit: boolean,
  cancels_annual: boolean,
  can_break: boolean,
  max_break_slice: number,
  only_avail_ifno_annual: boolean,
  can_carryover: boolean,
  calender_to_use: number,
  choose_frombacklog: boolean,
  must_exhaust_backlog: boolean,
  prorate_leave: boolean,
  only_confirmed_staff: boolean,
  makes_staff_inactive: boolean,
  not_in_selfservice: boolean,
  use_days: number,
  show_in_promotion: boolean,
  use_public_holidays: boolean,
  master_rec_id: number,
  supports_allowance_payment: boolean,
  view_in_summary: boolean
}