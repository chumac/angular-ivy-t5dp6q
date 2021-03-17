export interface IWorkStreamData {
  id: number;
  day_id: number;
  day_text: string;
  project_id: number;
  project_text: string;
  cost_centre_id: number;
  cost_centre_text: string;
  wk_hours: number;
  wk_hours_type: number;
  wk_hours_type_text: string;
  created_by: string;
  created_date: Date;
  org_id: number;
  status: number;
  approval_status: number;
  description: string;
}
