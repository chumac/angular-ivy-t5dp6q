
export interface IFormBuilder {
  id: number,
  asset_type: number,
  asset_key: string,
  parent_id: number,
  code: string,
  description: string,
  sub_title: string,
  title: string,
  widget: number,
  json_properties: string,
  is_active: boolean,
  created_by: string,
  created_date: Date,
  org_id: number,
  last_modified_by: string,
  last_modified_date: Date,
  eligibility: number,
  rank: number,
  widget_guid: string,
  perm_emp: number,
  perm_lm: number,
  perm_reviewer: number,
  perm_moderator: number,
  perm_hr: number,
  is_completed: boolean,
  perm_reviewer_assessing: number
}



