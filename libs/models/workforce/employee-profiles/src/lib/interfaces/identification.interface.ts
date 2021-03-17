import { IGrade, IPosition, IPeople, IPaymentMode } from "@nutela/models/workforce/personnel";

export interface IIdentification {
  corporate_id_expires: Date;
  national_id_number: string;
  national_id_issuedate: Date;
  national_id_expires: Date;
  license_no: string;
  license_issuedate: Date;
  license_expires: Date;
  passport_no: string;
  passport_authority: string;
  passport_date_issued: Date;
  passport_expires: Date;
  image_signature: string;
  intl_license_no: string;
  intl_license_issuedate: Date;
  intl_license_expires: Date;
  img_extension_signature: string;
  img_size:number;
  employeeinfo_id:number;
  a_confirm_date: Date,
  p_confirm_date: Date,
  employment_date:Date,
  emp_duration_from: Date,
  emp_duration_to:Date,
  grade_id: number,
  title_id: number,
  acting_title_id: number,
  position_id: number ,
  backup_officer_id: number,
  paygroup_id: number,
  on_payroll: boolean,
  payment_mode:string,
  is_permanentstaff:boolean,
  grade:IGrade,
  backup_officer:IBackUpOfficer,
  acting_title:ITitle,
  title:ITitle,
  paygroup:IPayGroup,
  position:IPosition,
  reports_to:any,
}


export interface IBackUpOfficer{
  employee_surname: string,
  employee_firstname: string,
  employee_midname: string,
  employee_id: number,
}

export interface ITitle{
  description: string,
  title_code: string,
  title_id: number,
}

export interface IPayGroup{
  description: string,
  paygroup_code: string,
  paygroup_id: number,
}
