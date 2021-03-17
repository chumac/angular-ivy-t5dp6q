
export interface ICommentBoxData {
  recommendation: string;
  Comment: string;
  role: number;
  role_type: number;
  staffName: string;
  employee_id: number;
  plan_id: number;
  comment_date: Date;

  emp_accepts_show: boolean;
  emp_accepts: string;


  emp_one_on_one_completed_show: boolean;
  emp_one_on_one_completed: string;

  emp_one_on_one_comments_show: boolean;
  emp_one_on_one_comments : string;


  lm_one_on_one_completed_show: boolean;
  lm_one_on_one_completed: string;

  lm_one_on_one_comments_show: boolean;
  lm_one_on_one_comments: string;
}
