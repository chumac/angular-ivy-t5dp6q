export interface IReport {
  id: number;
  assign_to: number;
  roleInfo: IRolesInfo;
  RolesInfo: IRolesInfo;
  logon_name: string;
  report_key: number;
  org_id: number;
  area: number;
  report_path: string;
  status: number;
  description: string;
  report_class: number;
  report_title: string;
  details: string
  report_category: string;
  StandardReportPathsInfo: IStandardReport;
}


export interface IStandardReport {
    id: number;
    report_key: number;
    area: number;
    report_path: string;
    status: number;
    description: string;
    report_class: number;
    report_title: string;
    details: string;
    report_category: string;
    org_id: number;
}

export interface IRolesInfo{
    rolename: string;
    user_rolename: string;
}
