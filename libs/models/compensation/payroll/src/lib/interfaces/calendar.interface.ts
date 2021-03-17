export interface ICalendar{
  calendar_id:number;
  payroll_profile_id:number;
  code:string,
  description:string,
  archive_status:number,
}

export interface IProfileCalendar{
  calendar_id: number;
  month: string;
  calendaret_id: number;
  total_days:number;
  total_workdays:number;
  total_workhours:number;
  prorate_days:number;
  prorate_workdays:number;
  prorate_workhours:number;
}
