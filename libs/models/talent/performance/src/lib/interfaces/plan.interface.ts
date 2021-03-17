export interface IPlan {
  id?: number;
  code?: string;
  description?: string;
  period_start_date?: Date;
  period_end_date?: Date;
  is_current?: boolean;
  review_start_date?: Date;
  review_end_date?: Date;
  is_active?: boolean;
  closed_by?: string;
  closed_date?: Date;
  use_360?: boolean;
  plan_start_date?: Date;
  plan_end_date?: Date;
  business_rule?: string;
  link_to?: string;
  is_published?: boolean;
  req_ratings?: boolean;
  req_comments?: boolean;
  status?: string
  prev_plan_id?: number;
  use_prev_obj_status?: number;
  use_prev_obj?: boolean;
}
