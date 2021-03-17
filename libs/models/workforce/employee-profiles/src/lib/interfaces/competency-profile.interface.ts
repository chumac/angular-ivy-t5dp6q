export interface ICompetencyProfile {
  employee_id: number;
  employee_name: string;
  skill_id?: number;
  skill_name: string;
  skill_group: string;
  domain: string;
  grade: string;
  position: string;
  location_name: string;
  location_detail_name: string;
  competency_level: string;
  skill_description: string;
  dictionary: string;
  lm_comment: string;
  supervisor_name: string;
  emp_comment: string;
  emp_score_text: string;
  skill_choice_list: string;
  emp_score_text_meaning: string;
  score_id?: number;
  score: string;
  score_text: number
}