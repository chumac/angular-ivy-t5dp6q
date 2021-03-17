export interface ITrainingHistory {
  employee_id: number;
  employee_name: string;
  course_id?: number;
  course_name: string;
  event_name: string;
  batch_name: string;
  created_by?: string;
  created_date?: Date;
}