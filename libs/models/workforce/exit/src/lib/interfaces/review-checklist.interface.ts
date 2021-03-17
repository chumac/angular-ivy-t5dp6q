export interface IReviewChecklist {
  checklist_id: number;
  description: string;
  employee_name?: string;
  is_validated: string;
  validated_by: string;
  validate_date: Date;
  validate_comment: string;
  validation_role: string;
}
