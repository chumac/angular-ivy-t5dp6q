import { IPersonal } from "./personal.interface";
import { IPosition, IDesignation } from "@nutela/models/workforce/personnel";

export interface ITransferTransaction {
  fullName:string;
  supervisor:string;
  latestLocation:string;
  latestStructure:string;
  latestPosition:string;
  latestDesignation:string;
  oldPosition:string;


  employee_id: number;
  current_location_structure: number;
  current_location_details: number;
  new_location_structure: number;
  new_location_details: number;
  current_position: number;
  new_position: number;
  effective_date?: Date;
  is_temporary: boolean;
  end_date: Date;
  is_historical: boolean;
  narration: string;
  current_designation_id: number;
  new_designation_id: number;

  //read

  id:number;
  revert_process_status:number;
  revert_master_id:number;
  revert_date:Date;
  status:number;
  processed_date:Date;
  email_onapproved:boolean;
  email_oneffectivedate:boolean;
  resumption_email_sent:boolean;
  has_resumed:boolean;
  resumption_date:Date;
  resumption_approval_status:number;
  resumption_remarks:string;
  resumption_created_by:string;
  resumption_created_date:Date;
  last_notice_date:Date;
  notify_count:number;
  reporting_to_id:number;
  employeeInfo:IPersonal;
  EmployeeReportToInfo:IPersonal;
  currentLocationStructure:IAnalysis;
  currentLocationDetails:IAnalysisDetails;
  newLocationStructure:IAnalysis;
  newLocationDetails:IAnalysisDetails;
  currentPosition:IPosition;
  newPosition:IPosition;
  currentDesignationInfo:IDesignation;
  newDesignationInfo:IDesignation;
}

export interface IAnalysis {
  analysis_id: number
  analysis_Code: string;
  description: string;
  analysisDetailsInfo: IAnalysisDetails;
}

export interface IAnalysisDetails {
  analysis_det_id: number;
  analysis_det_code: string;
  description: string;
}
