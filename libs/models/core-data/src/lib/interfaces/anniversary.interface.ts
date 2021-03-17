
export interface IAnniversary {
  id: number;
  org_id: number;
  employee_id: number;
  employee_surname: string;
  employee_midname: string;
  employee_firstname: string;
  anniversary_type: string;
  transaction_date: Date;
  username: string;
  its_me: boolean;
  its_team_member: boolean;
  location_type: string;
  location_name: string;
  reference_date: string;
  period_ref: string;
}

