
export interface IReviewRatingFeedbackPage {
  id: number;
  title: string;
  detail: string;
  info: string;
  weight: number;
  using_rating_stars: boolean;
  emp_rating_list: string;
  emp_comment_rq: boolean;
  emp_comment: string;
  emp_rating: string;
  emp_rating_value: string;
  emp_submit_date: Date;
  reviewer_rating_list: string;
  reviewer_comment_rq: boolean;
  reviewer_comment: string;
  reviewer_rating: string;
  reviewer_rating_value: string;
  reviewer_submit_date: Date;
  max_rating: number;
  emp_status: number;
  reviewer_status: number;
  transaction_date: Date;
  error_comment: string;
  has_issues: boolean;
}



