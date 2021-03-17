export interface IAppraisalStatus {
  employee_id : number;
  employee_number : string;
  emp_fullname : string;
  status : number;
  status_text : string;
  reviewer_id: number;
  reviewer_fullname: string;
  entry_date   : Date;
  review_status : number;
  review_status_text : number;
  role_text : string;
  is_exempted : string;
  plan_id : number;
  score : number;
  is_moveable_hr: boolean;
  is_moveable_moderation: boolean;
}


