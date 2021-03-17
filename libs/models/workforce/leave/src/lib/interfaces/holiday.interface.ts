export interface IPublicHoliday {
  leave_id: number;
  holiday_id: number;
  code :string;
  description :string;
  is_daterange :boolean;
  holiday_startdate :Date;
  holiday_enddate :Date;
  reuse_yearly :boolean;
}
