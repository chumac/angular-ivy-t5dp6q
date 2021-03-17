export interface ITransferHistory {
  employee_id: number;
  current_location_structure: string;
  current_location_details: string;
  new_location_structure: string;
  new_location_details: string;
  current_position: string;
  new_position: string;
  effective_date?: Date
  is_temporary: string;
  end_date: Date;
  has_resumed: string;
  resumption_date: string;
  reports_to: string;
  narration: string;
  current_designation: string;
  new_designation: string;
}