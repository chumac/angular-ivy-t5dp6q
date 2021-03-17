
export interface IDisciplinaryActionDefinition {
  daction_type_id: number;
  code: string;
  description: string;
  details: string;
  is_active: boolean;
  severity_range_lower: number;
  severity_range_higher: number;
  points: number;
  supervisor_view: boolean;
  auto_expires: boolean;
  expires_in_x_months: number;
}
