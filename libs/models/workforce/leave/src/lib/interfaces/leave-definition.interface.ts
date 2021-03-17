
export interface ILeaveDefinition {
leave_id: number;
code:string;
description: string;
is_annual:Boolean;
take_from_annual:Boolean;
has_per_time_limit:Boolean;
cancels_annual :Boolean;
can_break:number;
max_break_slice?:number;
only_avail_ifno_annual:Boolean;
can_carryover:Boolean;
calender_to_use:number;
choose_frombacklog:Boolean;
must_exhaust_backlog:Boolean;
prorate_leave:Boolean;
only_confirmed_staff:Boolean;
makes_staff_inactive:Boolean;
not_in_selfservice :Boolean
use_days:number;
show_in_promotion:Boolean;
use_public_holidays:Boolean;
supports_allowance_payment :Boolean;
view_in_summary:Boolean;
sys_rule :String;
archived_status:boolean;

}
