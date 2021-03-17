export interface ITransferImportTransaction {
  id: number;
  status:number;
  staff_number:string;
  from_location_structure: string;
  from_location_details: string;
  to_location_structure: string;
  to_location_details: string;
  from_current_position: string;
  to_current_position: string;
  effective_date?: Date
  is_temporary: string;
  end_date: Date;
  is_historical: string;
  batch_identifier: string;
  from_current_designation: string;
  to_new_designation: string;
  failure_reason: string;
}
